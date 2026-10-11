---
title: "Aligning Product and Engineering"
date: "2026-10-11"
category: "management"
featuredImage: "/images/collaborate.jpg"
---

How do you align product and engineering when communication has broken down?

A product peer friend of mine is mentoring someone who has this problem, and they asked me to reach out to them to see if my engineering perspective might help. Ahead of time I thought my advice was going to lead straight to, "You need DORA metrics in place, and to ask engineering to break work their work into smaller deliverables, then repeat."

To be honest, that solves 90% of most team's delivery problems.

But the issue isn't that they aren't shipping, but that they aren't delivering what was asked. More fundamentally this is a lack of trust between the two. Engineering are taking significant liberties when it comes to making autonomous decisions without checking-in with Product. As a result, there is great frustration at Engineering making the wrong trade-offs.

The problem from the Engineering point of view is that Product aren't providing them with detailed enough specifications. Every time Product say, "That isn't what we asked for!" Engineering counters with, "You should have specified your requirements in more detail!" Product on the other hand, (correctly) asserts that they shouldn't be responsible for writing documentation the length of War & Peace — if for nothing else, the more you write, the harder it is to validate that every bit of context was adhered to.

Product and Engineering don't have enough trust to collaborate effectively, which leads to less timely communication when it counts. The solution is a document called a One Pager.

## One Pager

A One Pager answers four questions:

1. what's the problem?
2. what's the customer impact?
3. what's the first step?
4. what's the measure of success/failure?

These are the key steps in getting to alignment, and ring-fencing the next deliverable. If you cannot describe the problem, no one will understand any solution. If you cannot describe how it affects customers, no one will think it needs to be prioritised. If you cannot describe a self-contained first step, no one will have any confidence in your ability to break a problem down further. If you cannot say how success or failure will be measured, no one will know whether the proposed work delivered anything of value.

These questions are tricky to answer succinctly, but if you cannot ELI5 (expain it like I'm five), that's a limit of your ability to communicate, and thus collaborate, with others.

#### The document is ONE PAGE and no more

This is the hardest requirement. The more expensive alignment becomes, the less likely it is to happen. Or, the longer someone will go down the wrong path before getting course corrected. If the document is physically not allowed to be longer than one page, time cannot be wasted writing endless paragraphs, or gathering innumerable data. It should be possible to write one in 30 minutes, and shouldn't expect more than one hour to write one. This absolutely is a feature of the One Pager process: make it a cheap document to write, but also, make it a cheap document to _read_. A good alignment process could have an idea proposed at the start of the day, the document written before lunch, a meeting scheduled for the afternoon, where a decision is made about whether there's alignment enough to proceed.

#### Anyone can write a One Pager

The purpose of the document is align product and engineering, and come to a joint decision about what to commit to. It doesn't state who has to write one. In the example I mentioned above where Product and Engineering weren't communicating well, I specifically recommended that _engineering_ be responsible for writing the documents. This is the only way to satisfy a perfectionist who will never be happy with getting the exact specifications. If you're thinking, "Well how are they meant to know what to build, that's the job of product!?" then I suggest that no document will ever fix a broken relationship like this one. Engineering and Product have to dedicate time to begin talking to each other openly.

#### It aligns on what you're NOT prioritising

In my org's teams, I encouraged engineers at all levels to write One Pagers, if they saw an improvement opportunity, or something breaking. If they cared about it, I wanted them to share their view with the whole team, including the product and engineering leads. One early career stage engineer proposed a change to create performance tests with the CI pipeline. I thought it was a great idea. But chose not to prioritise making a performance pipeline, because it was nowhere near the top ten of several important high priority work that we didn't have time to fund — frankly, performance was not a problem that any customer had a problem with.

The higher level view of leadership isn't always easy to penetrate into the minds of individual contributors on the frontline. One Pagers can bridge that gap, and make the next step clearer for the individual. It could make them realise why another project or problem is more important and get them inspired to contribute more there. In this case, it was a signal to the engineer that the kind of things we were building and working towards were not those they were interested in. They left the organisation within the year, and upon reflection, it was the right call for both parties.

#### A One Pager is for the next iteration

It's not forever, it's just about aligning over a short phase of work. Given it's such a cheap document to write and sync over, you can choose how often it's needed based on what's working well for you.



## Gotchas to avoid:

* The problem or customer impact isn't clear. This is not a deeply technical document, and shouldn't read like one. 

* The first step (question #3) becomes a design review. This answer is intentially not a detailed technical plan. It is the first step in deciding whether any experiment or tech spike needs to be done before a design review should be written. Indicator you're on the wrong path: engineers argue back and forth for >30 minutes about how a change should be done.

* The success/fail criteria (question #4) cannot be tested. This could be because the criteria are too vague, too complex, or too ambiguous. The perfect criteria are a binary condition where it's easy to say, true or false, this has been delivered or not. In many instances, ensuring you _can_ measure success becomes the first step. Indicator you're on the wrong path: no one comes back to verify the criteria after the project increment is delivered.


## Further reading

One Pager is a document that I was introduced to by my former manager, but the idea of drawing a line in the sand about starting despite having imperfect information, and using a document to explain what we think is the right first step, is echoed in the fabulous book The Art of Action by Stephen Bungay. If you're a leader of any organisation beyond 100 people, you should definitely read it, or at least look at the synopsis before deciding not to.

