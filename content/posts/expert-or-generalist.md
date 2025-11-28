---
title: "Expert or Generalist?"
date: "2013-06-24"
category: "essays"
tags: 
  - "c"
  - "code"
  - "constraint-programming"
---

# "My Name is Karl, Ich Bin Expert"

 

I don't quote Karl Hungus lightly. When I began this blog back in the summer of 2011 it was because I thought I'd let my programming skills go rusty. I wasn't starting projects and I hadn't learned any significantly different technology or tools for a few years. Life Beyond Fife existed as a dumping ground for random ideas, quick trials and elaborate "Hello world!" examples.

 

But I'm not a twenty-three year old entrepreneur living in The Bay trying to get a startup off the ground. However cool it is to launch a micro t1 Amazon EC2 instance with a Node.js module using Heroku (yes, I'm doing [Coursera](https://www.coursera.org/ "Coursera")'s [Startup Engineering](https://www.coursera.org/course/startup "Startup Engineering") class) I'm a C# programmer, and an experienced one at that. Recruitment agents don't get in touch because I've tinkered with [Iron Python](http://lifebeyondfife.com/79-ironpython-wpf-html/ "Simple WPF IronPython Application"), but because I have years of full development life-cycle experience on the Windows .Net framework. All my interviews begin with, "What's the difference between a reference and a value type?" and end with "Explain the garbage collection process in .Net" or "How do you create an extension method?" etc.

 

Does _trying out_ every new technology whim damage the focus needed to pick something and be an expert in it?

 

## An Expert

 

[Jon Skeet](http://stackoverflow.com/users/22656/jon-skeet "Jon Skeet: Legend"), a Java developer by trade, knows the .Net framework much better than I do. Probably far better than most C# programmers to be honest. Perhaps my jQuery might be better than his but then, is that relevant in the slightest?

 

A recent [Hacker News thread](https://news.ycombinator.com/item?id=5779640 "HN Thread") saw someone take an [NP-complete](http://stackoverflow.com/questions/210829/what-is-an-np-complete-problem "What is NP-Complete?") problem described in an [xkcd strip](http://xkcd.com/287/ "xkcd") and use a constraint solver toolkit to enumerate the solutions. Long before my C# software developer career, I worked daily on many various facets of constraint programming and symmetry for over three years as a PhD student and researcher. The years away haven't dulled my enthusiasm for combinatorial search but am I still an expert?

 

## Constraint Programming

 

I saw an interesting comment from simias asking for help on a real life application of constraint programming - a Phase Locked Loop. In academia there's a fine line between using example problems that are easy to explain and tailor versus real world problems with actual applications but are too specific to take general lessons from. My research group favoured the former so I was keen to understand a definite application.

 

As he elaborates in the Hacker News thread, it's about choosing a set of configuration values to get a certain output for a given input. But the need to chain two of these configurations together such that the output of one is the input to another introduces too many combinations so the solution needs to be found in a smarter way than brute force enumeration. A definite candidate for some of the techniques of constraint programming.

 

## Dusting Off Some Old Code

 

Before I could really help out with suggestions I needed to refresh my constraint programming memory. For the past few years I've been working on and off (mainly off) at a constraint solver written in C#. The complexity of the toolkit meant that I only ever saw the missing pieces rather than realising I'd already made more than an MVP that could be published somewhere.

 

After encoding the Phase Locked Loop as a constraint satisfaction problem to be input to my constraint solver, I noted a few deficiencies. There were a few inequality constraints I had yet to create propagation functions for.

 

Once completed, however, I looked at my codebase. There were still inefficiencies and incompleteness but it's a solid toolkit with a fundamental focus on ease of use. Now I have a GitHub collection with lots of other projects I couldn't see a reason to keep it locked away from the rest of the world.

 

## [Decider: a Constraint Solver](https://github.com/lifebeyondfife/Decider "Decider: a C# Constraint Solver")

 

Introducing [Decider](https://github.com/lifebeyondfife/Decider "Decider: a C# Constraint Solver"), a new C# constraint solver. There are [many](http://www.gecode.org/ "Gecode") [alternatives](http://minion.sourceforge.net/ "Minion") [out](http://www.emn.fr/z-info/choco-solver/ "Choco") there including a .Net [implementation from Microsoft](http://msdn.microsoft.com/en-us/devlabs/hh145003.aspx "Microsoft Solver Foundation") but I recommend looking at Decider for it's clean use of logical and arithmetic overrides and ability to easily integrate with any existing .Net codebase. There are three simple introductory projects including simias' [Phase Locked Loop](https://github.com/lifebeyondfife/Decider/blob/master/PhaseLockedLoop/PhaseLockedLoop.cs "Phase Locked Loop") problem.

 

For all the time I've spent putting varied little mini sourcecode samples online, I wouldn't say I've inspired any great interest or following (though the occasional request comes in, the last being for the [System Tray OLE Date Converter](http://lifebeyondfife.com/73-exhell-html/ "Exhell")). I hope a more serious submission might strike a chord with other developers. And more than that, I hope that the increased visibility of having my constraint solver available to others will inspire me to spend more time making it a worthwhile open source project.
