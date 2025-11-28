---
title: "Developing in the Brown Field"
date: "2011-07-22"
category: "essays"
tags: 
  - "brownfield"
  - "development-in-practice"
legacySlug: "72-brown-field-html"
---

A friend and former colleague of mine told me after leaving the company we had both worked at,

"I never want to work for a big company again."

I couldn't understand the need for a blanket ban on all big companies from future employment opportunities. The reason apparently came down to the distinction between Greenfield and Brownfield development. In simple terms Greenfield development means writing software from scratch whereas Brownfield generally entails bugfixing or enhancements to existing code projects.

[Brownfield development](http://www.manning.com/baley/) is not specifically a bad thing or something to be avoided; there will be many impressive software projects that are too big for all to be included from its inception. Being able to get to grips with a complex, alien architecture and codebase in order to extend its functionality is a string in the bow of all good developers. And these large, aging colossuses are the bread and butter of big software houses. However, there comes a time when it becomes too much to bear and remain satisfied in your work. Recognising the need for balance, and maintaining it is the key for software developers and managers alike.

## Success Leads to Brown Fields

Both large, well-structured software projects and mind destroying, nested dependency coding [nightmares](http://thedailywtf.com/Articles/The-Enterprise-Dependency.aspx) begin in much the same way. Product management have an idea for a business solution they could sell, a small, select team of programmers produce a prototype, development nurtures it to release and a client buys it. Then the cycle begins: bug reporting and additional requirements from customers, bug fixes and enhancements from development. The more money it makes, the more customers will submit (sometimes contradictory) requirement requests, the more there is to do and the bigger the codebase gets.

Ideally the business knowledge of the company in charge will mean the original design is sound for their clients' future needs, the architecture and technologies will be well chosen and any prototype-esque coding will be quickly refactored to reduce costly technical debt from the start. Cynics may state this is unlikely but it is possible. Regardless though the code will incrementally increase in size and as the years go on legacy technologies, not just code, will need to be supported. Right now there is a product being actively developed that I used to work on whose regression tests are run on 18 January 1995 - the date the first such test was created. That's just how long successful software products can be around for. And unless product management can justify simultaneously developing a replacement solution and help their customers through retiring the old one, the legacy code will stay around for as long as there is money coming through the door. Developers will therefore be stuck ploughing the _brown field_.

## "...it says in your files that you know COBOL"

The longer a Brownfield project continues the more crucial it is to spread around senior developers' expertise of the product to guard against loss of irreplaceable knowledge. The above quote from [this old joke](http://www.exit109.com/%7Eghealton/y2k/y2k_humor/Cobol.html) highlights the lengths your team may have to go to guarantee the services of developers with both experience of older technologies and an inclination to continue using those skills. But this is just the beginning of the balancing act to be employed when continuing to support an aging solution. The larger the codebase, the longer and harder it is to diagnose bug reports. The more complex the architecture becomes as new functionality is squeezed into the user interface. Just testing the fresh functionality is not sufficient either, the newly deployed system must be verified again from top to bottom. Perhaps the documentation needs to be partially rewritten and many screenshots with obsolete window managers need updating?

Around the time the true complexity of supporting this enlarged  product is becoming known, product management may also start to become concerned with something else: quality. They've noticed that clients are increasingly disappointed with the stability of the product and the length of time they have to wait for their concerns to be addressed. The informal processes that accompany agile and rapid Greenfield development are not applicable for Brownfield. Quality has slipped and changes to the development process have to be made. Let's address this pictorially to show what this means in practice.

## To win, you must check in

No matter how experienced or inexperienced you are as a programmer, if you're earning a million on a contract or pledging some free time to a GPL project, whether you're writing the first LOC or the millionth, your code is useless until it is collected together as a coherent set and compiled into a deployable executable. To win in the game of development, you must have some code to check in.

We'll start by looking at what a lone programmer looks like when they're writing a small throwaway app for fun.

![Now that's one happy stickman!](/images/first.png)

Our little stickman is very happy. Code is written and sent to a compiler which in turn creates version 1.0 of the new software. Now let's move the scenario on a little further. Imagine our stickman is part of a team of developers working collaboratively on a software project.

![Just as happy.](/images/second.png)

With more people on the team comes the need to effectively and safely handle multiple check-ins which leads to a Source Control Management system like [Git](http://git-scm.com/), [Mercurial](http://mercurial.selenic.com/), [Subversion](http://subversion.apache.org/) or my personal favourite [Perforce](http://www.perforce.com/) (in fact, even lone developers should use one of these). With multiple developers the code should still be internally consistent so there is a coding standards document that everyone adheres to. Also, to take more work away from the developers, a Continuous Integration Server e.g. [TeamCity](http://www.jetbrains.com/teamcity/) or [CruiseControl](http://cruisecontrol.sourceforge.net/), has been introduced. This periodically checks the Source Control Management system for changes and builds the sourcecode whenever it finds any. The compiled executable has a set of unit tests run on it to make sure nothing simple has been broken. The continuous integration server might even run an extended set of regression tests on a daily basis. And this of course assumes that the code compiles in the first place! Regardless, if there are any problems, the developer is notified and if the problems aren't fixed within a certain window their changes can be backed out.

But now let us consider what happens when we're deep into Brownfield territory. Product management have voiced concerns over quality and development leadership has to ensure the rigorous checks and balances are employed to make sure the required standards are achieved.

![Will stickman ever check-in code again?](/images/third.png)

Even small teams should probably have some kind of Issue Tracking System such as [Bugzilla](http://www.bugzilla.org/) or [OnTime](http://www.axosoft.com/ontime). However, for the larger legacy projects, a system that can keep track of bugs and enhancements and prioritise and assign them for different release schedules becomes essential. They also help to ensure resources are managed as desired by development leadership and product management as no code check-ins can be made without a corresponding issue. Notice from the diagram that now before the code even gets checked into the SCM, there is a formal Code Review System e.g. [CodeCollaborator](http://smartbear.com/products/development-tools/code-review/). Code reviews within development teams have always been a part of producing good code but now these formal systems allow distributed teams to carefully inspect every single line of code before it is allowed to become part of the official live codestream.

Such systems can allow different inspections to take place: the functional reviewer is concerned specifically with what the code change proposes to do and whether the problem is being solved effectively and efficiently. The technical reviewer is well versed in the aforementioned coding standards and this developer is concerned with ensuring only well written code goes into the codebase free from potential security exploits or anti-patterns. Once again as the code passes through the continuous integration server, any problems are caught and the attempted check-in is sent back to the developer to begin the process anew.

## Effect of the Brownfield Process

Programmers like to solve problems and they write code to do just that. There is a convincing business case to be made and inherent logic for each and every part of the Brownfield coding process described - without ensuring quality a well structured codebase would quickly descend into a mess. But the benefit of maintained quality does not come for free. Developers have many tasks to perform in their day-to-day jobs and there is a time penalty when context switching between programming and, say, attending team meetings. The accumulative effect of a more formal development process means that each stage acts as a hurdle to be overcome making it likely that between the time a development task starts until it is checked in, more costly context switching will occur. Proactive developers will be less inclined to perform small bugfixes or refactoring as the bureaucratic overhead will eat into time needed for their core responsibilities. Large projects need greater allowances for planning ahead of meeting a fixed deadline. Too long in this working environment will badly affect developer morale as they find it harder to spend time writing code or learning new technologies.

## The Brownfield Solution: Retirement

In the same way the customer isn't always right, sometimes a company has to be strong and not give their customers exactly what they want. Most customers, once happy with a software solution, are keen to take newer versions with modest incremental enhancements and patches to ensure compatibility with the latest hardware, browser and/or operating system. Throwing out a trusted system that the customer depends on to do their business and all their employees know how to use is a daunting prospect. But software development is a long term discipline and for the sake of the reputation of your company, the lifecycle of your solutions should be something determined by your company and not the market.

Much like other products, there are phases of lifecycle in software: an introduction to the market; a growth stage; maturity and finally saturation and obsolescence. A software house built on just one software product will live and die by the lifecycle of that product. The key to future growth and stability comes from managing multiple software products at different stages of maturity. Doing this successfully while maintaining a happy and enthusiastic development team requires:

- Product management to be thinking about clients' needs in 5 years time
- An understanding of the phase of each software solution and how long it has left
- Fluid development teams that allow movement between products

That final point is crucial. Once a software product has entered the mature phase of its lifecycle, the development process will never be as enjoyable or engaging as it was when it was a prototype. To maintain quality in the product tighter restrictions must be placed on development. However with the understanding between management, development and customers regarding the different solutions your company can provide, Brownfield projects _can_ be retired. Customers made fully aware of the benefits of new Greenfield products in the pipeline will accept the retirement of existing software. And most crucially, a development team that has opportunities to share Brownfield and Greenfield work around from release to release is one where no developer will feel disheartened or come to the conclusion that they should never work for a big company again.
