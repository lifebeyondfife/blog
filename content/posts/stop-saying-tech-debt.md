---
title: "Stop saying Tech Debt"
date: "2023-07-23"
category: "essays"
---

If you gave two options to someone who cared about business outcomes, about what they could have, which do you think they’d choose?
  
* new product feature or reduce technical debt
* fix a bug or reduce technical debt
* improved sales channel or reduce technical debt
* more accessible UI or reduce technical debt
* increased performance or reduce technical debt

Technical debt, or more simply tech debt, is the losing horse in every race because only one group cares about the problems caused by it: the engineers on the team supporting the product. A clean, well architected system is easier to reason with, easier to extend or alter. A system where most things are automated is less stress-inducing to maintain. Tech debt is a major concern therefore for engineers, because it’s directly proportionate to how enjoyable their job is. Low tech debt means engineers ending the week with endorphins; high tech debt means engineers ending the week with cortisol.

It’s not that businesses are necessary cruel, or blind to the suffering of engineers, it’s that they’re in a marketplace. Business outcomes have to come first. If you get round to prioritising tech debt because nothing can be delivered, morale in engineering is gone, and half the team has quit, then you’re reacting far too late. The problem is one of marketing. How do you get business leaders to care about tech debt in the same way engineers do?

  
### Stop calling it tech debt


Tech debt is the root cause for the pain and suffering: code which is complex, and requires cerebral effort to change; tests which are unreliable and haemorrhage time; manual processes which are error prone. Tech debt is a handy label for engineers because we instinctively understand it. It classifies a large number of different situations easily. If we want to be given the time to prioritise erasing tech debt, we have to start talking about it in terms of *the outcomes of tech debt*: **unplanned work**.

For example, the manual processes within a system account for 16 hours of unplanned work per week. The complexity of the core classes within the system result in 2 days unplanned work to each new property to the model. The duplicated work within the deployment pipeline results in batched releases failing 25% of the time, resulting in 3 days unplanned work per sprint cycle.

When tech debt is described, not as an annoyance, but as an opportunity cost, as lost time to limited, expensive resources such as software engineers, business leaders start to understand. If you want your engineering team to work in a way where systems get better over time, stop using cheap tricks like sandbagging delivery estimates, or threats to refuse to work unless time is given toward tech debt reduction. Build a more honest, collaborative relationship with your business leaders.

1. Measure everything. Start tracking how long things take, and the underlying reason for the time. Make the data tell a story. Business leaders will expect you to show your working, so be honest and transparent.
1. Stop saying tech debt, and start saying unplanned work. Show how delivery could be so much faster.

Working on system with a high degree of tech debt is not necessarily a fact of life for engineers. It varies from company to company. If you are able to demonstrate the size of the inefficiency that a company is putting up with, you might get to work on the change you want. The winning choices in these proposals aren’t so predestined.

* new product feature or reduce unplanned work by 10 hours per week
* fix a bug or reduce unplanned work by 15 hours per week
* improved sales channel or reduce unplanned work by 5 hours per week
* more accessible UI or reduce unplanned work by 10 hours per week
* increased performance or reduce unplanned work by 20 hours per week

  