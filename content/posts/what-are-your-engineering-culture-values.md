---
title: "What are your engineering culture values?"
date: "2022-11-20"
category: "management"
---


Perform an activity frequently enough, and you will start to see patterns. After being involved in the process of creating software for two decades, I’ve decided to curate a living document of the high level patterns which are most applicable for how to build and maintain software well.

Before beginning, it’s crucial to make a statement which is obvious in retrospect: not all of these patterns are equally applicable to companies of differing maturity e.g. a one person startup is a vastly different animal to a 50,000 person megacorp. These observations most apply to mid-level startups, or large companies that are still growing. To borrow from Cringely’s [Commandos, Infantry, Police](https://blog.codinghorror.com/commandos-infantry-and-police/) analogy, these are mostly applicable to companies that are, or aspire to be, infantry.

These are my engineering culture values, what are yours?

## 01. Tradeoff

Everything is a tradeoff. When you make a decision, you’re choosing where you sit between two extremes. It’s a useful thought exercise to consider what those two extremes are first to calibrate your options. Many times there is no correct answer, therefore, halt the unending search for one and instead make peace with understanding why the tradeoff you’ve chosen is the best one available.

## 02. Utility

Reliability is the first feature of software. Be like a utility company: always there, always available, always working. Be something that your users start to take for granted. If you are not reliable, your users will bake a failsafe alternative into any of their solutions that include you. This makes the path to replacing you much easier. Being reliable and consistent is the ultimate “sticky” feature.

## 03. Ownership

You write it, you run it. Engineers who aren’t responsible for the consequences of their code breaking, do not consider their choices as carefully as those who are. If an engineer, or their teammate, could be paged at 4am because of a quick hack, unconsidered edge case, or half-hearted testing, they are personally invested in making sure those bad practices don’t happen.

## 04. Deliver

Ship, ship, ship. No one is paid to write software, but rather solve problems for paying customers. Reid Hoffman sums it up perfectly, “If you’re not embarrassed when you ship your first version, you waited too long.” Engineers can be perfectionists, and while the aspiration in general should be lauded, the reality is that customers are impatient. The perfect feature can become Captain Ahab’s white whale. Deliver.

## 05. Automate

Go slow, to go fast. This is the other side of the coin to _04 Deliver_. Because it’s so important to be relentless in the goal of shipping, automate everything that it [makes sense to](https://xkcd.com/1205/). Concepts like blue/green deployments can mean literally every step after code review can be automated. This frees engineers from artifical constraints of how small an incremental unit of software can be, before it’s ready to be shipped.

## 06. Data

Better decisions will be made with supporting data. All kinds of design, product, and engineering questions can be bettered answered. This is why there are so many different monitoring tools: UI analytics, BI events, operational logs, APM, outside-in monitoring, A/B tests. These can support techniques like KPIs, and SLOs in an automated manner, guiding the right path for decision makers.

## 07. Blame

The fault is in the system. Don’t blame a person for a mistake, fix the system. Blameless retrospectives, with root cause analysis (also known as “five whys”), is the foundation of maintaining great operational standards. Shooting the messenger is the quickest way to ensure that no one reports bad news, and encourages ongoing operational problems faced by users to be ignored.

## 08. Temporary

All software is temporary. There is never a version of software which is completely done. Once you realise this, you can stop thinking about choosing between a short temporary fix, and a longer permanent solution, because even the permanent solution is temporary. You only ever buy yourself runway, so consider the length of time you buy for each choice. Sometimes the quick fix is the right choice.

## 09. Flexible

Budget, features, timeliness: choose two. Users don’t know what they want, only what they don’t. This is why we build using Agile and not Waterfall. Estimates for Agile though are terrible at best, and sometimes what looked like certain success can lead quickly toward failure. Always be flexible. If budget is fixed (or violates the learnings of the Mythical Man-Month), can we reduce features, or do we ship late?

## 10. Done

When the work is mostly finished, at 80% complete, you only have the remaining 80% left to finish. Estimations for completion dates can be wildly wrong if only the time for the coding is considered. Ensure the definition of done is baked into every deliverable from the start: code is developed, manually tested, automated tests written, documentation updated, deployed to production, and in front of the user.

## 11. Unplanned

Only engineers care about your technical debt, unlike users. The job of an engineer is made harder by technical debt, so they will always make the case for reducing it. Rather than ignoring them, make a business case for why it’s hurting users. Unplanned work is a symptom of technical debt. Start to track it, and measure its cost in slow delivery, broken features, and operational incidents. Redress as required.

## 12. Why

Deliver the most important thing, and deliver it well. Autonomy should be the goal for every individual, team, and organisation in a company. People work best when they understand the constraints and freedoms they are working under. This only happens when leadership reporting lines are in alignment. And this only happens when people are free to ask as many questions as they need to understand “Why?”

## 13. Opensource

The open source community has led by example, showing how to build distributed software at scale. README.md documents are for strangers, not the team that works in the project day-to-day. Optimise for internal open source within your company: make README.md docs which are clear to engineers from other teams; make CONTRIBUTING.md docs which state the expectations for external merge requests.

## 14. Hiring

Hire for weakness, hire for learning. Hiring managers and engineering interviewers should recognise the bias *in* themselves, for people *like* themselves. When hiring, look for what’s missing. Is it a technical skill, or a people skill? Diversity of thought makes for better decisions — what viewpoints are you missing? Hiring decisions should be made by those who want people who can teach them something.

## 15. Lottery

The lottery factor of a system, is the count of how many engineers understand it (assuming the engineers would instantly leave the company if they won the lottery). If you have a lottery factor of 1 to a critical system, you are in a dangerous position. Reward those that make themselves redundant, those who increase the lottery factor of everything. Ensure engineers know to share knowledge, rather than hoard it.

## 16. Duplification

With everything being a tradeoff, one downside of autonomous teams is that they occasionally duplicate work. The best you can hope for is to be aware of it, and contain it to some degree. For a system that performs some specific service which is demonstrably valuable, it’s better to have one of them rather than two or three; however, it’s better to have two or three of them, than it is to have none.

## 17. Failure

Sometimes the only way to let progress and improvement happen, is to allow a controlled failure to happen. Warnings from those with experience can be abstract and hard to understand. Heroic efforts to thwart every minor disaster will become a necessary part of how your team, org, or company functions. By letting a controlled failure occur, you can start the conversation about how, and where best, to fix it.

## 18. Culture

Culture is defined by what you let happen. If you’re aware of a pattern, process, or behaviour occurring, no matter what’s said, it is implicitly condoned. Often, suboptimal, or outright dangerous culture exists because it’s a deeply ingrained habit – those are hard, and time consuming to undo. Also, you cannot successfully unlearn multiple habits at once. Pick the most important culture change and reinforce.