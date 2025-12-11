---
title: "Modular WPF Interfaces"
date: "2012-07-12"
category: "coding"
tags: 
  - "c"
  - "code"
  - "prism"
  - "wpf"
legacySlug: "93-prism-html"
---

Imagine a completely modularised approach to designing user interfaces. For instance, say you design a user interface with one or more bits left blank. You give said blank regions a name and rely on someone else to provide a DLL that populates that part of the window with something shiny and functional. The keener among you will be aware that this functionality has already been in existance for quite some time now. Indeed, I've just described every Firefox plug-in ever written.

But the modular approach to user interface design is one every application should have, not just customisable systems with a bustling 3rd party plug-in ecosystem. Good user interface design is one of hardest aspects of an application to produce, modify and maintain, and easiest to get completely wrong. Imagine how fantastic it would feel if it was decided that your behemoth application required a new toolbar and all you had to do was write a new DLL from scratch and drop it in the build folder. No interfaces to implement, no code to alter or refactor.

The problem with such a setup is that everyone wants something slightly different from everyone else. One set of users wants to use a specific method of discovering or loading DLLs, another set doesn't like the Inversion of Control framework used. In the end, the difficulty of setting up _any_ kind of working modular UI approach is seen as too hard to achieve and discarded.

This nearly happened to me while I was trialling the latest version of [Prism](http://compositewpf.codeplex.com/) - [4.1](http://www.microsoft.com/en-us/download/details.aspx?displaylang=en&id=28950), released in February. There are plenty of code snippets here and there around the web but generally speaking, most just solve one particular part of the setup problem. The quality of the bundled Visual Studio solution and code files I've found is also poor (even the official Microsoft ones seemed disparate and lacking).

Here then [I present my offering](https://github.com/lifebeyondfife/PrismMefMessaging), in which I have created an example Visual Studio solution using simply [NuGet](http://nuget.org/), [Prism](http://compositewpf.codeplex.com/) and [MEF](http://mef.codeplex.com/) such that:

- A WPF user interface acts as a shell
- Two regions of said shell are left unimplemented
- A directory called Modules is scanned for region implementations
- Sample Views, View-Models and Models have been constructed
- An Observer design pattern implementation allows the separate regions to pass messages via an Event Aggregator

## How the modular WPF setup works

At the highest level description, we'll be creating several C# projects within a Visual Studio solution. One is a WPF application that acts as the **shell** user interface i.e. a full windows application with regions of the user interface left blank. There are two other user control WPF projects called **modules**, essentially DLLs that contain a subset WPF control to place into one of the unimplemented regions. As well as a WPF View, they also contain a View-Model and Model in the traditional MVVM design pattern implementation. Finally there will be a **model** DLL - think of this as a general purpose place for common data types and business logic code. This final DLL will define the event data types that allow communication between the modules. In this example, one module will subscribe to an event aggregator listening for specific types of message. The other module will publish messages to this event aggregator which the other will receive.

The shell executable and module libraries hold a reference to the model library so that they can share the same event aggregator and know about the classes defined within. That, however, is the only dependency in this system. Each module needs to know the name of the user interface region that it wants to implement, but there is no compile time prerequisite or explicit interface to be concerned with. In this example, the shell project will create a subdirectory in its build folder called Modules. A post-build step in each module project copies the built DLL into this folder. When the shell application is executed, it will load any DLLs found in the Modules folder and replace the blank regions with the implementations it discovers.

![](/images/application.png)

The application is pretty simple. There's a data table where users can enter their name, age and favourite Highway Patrol officer from the film Super Troopers - a vitally important class of objects I'm sure you agree. Genghis Khan has gone with Mac as he's clearly the best but the user can add more entries. When the Submit button is clicked, the collection in the lefthand Module A table is added to the righthand Module B table via the event aggregator. With a working knowledge of WPF and MVVM along with the Observable (Publisher / Subscriber) design pattern, you have all the tools needed to create user interfaces made up of independent module components.

## Why should user interfaces be designed like this?

I freely admit there are some considerable disadvantages to this solution. Firstly, this entire blog post exists because I complained that the setup was hard to achieve. There is therefore obviously a difficulty in maintaining this approach and ensuring anyone who joins your team gets up the Prism and MEF curve. More importantly, however, is the separation of concerns when the behaviour of different user interface elements isn't completely independent. The event aggregator functionality allows communication throughout the system but a busy user interface that requires updates from across itself in multiple paths can quickly find a messy collection of messages and a whole new set of synchronisation problems.

The modular approach really comes into its own when dealing with largely independent user interface components, and ones that will need to be replaced, enhanced and generally altered over the lifetime of the system.

One product I have worked on in the past contained MFC and WinForms code side by side. A gargantuan project that took well over a year updated the old fashioned look and feel to replicate the Microsoft Office appearance by using Microsoft's Ribbon toolkit. I can well imagine some bright Junior Developer even now trying to shoe horn into this old beast a couple of WPF dialogs given half a chance. It's perhaps unfair to criticise an application that was started in the 90s for not being forward thinking about user interface design, but a large portion of the reason it looks so bad is because like a tree, we can see how old it is by counting the rings. The central MFC user interface elements that are too deeply entwined into the codebase with their archaic platform ring alarm bells. We rarely consider how long we will end up supporting our code so I think we owe it to ourselves to take any opportunity we can to allow us to painlessly pull out old code in the future and replace it with something else.

## Tour through the code

I usually like to leave the source code in the project files which you're free to download and reuse but I think some code snippets will really help some devs get going with this quickly. Let me state now though that if something doesn't make sense, try downloading the whole solution zip file and looking at the code from a wider context.

First up we'll look at the Shell user interface DLL.

```
namespace ModuleB
{
    [Export]
    public class ReceiveGridViewModel : DependencyObject,
        IPartImportsSatisfiedNotification, INotifyPropertyChanged
    {
        private IEventAggregator EventAggregator { get; set; }
        public IReceiveGridModel Model { get; set; }
        private SubscriptionToken SubscriptionToken { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;

        private ObservableCollection<MyDataType>
            ReceiveDataTableProperty { get; set; }
        public ObservableCollection<MyDataType> ReceiveDataTable
        {
            get
            {
                return this.ReceiveDataTableProperty;
            }
            set
            {
                OnPropertyChanged("ReceiveDataTableProperty");
            }
        }

        public void OnPropertyChanged(string propertyName)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this,
            new PropertyChangedEventArgs(propertyName));
        }

        [ImportingConstructor]
        public ReceiveGridViewModel(IReceiveGridModel model,
        IEventAggregator eventAggregator)
        {
            this.Model = model;
            this.EventAggregator = eventAggregator;
            this.ReceiveDataTableProperty =
                new ObservableCollection<MyDataType>();
        }

        public void OnImportsSatisfied()
        {
            if (this.EventAggregator == null)
                return;

            var myDataTypeEvent =
                this.EventAggregator.GetEvent<MyDataTypeEvent>();

            if (this.SubscriptionToken != null)
                myDataTypeEvent.
                    Unsubscribe(this.SubscriptionToken);

            this.SubscriptionToken = myDataTypeEvent.Subscribe
                (OnMyDataTypeEvent, ThreadOption.UIThread, false);
        }

        private void OnMyDataTypeEvent
            (IEnumerable<MyDataType> myDataTypeEnumerable)
        {
            foreach (var myDataType in myDataTypeEnumerable)
                this.ReceiveDataTable.Add(myDataType);
        }
    }
}
```

The App class creates an EventAggregator object which is stored in the MEF container for the other modules to pick up later. They'll use this to pass messages to each other by subscribing to the message types they want to hear about, and publishing messages of which they want other modules to be aware i.e. the observable or publish / subscribe design pattern.

The bootstrapper class designates the UI shell. In this case I'm simply returning a new Shell class instance but this could also be extracted via the MEF container - I get little enough traffic that I'm prepared to provide the code to do this if someone emails to ask for it. The most important part of the bootstrapper though is how we state where to look for modules. You can explicitly state the name of assemblies on your harddrive, or as I've done here, provide a directory to examine at runtime, namely, ".Modules". There are a couple of post-build scripts in the Visual Studio solution to create the directory if it's not there, and copy the required modules DLLs into it once built.

Before we look at the individual modules, here is how simple it is to define the events that can be published or subscribed to.

```
namespace PrismModels
{
	public sealed class MyDataTypeEvent :
		CompositePresentationEvent<IEnumerable<MyDataType>>
	{
	}
}
```

The type MyDataTypeEvent requires an enumerable collection of MyDataType objects to publish, or provides one to a subscriber. MyDataType is a simple class I've created within the PrismModels project containing a few member properties. Moving on, let's look at our first Prism module...

```
namespace ModuleA
{
    [PartCreationPolicy(CreationPolicy.NonShared)]
    [ModuleExport(typeof(ModuleA))]
    public class ModuleA : IModule
    {
        [Import]
        public IRegionManager RegionManager { get; set; }

        public void Initialize()
        {
            this.RegionManager.RegisterViewWithRegion
                ("RegionA", typeof(SendGrid));
        }
    }

    [Export]
    public partial class SendGrid : UserControl
    {
        [ImportingConstructor]
        public SendGrid(SendGridViewModel sendGridViewModel)
        {
            InitializeComponent();

            this.DataContext = sendGridViewModel;
        }
    }

    [Export]
    public class SendGridViewModel :
        DependencyObject, INotifyPropertyChanged
    {
        public IEventAggregator EventAggregator { get; set; }
        public ISendGridModel Model { get; set; }
        public ICommand SubmitCommand { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;

        private ObservableCollection<MyDataType>
        SendDataTableProperty { get; set; }
        public ObservableCollection<MyDataType> SendDataTable
        {
            get
            {
                return this.SendDataTableProperty;
            }
            set
            {
                OnPropertyChanged("SendDataTableProperty");
            }
        }

        public void OnPropertyChanged(string propertyName)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this,
                    new PropertyChangedEventArgs(propertyName));
        }

        [ImportingConstructor]
        public SendGridViewModel(ISendGridModel model,
            IEventAggregator eventAggregator)
        {
            this.Model = model;
            this.EventAggregator = eventAggregator;
            this.SubmitCommand = new Submit(this);
            this.SendDataTableProperty =
                new ObservableCollection<MyDataType>();

            this.SendDataTable.Add(new MyDataType
            {
                Age = 65,
                Name = "Genghis Khan",
                FavouriteTrooper = SuperTroopers.Mac
            });
        }
    }

    [Export(typeof(ISendGridModel))]
    public class SendGridModel : ISendGridModel
    {
    }

    public class Submit : ICommand
    {
        public event EventHandler CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        private SendGridViewModel ViewModel { get; set; }

        public Submit(SendGridViewModel viewModel)
        {
            this.ViewModel = viewModel;
        }

        public bool CanExecute(object parameter)
        {
            return this.ViewModel.SendDataTable.Any();
        }

        public void Execute(object parameter)
        {
            var copiedRows = this.ViewModel.SendDataTable.
                Select(mdt => (MyDataType) mdt.Clone());

            this.ViewModel.EventAggregator.
                GetEvent<MyDataTypeEvent>().Publish(copiedRows);
        }
    }
}
```

The above ModuleA namespace contains a Module class, an essential part of the Prism framework that registers the containing DLL as a WPF control that can be imported into a shell UI. There are also View, View-Model and Model classes in keeping with the MVVM design pattern - of particular interest to this tutorial is how the MEF attributes perform the Inversion of Control to inject the instances where necessary. Finally there is an ICommand implementation for the button in the SendGrid XAML (download the solution if you want to see it). This is executed when clicked on which in turn publishes an event containing all the MyDataType objects in the DataGrid control.

Each Prism module must implement the IModule interface with a unique class name. We obtain the RegionManager object via MEF with an $$Import] attribute and use it to state that we are staking a claim to the area in the shell UI named "RegionA" and that it should be filled with an instance of the SendGrid View class. Similarly, the View-Model and Model instances are created via MEF and pick up other objects from the MEF container e.g. the event aggregator passed to the View-Model constructor and used by the button command. The Model implementation doesn't actually do anything but I've left some code to show how MEF is used to associate an implementation with a given interface.

Nearly done, let's look at the final namespace.

```
namespace ModuleB
{
    [Export]
    public class ReceiveGridViewModel : DependencyObject,
        IPartImportsSatisfiedNotification, INotifyPropertyChanged
    {
        private IEventAggregator EventAggregator { get; set; }
        public IReceiveGridModel Model { get; set; }
        private SubscriptionToken SubscriptionToken { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;

        private ObservableCollection<MyDataType>
            ReceiveDataTableProperty { get; set; }
        public ObservableCollection<MyDataType> ReceiveDataTable
        {
            get
            {
                return this.ReceiveDataTableProperty;
            }
            set
            {
                OnPropertyChanged("ReceiveDataTableProperty");
            }
        }

        public void OnPropertyChanged(string propertyName)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this,
            new PropertyChangedEventArgs(propertyName));
        }

        [ImportingConstructor]
        public ReceiveGridViewModel(IReceiveGridModel model,
        IEventAggregator eventAggregator)
        {
            this.Model = model;
            this.EventAggregator = eventAggregator;
            this.ReceiveDataTableProperty =
                new ObservableCollection<MyDataType>();
        }

        public void OnImportsSatisfied()
        {
            if (this.EventAggregator == null)
                return;

            var myDataTypeEvent =
                this.EventAggregator.GetEvent<MyDataTypeEvent>();

            if (this.SubscriptionToken != null)
                myDataTypeEvent.
                    Unsubscribe(this.SubscriptionToken);

            this.SubscriptionToken = myDataTypeEvent.Subscribe
                (OnMyDataTypeEvent, ThreadOption.UIThread, false);
        }

        private void OnMyDataTypeEvent
            (IEnumerable<MyDataType> myDataTypeEnumerable)
        {
            foreach (var myDataType in myDataTypeEnumerable)
                this.ReceiveDataTable.Add(myDataType);
        }
    }
}
```

I've omitted most of the MVVM classes and the Prism registration for "RegionB" as it's practically identical to that of "RegionA". What is most interesting is the View-Model implementation that receives the events from the other module. For each type of event we're subscribed to we have a SubscriptionToken object and supply a member function to call when new messages appear - in this module it's the OnMyDataTypeEvent method. Note how the message appears as the enumerable collection of MyDataType objects from earlier.

That does it for the crash course in Prism, MEF and Event Aggregators. As always, I hope I've provided enough code and explanation to motivate you into giving it a go. Let me know how you get on.
