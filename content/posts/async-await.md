---
title: "Caveats on actually using async and await"
date: "2011-10-19"
category: "coding"
tags: 
  - "async-await"
  - "c"
  - "development-in-practice"
legacySlug: "80-async-await-html"
---

With the next release of .Net making a big push for parallelism-for-everyone-made-easy, I thought I'd take this opportunity to see if it really is as simple as they say. The most recent issue of the MSDN magazine has three articles regarding the changes to the C# language and what goes on under the hood when the programmer uses the new async and await keywords. This article looks at the challenges I faced in modifying an existing codebase to take advantage of the new functionality.

 

## .Net 4.5 Asynchronicity 101

 

I'll cut through some of the Microsoft boiler plate that builds up as they expertly sell the new feature start and dive in with one of their most simple examples:

```
    static byte[] TryFetch(string url)
    {
        var client = new WebClient();
        try
        {
            return client.DownloadData(url);
        }
        catch (WebException) { }
        return null;
    }
```

The client.DownloadData(url) invocation takes a long time and blocks the thread it's running on while doing so. This is especially bad if this is the UI thread. The new feature of .Net 5 allows you to label an invocation as something that will take a long time and not to block while executing it by making mere cosmetic changes to your code. The first of which is to add the async identifier to your function declaration like so:

 
```
    static async byte[] TryFetch(string url)
```
 

The leads instantly to a compiler error as Visual Studio helpfully tells you that _"The return type of an async method must be void, Task or Task<T>"_. Asynchronous methods are supported by a (templated) wrapper type called Task. This class allows you to start, pause and stop tasks, query if they're completed, and get their result when they are. Here's what the function declaration now looks like (including the extra using statement):

 
```
    using System.Threading.Tasks;
    static async Task<byte[]> TryFetch(string url)
```
 

So far, so good. We must now tell .Net which part of our asynchronous function is where we're concerned about blocking. This is done by prepending the identifier await before the blocking invocation. Here's the complete asynchronous example from the October 2011 MSDN magazine:

 
```
    static async Task<byte[]> TryFetch(string url)
    {
        var client = new WebClient();
        try
        {
            return await client.DownloadData(url);
        }
        catch (WebException) { }
        return null;
    }
```
 

## Something's not quite right

 

But, wait a moment. This doesn't compile! Let's have a look at the compiler error, _"The 'await' operator requires that its operand 'byte[]' have a suitable GetAwaiter method"_. Ah yes, Microsoft haven't been crystal clear on this point. You can't just put await in front of any invocation you want. The return type of that invocation, similarly to the function we're declaring as async, has to be a Task or a templated Task<> class (NB - these classes have an extension method GetAwaiter that returns an instance of the TaskAwaiter struct. Don't worry about it though, that's not important). The MSDN magazine example, however, moves the goal posts with a cheeky modification to the function they're actually calling.

 
```
    static async Task<byte[]> TryFetch(string url)
    {
        var client = new WebClient();
        try
        {
            return await client.DownloadDataTaskAsync(url);
        }
        catch (WebException) { }
        return null;
    }
```
 

Everything now works perfectly because Microsoft has provided an extension method mirroring the original DownloadData function that returns a `Task&lt;byte[]&gt;` object as expected. This is fine if all the code you wish to change simply makes calls to Microsoft's own APIs but more likely than not you're going to have to use the static Task Factory object to create a task that can be run on a vacant thread from the thread pool (for those wanting more fine-grained control of which thread the task is actually performed on, read about the [SynchronizationContext](http://www.codeproject.com/KB/threads/SynchronizationContext.aspx) and the [TaskScheduler](http://msdn.microsoft.com/en-us/library/dd537609.aspx)). So assuming Microsoft hasn't come into your workplace to provide an async version of all your favourite internal methods, here is what the final modified TryFetch function looks like:

 
```
    static async Task<byte[]> TryFetch(string url)
    {
        var client = new WebClient();
        try
        {
            return await Task.Factory.StartNew(() =>
                client.DownloadData(url));
        }
        catch (WebException) { }
        return null;
    }
```
 

Hang on though. Part of the reason the code snippet was manufactured in this way was to show that you could mark your blocking call in the middle of a try block. All the hard work by .Net would be done behind the scenes with only minor coding changes required from how programmers would normally write to start with (NB - you can't mark a function with await if it has out or ref parameters or use await at all in a catch or finally block). In the example above, if DownloadData throws a WebException, it is not caught within the catch block. You may have guessed as much, the try-catch block has to be pushed inside the lambda expression. Not quite as elegant as originally advertised:

 
```
    static async Task<byte[]> TryFetch(string url)
    {
        var client = new WebClient();
        return await Task.Factory.StartNew(() =>
        {
            try
            {
                return client.DownloadData(url);
            }
            catch (WebException) { }
            return null;
        });
    }
```
 

## Putting it all together

 

I'll now discuss some more issues I encountered from modifying my most recent software project with a UI, [D-Lighted](http://www.lifebeyondfife.com/77-d-lighted.html), to take advantage of the new functionality. Here is a function in the WPF View's code behind that has been modified to be asynchronous.

 
```
    private async void ShowConnectDialog(DatabaseCreator
        databaseCreator, string title, string toolTip)
    {
        //    ...

        this.viewModel.UpdateConfigFile();
        await Task.Factory.StartNew(() =>
            this.viewModel.Connect(databaseCreator));
        await Task.Factory.StartNew(() =>
            this.viewModel.GetTableList());
    }
```
 

And that's pretty much it... on the View side. Regrettably, there is still a whole host of things that need to be done in the View-Model owing to early laziness. First and foremost the View-Model should be able to run on any thread, not just the UI thread. In order to do that I have a big problem with my get and set accessors for the View-Model's dependency properties:

 
```
    public static readonly DependencyProperty
        DatabaseTableProperty = DependencyProperty.
        Register("DatabaseTable", typeof(DataView),
        typeof(DLightedViewModel), new UIPropertyMetadata());
    public DataView DatabaseTable
    {
        get { return (DataView)
                  GetValue(DatabaseTableProperty); }
        set { SetValue(DatabaseTableProperty, value); }
    }
```
 

Using the DatabaseTable property on a thread other than the UI thread will not make .Net happy. I make some changes to the View-Model class so it holds a copy of the UI thread's Dispatcher object in a property I call UIDispatcher. I modify the above accessor to call GetUIValue and SetUIValue methods which I declare in my class:

 
```
    private delegate object GetValueDelegate
        (DependencyProperty property);
    private object GetUIValue(DependencyProperty property)
    {
        return this.UIDispatcher.Invoke
            (new GetValueDelegate(GetValue), property);
    }

    private delegate void SetValueDelegate
        (DependencyProperty property, object value);
    private void SetUIValue
        (DependencyProperty property, object value)
    {
        this.UIDispatcher.Invoke
            (new SetValueDelegate(SetValue), property, value);
    }
```
 

The UI blocking problem is now completely solved. If a database connection or table query takes a few seconds, the UI remains responsive throughout. But now I have a second problem: users. They're always clicking and pushing and hitting <Enter>. Yes, I know! I'm on it! So while your program is trying to connect to a database, your responsive UI could be queuing up a request for a table that won't exist by the time it's scheduled.

 

This is the fundamental point about UI design and creating applications responsive to its users. These kinds of problems have to be anticipated from the ground up. Ideally each control within the UI will have a way to determine if it should be enabled or not. There could also be a cancel operation dialog or button. Retro-fitting async functionality needs a pragmatic approach to these issues. In the end I went for a system wide lock down... literally.

 
```
    internal void GetTableList()
    {
        lock (DLightedViewModel.ConnectionObject)
        {
            if (this.DatabaseManager == null)
                return;

            try
            {
                this.ListItems = this.
                    DatabaseManager.GetTableList();
            }
            catch (DbException exception)
            {
                this.ConnectionName = exception.Message;
            }
        }
    }
```
 

A static object was created to make sure that only one instruction was passed to the model at a time. A bit brutal for some systems but for a single user application where you can only look at one table at a time, locking non-UI threads creates a predictable and safe workflow. I've updated the [D-Lighted](http://www.lifebeyondfife.com/77-d-lighted.html) sourcecode and installer ready for your perusal. As much as I have complained about the issues with the async / await functionality, I still found it quite neat and a welcome improvement over managing threads and call-backs. If you're feeling keen, there are a series of [asynchronous video tutorials](http://msdn.microsoft.com/en-gb/hh378091) available.
