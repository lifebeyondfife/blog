---
title: "Functional Programming For Object Oriented Programmers"
date: "2011-11-24"
category: "follies"
tags: 
  - "f"
  - "functional-programming"
legacySlug: "82-f-sharp-html"
---

After recently remarking about how I finally "got" functional programming I was asked by one of my millions of [twitter followers](https://twitter.com/LifeBeyondFife)... ¬_¬ to write up an explanation of a small F# program spoken in terms that fellow O-O programmers would understand. Before I become too entrenched into the functional programming way of thinking, that is, and can't explain it anymore. As a former tutor this is one of the major problems with being able to teach something once you understand it. You've forgotten how _not_ to make sense of the concept and what finally helped you get over the mental parapet.

The initial example that functional programming proponents often use is the Quick Sort sorting algorithm. This is done because it's an optimally efficient sorting algorithm - O(n log n) - and the implementation is only a few lines. Functional programming lends itself to very implicit code. This is just one of the reasons it's popular but it's the main reason it's hard to get into.

 

**EDIT**: Hi to all the new people from [Hacker News](http://news.ycombinator.com/item?id=3274591)! \*waves\* I should stress that I have been programming in F# for only a few days so view this as a real crash course introduction. I recommend anyone who's interested in getting started with F#, download [LINQPad](http://www.linqpad.net/) and go through their F# tutorial contained within the Samples section. Happy coding.

 

As primarily a C# programmer, if my code is verbose it's most likely intentional so that the conceptual steps are broken down to allow _another_ programmer to understand it - real software development is a team sport. In writing this guide I'm going to reproduce a Quick Sort implementation in F# and take you through the syntax slowly to hopefully make it clear to the imperative (O-O) programmer what's going on.

 

If you've been keeping up with .Net in recent years then the job is made easier because Microsoft has been cramming bits from functional programming into C# as much as they can e.g. inferred types, first class functions. I've tried to break up the task into ten, simple exhaustive steps.

 

## 1\. Everything is immutable

 

The declaration and definition of variables in F# happens simultaneously and that's it, they can't be changed after that.

 

    let a = 1

 

The variable a contains the integer value 1 and always will. This means the following line:

    a = 2

 

can be contextually inferred not to be variable assignment, as that's forbidden, but equality testing i.e. the code is asking is a equal to 2?

 

## 2\. Type is inferred

 

F# is a .Net language and has much plumbing throughout allowing users to get access to all the objects, interfaces and value types with which C# programmers are familiar. But for our example we're going to keep things simple and ignore types altogether. Our Quick Sort implementation will know what type it's sorting at runtime but all it really cares about is that the objects in the lists are of the same type and support the less-than < operator.

 

## 3\. Functions are invoked without using brackets or commas

 

Given two integer variables a and b,

 

    let a = 1
    let b = 2

 

say we have a function called add, it is invoked like so:

 

    add a b

 

If you see a collection of words all lined up together it means, in F# at least, that a function is being either invoked or declared. The pattern followed is this one:

 

    function parameter1 parameter2 parameter3

 

Strictly speaking brackets are sometimes needed but that's just to bunch together operations e.g.

 

    function (param1operand1 + param1operand2) param2

 

## 4\. Functions are variables too

 

In F#, [first class functions](http://en.wikipedia.org/wiki/First-class_function) are supported. This means functions can be assigned to variables in the same way as integers, floats and strings are. Consider the previous section. Here's one way to create the add function described.

 

    let add param1 param2 = param1 + param2

 

This is equivalent to the C# code:

 

    T Add<T>(T param1, T param2)
    {
        return param1 + param2;
    }

 

Note the lack of typing, the F# add function will work on any types that support the + operator whereas the C# compiler won't let you make that assumption. (EDIT: [James](http://thecodedecanter.wordpress.com/) has helpfully pointed out in the comments section that once the function is invoked, it is bound to those parameter's types unless the keyword inline is used).

If you're creating a function that's recursive you'll also need the rec keyword:

 

    let rec triangle n =
        if n = 1 then 1
        else n + triangle (n - 1)

 

Of course, this being implicit functional programming we don't have to assign a function to a variable if we don't want to. Here's how to define the add function on the fly:

 

    fun param1 param2 -> param1 + param2

 

But we can still use this approach if we want to assign it to a variable though. These two lines are equivalent:


    let add param1 param2 = param1 + param2
    let add = fun param1 param2 -> param1 + param2
 

Which brings me on to my next point.

 

## 5\. There are a million ways to flog a horse with functional programming

 

I'm probably too close to and familiar with C-style programming languages to no longer see the immense redundancy but there seems to be a lot of ways to do the same thing in F# - I'm not even going to explain |>, the pipe operator. Don't worry about it, you don't have to remember them all. Everything I'll show you in the Quick Sort program will be explained.

 

## 6\. Functional programming likes its lists

 

Here is probably the simplest way to create a list in F#:

 

    let a = [1; 2; 3]

 

For .Net people, the type of a is FSharpList<Int32>, essentially a list of integers. I'm going to introduce two binary operators for lists @, which concatenates two lists and ::, which constructs a list from a head (the first element of the list) and a tail (the remainder of the list).

 

    let b = 4 :: [5; 6]

 

Notice that the head is an 'int' and the tail is a 'list of ints'. The result, b, is another list of ints, namely [4; 5; 6].

I think you're ready for some nastier stuff now. Let's take this next line one step at a time and try to decipher it.

 

    (fun list1 list2 -> list1 @ list2) a b

 

First up, the code in brackets contains the keyword fun so it's defining a function implicitly. This means the line takes the form of our above function parameter1 parameter2 pattern from section 3 i.e. the implicitly created function is immediately invoked thereafter. Consider what this function is doing then. It takes two parameters and returns the result of using the list concatenation operator, @, on them. We then call this implicit function with parameters a and b. Recall that a is [1; 2; 3] and b is [4; 5; 6], so the result of this F# expression is the list [1; 2; 3; 4; 5; 6].

Trust me, we're getting there.

 

## 7\. The :: operator is bi-directional

 

I just showed you that you can create a new list using the :: operator to add a new head to an existing list. The :: operator can also be used to work out the head and tail of an existing list.

 

    let a = [1; 2; 3]
    let HeadTail list =
        match list with
        | head :: tail -> head, tail
    let head, tail = HeadTail a

 

Again, we'll take the HeadTail function we've just created one line at a time. The declaration is the same as the previous function definitions we've seen: we're creating a function called HeadTail that takes one parameter that we've decided to call list. The next line is best described to an O-O programmer as a grander kind of switch statement where each vertical line, |, is like a case statement. In C#, the expression in the case statement has to be a value type e.g. a character or integer, but in F# it's clever enough to match the input you give it to form new local variables.

Also, F# functions can return more than one variable. Here's a not-quite-legal pseudo C# equivalent to the above function to try to explain.

 

    object[] HeadTail(IList<T> list)
    {
        switch (list)
        {
            case head :: tail:
            return new[] { head, tail };
        }
    }

 

Finally the last line of F# above invokes the HeadTail function we've just created with the parameter a. This returns the head value, 1, and the remainder of the list [2; 3] and stores each in the head and tail variables. There are many other patterns that F# is powerful enough to match using this syntax.

Keep strong, nearly done.

 

## 8\. Lists, lists, lists...

 

As I said, functional programming likes its lists. In F# there are some framework provided functions that allow the programmer to perform different actions on the contents of lists. For instance:

- List.map function list - Invokes function on every item within list and returns the results of those invocations in a new list.
- List.filter function list - Returns a list containing every item in list that returns true when passed to function.
- List.partition function list - Similar to filter but returns two lists. The first is the same as that returned by filter. The second contains all the other items from list that _aren't_ in the first list.

And because I'm nice, here are the equivalent C# implementations to help your understanding.

 

    IList<TRes> Map<TSource, TRes>(Func<TSource, TRes> function,
         IList<TSource> list)
    {
        var result = new List<TRes>();

        foreach (var item in list)
            result.Add(function(item));

        return result;
    }

    IList<T> Filter<T>(Func<T, bool> function, IList<T> list)
    {
        var result = new List<T>();

        foreach (var item in list)
        {
            if (function(item))
                result.Add(item);
        }

        return result;
    }

    object[] Partition<T>(Func<T, bool> function, IList<T> list)
    {
        var first = new List<T>();
        var second = new List<T>();

        foreach (var item in list)
        {
            if (function(item))
                first.Add(item);
            else
                second.Add(item);
        }

        return new[] { first, second };
    }

 

And here's how to use one of these List functions in F#

 

    let list = [1; 2; 3; 4; 5; 6; 7; 8]
    let greaterThanFive item = item > 5
    let greatList = List.filter greaterThanFive list

 

The variable greatList contains the list [6; 7; 8].

 

## 9\. Quick Sort refresher course

 

Here's a quick reminder for those who've forgotten their Algorithms course. The Quicksort function takes a list of objects to be sorted. If it's an empty list we simply return it. Otherwise the first element of the list is chosen as the 'pivot' point. The rest of the list is split into two lists: one containing items that are smaller than the pivot and another containing items that are larger than or the same size as the pivot. Either or both of these lists may be empty. The function returns the concatenation of the recursively sorted smaller list, the pivot point, and finally, the recursively sorted larger list.

The wiki page for the [Quick Sort algorithm](http://en.wikipedia.org/wiki/Quick_sort) is here if that brief overview isn't quite turning on the lightbulb inside your head.

 

## 10\. Quick Sort in F#

 

Well done for making it this far. Let's start off with an unordered list.

 

    let unorderedList = [4; 5; 3; 8; 1; 6; 4; 7; 3; 9; 2]

 

The algorithm is a recursive function that takes one parameter, an unordered list.

 

    let rec quicksort list =

 

First off we want to return the list unchanged if it's empty. This can be done with the match keyword described in section 7.

 

    match list with
    | [] -> []

 

Remember this is basically a switch statement so we're saying that if list is [], the empty list, then return it. Now to the next case. We split the list up into a head and tail and use the head as a pivot.

 

    | head :: tail ->

 

We're now going to use the List.partition function described in section 8 to create the list of elements smaller than the pivot, and the ones larger than or equal to it.

 

    let smaller, larger =
        List.partition (fun item -> item < head) tail

 

Taking the above line one step at a time, we're creating two local variables that are being returned from calling the List.partition function. The parameters for that function are an implicitly created function to find the elements smaller than the pivot, and the tail of the list. The variable smaller becomes equal to the list of all items in tail that are smaller than the pivot, and larger all the other items. The next line on it's own returns the concatenation of the recursively sorted lists with the pivot placed between them.

 

    quicksort smaller @ head :: quicksort larger

 

I'll put brackets around this to show more clearly what's going on:

 

    quicksort(smaller) @ (head :: quicksort(larger))

 

The quicksort function is called twice more and the list operations @ and :: are used to glue the resulting lists together. We could have also done this:

 

    quicksort(smaller) @ [head] @ quicksort(larger)

 

But that's marginally less efficient.

Here is all the code with an example invocation on the unordered list we created at the beginning.

 

    let unorderedList = [4; 7; 2; 0; 9; 1; 6; 7; 5; 4; 3; 8; 6]

    let rec quicksort list =
        match list with
        | [] -> []
        | head :: tail ->
            let smaller, larger =
                List.partition (fun item -> item < head) tail
            quicksort smaller @ head :: quicksort larger

    let orderedList = quicksort unorderedList

    printfn "Unordered List: %A" unorderedList
    printfn "Ordered List:   %A" orderedList

    open System
    Console.ReadKey(false) |> ignore

 

Makes perfect sense now, huh?
