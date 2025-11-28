---
title: "Developing in Remote Teams"
date: "2011-12-16"
category: "essays"
tags: 
  - "development-in-practice"
  - "remote-development"
legacySlug: "84-remote-dev-teams-html"
---

I don't need to tell you just how revolutionary the internet and other hi-tech telecoms advances have been in changing the way we live and work. Indeed, producing software in distributed teams is a technical challenge that has long since been solved and I'd be surprised to hear from any developer who has never worked with a colleague at a different physical location from them. But making something possible and making something work well are two entirely different things. In this blog post I'll quickly recap some of the different kinds of remote development, share my insights from working both in a company with a remote development site and being the remote developer myself. Hopefully I can convince you that when done correctly, remote development teams are just as productive as wholly centralised ones.

## Three Types of Remote Development

Whether you're working with Peter from 50 miles away, Pedro from 500 miles away or Poornima from 5,000 miles away, how you work together as a team very much depends on what kind of remote worker they are.

- **Telecommuting** - A single company employee most likely working from home by themselves.
- **Outsourcing** - One or more contractors working for another company at the same remote location.
- **Offshoring** - One or more company employees based at the same remote location.

With oil prices, populations and congestion on transport infrastructure rising at the same time residential internet bandwidths are increasing, it's inevitable that we'll see more and more developers wanting to take advantage of telecommuting - even if only sporadically to cope with the pressures of, say, two parents working. Large software companies, and especially managers, prefer to have their employees all under one roof but it's becoming increasingly normal to cater for those who can't. At my last workplace when the head of software architecture announced he was leaving the London HQ to emigrate to Spain, the company worked around the logistical problems to keep him onboard. The web is full of telecommuting "Dos and Don'ts" so I'll wrap up with a link to this excellent sweary diatribe against companies [unconvinced by telecommuting](http://www.garann.com/dev/2011/the-150k-solution/). To quote one line that sums up the theme nicely, "If your company lacks the tools to communicate remotely, it’s highly probable it can’t communicate _at all_".

The motivation for telecommuting comes from the remote worker themselves i.e. personal circumstance makes it more convenient or cost effective to work at or near their home rather than travelling daily to the office. With outsourcing and offshoring, however, the motivation and driver for this type of remote development is different. A company accountant - who likely views software development as purely a cost centre - noticed that developers with university degrees could be hired in economically developing countries for much less money.

These two types are often used interchangeably or thought of as basically the same thing. Nothing could be further from the truth. A few weeks back I met with some former colleagues on a night out. I mentioned that I had been doing some contracting work and two people independently of each other instantly came back with, "Cowboy work, huh?" Whether deserved or not, there is an impression that contractors don't care about quality, they simply want to charge their time and hand over some code that they can then wash their hands of. Employees of a company are different, there is no hand-over only more work and more support of your previously written code. So outsourcing is contract work, offshoring is internal work - both done in another country or continent.

## Economics and Global Positioning

As mentioned above, one of the primary reasons for outsourcing and offshoring is the economic advantage.

| Country | GDP Per Capita |
| --- | --- |
| United States | $46,860 |
| United Kingdom | $35,059 |
| Japan | $33,885 |
| Brazil | $11,273 |
| India | $3,408 |

[Source](http://en.wikipedia.org/wiki/List_of_countries_by_GDP_%28PPP%29_per_capita) for above table, and some further [data](http://www.worldsalaries.org/computerprogrammer.shtml) relating specifically to computer programmers.

India stands out for three main reasons. It boasts a highly developed education system with a competitive workforce largely down to having more universities than any other country. English is also a well spoken language in India and as the figures above show, the average earnings can be less than a tenth of other countries (I concede this isn't an accurate comparison of like-for-like software engineer wages in each of those countries but I'm mainly trying to paint an overview of the relative spending powers).

There is [more debate today](http://www.cio.com/article/488586/Is_Outsourcing_Cost_Effective_) on whether the potential savings are really worth the logistics of extricating the work of a team from one location and moving it elsewhere but regardless, it's an [operation that](http://www.zazona.com/NewsArchive/2006-06-10%20BofA%20Train%20your%20replacement%20or%20else.htm) [has already been done](http://www.msnbc.msn.com/id/4459380/ns/nightly_news/t/outsourcing-training-your-replacement/) [many times over](http://slashdot.org/story/04/04/06/2137233/train-your-own-replacement). And the nature of how those extrications took place presents an elephant in the room that must be at least mentioned: prejudice against working with outsourced/offshored developers. Many workers were instructed by management to train other developers from several time zones away literally to replace their own jobs. Those left behind were the first generation who had to iron out all the problems that remote development entailed. It's understandable that many experiences were not good ones but it's important to make sure the right lessons are learned rather than the creation of simplistic stereotypes about all developers from country x.

## Developer Workflow

Whereas in the past, the office administration was oiled with a constant paper trail, almost everything is now an internet / intranet service. Shortly after joining one company I was told they had in recent years finally done away with a physical object that acted as a code check-in token. Nowadays though for the sake of sanity and reliability we have source control systems that can pull out arbitrary check-ins, automated builds and unit tests, code review tools, shareable office documents, locally mirrored shared servers and bug / issue tracking systems. Those are the things that even an all on one site outfit should have. Add to that a few meeting rooms with a [good quality business telephone](http://www.polycom.com/products/voice/conferencing_solutions/conference_phones/soundstation/soundstation2.html), some teleconferencing and [webconferencing](http://www.webex.com/) accounts and sys admins who can handle a workgroup stretching over international borders and we're all set for remote development. To revisit the quote from earlier, most of these overheads should have already been met in your workplace to allow non-distributed development to take place efficiently. The real hard work and effort comes in adapting your development workflow.

- _Timezone overlap_

Depending on where the two locations are, there could be several hours difference between time zones. Where I'm based in the UK, I've worked with others in central Europe (+1 hour), India (+5.5 hours) and east coast USA (-5 hours). If we take the average working day as spanning around 8.5 hours, that means we're restricted to roughly 3 hours with India in the morning and 3.5 hours with the US in the afternoon. Working hours need to be flexible when necessary, especially when you consider pairs of countries like the US and India, or the UK and Japan where absolutely no business hours overlap. However small the window is, both sites must be aware of it and take advantage of the only realtime two-way communication opportunity they have.

- _Separation of tasks_

Software is made up of many different parts coming together. One software solution can be created from several independent projects if it's planned correctly ahead of time. The cleaner the separation of coding tasks between sites, the more smoothly the process will run as a whole. Time won't be wasted waiting for the overlapping business hours so emails can be answered, actions processed, or phone conversations had. It's worth mentioning that one site, generally where the senior development management is based, drives the direction of the development. Everyone has their favourites and when drawing up tasks for the team, invariably it's the bug-fixes, investigations and legacy projects that get given to the remote locations. You can argue about the fairness of this but unless you're actually in the same office as the person deciding who does what, your personal objections will be overlooked.

- _Separation of responsibilities_

One of the benefits of having remote developers is not just taking on new development work but also that their skills and knowledge can be built up to take on code ownership to handle support queries and bug fixing. These not particularly rock 'n roll tasks are quite often the ones that developers in the main development location are more than happy to hand over. However, this cannot be at the cost of responsiveness. Your development sites may work around a small window of timezone compatibility but don't expect your clients to do the same. Responsibilities passed to a remote site cannot be completely forgotten about.

## Remote Development Done Well

Workflow changes are just the tip of the iceberg though. It looks so easy on paper to start working with remote developers once the infrastructure is in place but I've seen it go so wrong in the past when certain steps aren't followed. I've also seen it go really well when companies go that extra mile. Here are my top tips for remote development done well:

- _Initial training onsite_

If you want your remote workers to follow the same processes and use the same technologies as those in the main location, some onsite training is essential. Your new hires may have experience with 90% of the tools that you use but it doesn't matter what it is, if some problem trips up a developer working with only a couple of other similarly inexperienced staff in a remote office when it's 22:00 in the main office, that's it - no more work will be done until the next day. Remote workers need to be given at least as much hands-on training that those at the main location are given so they can hit the ground running. Probably more as they won't be able to ask quick 30 second beginner questions as easily.

- _Accountability to management in primary location_

This is by far and away the most important recommendation I will make. I'd go as far as to say, not doing this is tantamount to expecting to fail. Around the time I started work at a company with a UK development team working well with a remote site based in Pune, India, my former employers started out with a similar offshoring setup with developers based in Bangalore, India. Things started well and they ticked the initial box of making sure the remote developers came onsite to be trained by the developers from the primary location.

According to my former colleagues the developers who came over were not good. They'd take long lunch breaks, leave early and require constant supervision. Even basic computer skills were lacking e.g. clicking and holding the down arrow on a scroll bar for several minutes to navigate a document thousands of lines long rather than dragging the bar in a couple of seconds. When I asked how they were selected it turned out that management above the development director for that product area had simply assigned them there. No input into the decision making was given to the guy responsible for producing the software - no chance to turn around and say, "These developers aren't at the standard we require." No matter where you are in the world, pay below the market rate and you get below average developers.

- _Bootstrap process_

By contrast, the developers I was working with based in Pune were for the most part exemplary. They were skilled, hard working, proactive and required little direct management. This was thanks in large part to following the above two steps, starting off small and bootstrapping the remote team.

To begin with only a few hand-picked developers were chosen. Low risk projects were chosen to gauge how good a fit they were with the existing team e.g. refactor code, rewrite existing modules from an obsolete tech into a new one. See which developers would make the best team leaders. Once the development management at the primary location are confident things are progressing well and they have competent remote developers, hire more and adjust the management structure in the remote site i.e. promote where appropriate and delegate more hiring decisions to those out there who know what is required to be able to do the job.

- _Instant Messaging_

Less invasive than a phone call, more immediate and flowing than an email. Instant messaging is the best way for two or more people who can't congregate at the same desk to have a quick chat. Make sure you have a standard company backed IM client. It even looks like you'll be able to [build your own](http://windowsteamblog.com/windows_live/b/windowslive/archive/2011/12/14/anyone-can-build-a-windows-live-messenger-client-with-open-standards-access-via-xmpp.aspx) with some Windows libraries soon.

- _Complete inclusion in the process_

When I worked as a remote (offshored) developer, it was as a single member of a team based in Stockholm, Sweden. They were using an [Agile](http://en.wikipedia.org/wiki/Agile_software_development) development technique, namely, [Scrum](http://en.wikipedia.org/wiki/Scrum_%28development%29) with which I was unfamiliar. Owing to technical difficulties setting up a webcam in the relevant place, I was excluded from the daily scrum call. Instead I'd have to give one-to-one updates to my manager. All the sharing of information from the scrum process was being missed.

I'd already been working for the company several years so I had no problem accessing the required systems or software, or so I thought. The main trouble arose from a few of the servers not allowing access to computers connecting from outside Sweden. Though I was still able to write code and contact my team for most of the working day, these small drawbacks had an effect on my practical efficiency but also left me feeling like not a full member of the team. Which brings me on to...

- _Two locations, one team_

This is probably the hardest recommendation to get right, requires the most work and needs the personal backing of developers in the main location. If all you see of another developer in a remote site is a username next to a check-in in your source control system then you don't have another member of a team, it may as well be a robot doing that. True teamwork comes from people knowing each other: knowing what they look like; where they're from; what their interests are; meeting up at the same site occasionally and having non-work conversations / socialising as a group outside of the office. From that, personal relationships are formed in the same way that they are within the main office. Communication across the large divide between the two sites becomes effortless.

This is something that constantly needs to be worked at across the multiple sites. My last company frequently had developers and analysts coming over to the UK from Pune for pertinent project meetings or training. Most of the time all the developers in the office were familiar with the identity of the visitors, even if they hadn't met, from conference call team meetings. It meant people actually wanted to talk to each other rather than feeling obliged out of politeness.

For a while one of my biggest integration projects was being regularly tested by the same guy, Mark, from our remote location. We'd end up speaking to each other a few times a week as we'd get through some difficult technical issues over the phone and via sharing desktops. A couple of years after the project ended and we no longer worked with each other he was back visiting the primary development location on other business. It was good to meet up again, I took him [punting on the Cam](http://www.google.co.uk/search?q=punting+cam&tbm=isch) and he had brought me a [small souvenir from India](https://lifebeyondfife.com/wp-content/uploads/2011/12/elephant.jpg). As I was leaving that company the offshored development team was as large as ever but owing to a few years of very little crossover development between the sites, the personal relationships had mainly dried up. I'd noticed fewer people were organising social events for visitors and most struggled to even introduce themselves.

##  In summary

I know this article won't be read by CTOs or otherwise similarly positioned managers who make the decisions whether to go for remote development or not. But regardless it's the developers and team leaders who have to make it work to produce quality software. Hopefully I've made the case that it's not all bad.  Coherent and well run remote development is possible, and remember there are plenty of suggestions you can put into practice to give yourself the best chance of successful software collaboration.
