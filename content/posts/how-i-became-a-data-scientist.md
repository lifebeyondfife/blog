---
title: "How I became a data scientist"
date: "2016-08-26"
category: "follies"
tags: 
  - "data-science"
  - "machine-learning"
---

During the #firstsevenjobs trend on Twitter, I [tweeted](https://twitter.com/LifeBeyondFife/status/762545657085325312) my rather standard career path into software. It piqued the curiosity of a friend and former colleague who was interested in my minor blip as a data scientist - it was a surprising and short six month period in my career and fairly recent.

Here's my story about why, and how I became a data scientist, and more importantly, some lessons on why it didn't work out.

 

## history of me

Before launching straight into recent history, I'll briefly cover my early career where I was a computer scientist researcher. Growing up I only ever wanted to make computer games, but despite a job offer from my favourite games maker in 2000, I took a chance to study computer science at a deeper level. I became a PhD student looking into combinatorial search, specifically constraint programming, and using group theory techniques to reduce redundant computation solving NP-problems that exhibit symmetry.

Something about abstract mathematical concepts in computer science fascinated me, despite how impractical they appeared to friends engaged in systems research. Spending days and months empirically evaluating and theorising which were the best algorithms and why, led to the classic exclamation, "I'm not a theoretical computer scientist, and I can prove it!"

O_o

By the time the laughter had subsided, I was finished with research and found myself a software engineer with a largely unused doctorate. I loved writing code and solving problems - genuine problems with a business case - but I was always looking for more mathematical computer science avenues that would satisfy my interest and ability.

 

## catalyst

A decade later I arrived at a technology unicorn, one of the few in my home nation. Much smaller than my previous employers, it was strange to regularly receive the thoughts of the CEO, with the expectation that these thoughts should guide others to grow the company in certain directions. One such thought was shared repeatedly, "Internet economy success is converging on being a machine learning problem."

"What's machine learning, again?", I thought. Having a PhD in artificial intelligence had made me immune to a lot of the hype of strong AI that I filtered out when browsing Hacker News. After a modest amount of online research I saw that machine learning included artificial neural networks, something I had studied as an undergrad and found interesting. This all sounded quite interesting in fact. Computers were several orders of magnitude faster now than when I had learned about these techniques and delivered real world personalised applications on the web. This was a chance to do something grander than delivering backend services.

 

## mooc

Having recently completed a music production, and startup engineering [MOOC](https://www.coursera.org/learn/machine-learning) on Coursera, it was the obvious place for me to turn. When you know nothing about a broad and deep subject, a curriculum aimed at the beginner is good grounding for supplementary knowledge. For instance, the concept of decision trees is not covered in this course, however, when I learned of them later I had the necessary grounding to put them in context with the rest of my knowledge. The course was long and the exercises complex, but the lecturer, Andrew Ng, is renowned world wide, and this MOOC had obviously been tested and incrementally improved.

A few years ago, no one really knew what a MOOC was. Now I see many more sharing my view that they're [future of education](http://lifebeyondfife.com/the-future-of-education/), but with that utility comes cost. Though the course is free for those who want simply to learn, to be certified as passing this course there is a charge (£60 for the UK).

Recently I saw colleagues complain that this course is taught in [Octave](https://www.gnu.org/software/octave/), an open source version of Matlab, rather than a language that would realistically be used in practice such as Python or_\*shudder\*_ R. I have no problem with this, there's room enough for all languages, but machine learning does demand some rigorous understanding of linear algebra i.e. matrices and matrix operations. The decision to teach in a language optimised for those constructs is a good one, leaving the work of transferring the understanding to a language of their choosing to the student.

After three long months of working evenings and weekends (for a 100% pass, your life is definitely put on hold for a quarter), it was finished and I thought about how this knowledge could be useful for my new employer.

 

## internal course

Solving travellers' problems in getting from A to B has many areas where machine learning can help. What is this traveller looking to optimise: cost or convenience? Would suggestions for alternate locations be welcome, and if so, what should they be? What will the estimated price be for a given intinerary in a months time from now?

I was building a backend service for integrating a payment API at the time, how on earth could I shoehorn that into the day job? The short answer is, you don't. I began with spreading the word and convincing others. Thankfully, my company had just such a platform for this. I created a three part course introducing artificial intelligence generally, machine learning specifically (with examples of how it could help our company), and concluding with a technical session training an artificial neural network.

There was already a regular data science meetup which covered a myriad of subjects related to data: logging at scale, visualisation, querying large data sets. Except for the final session, the course I'd created was primarliy for the benefit of non-technical employees. It's not enough for engineers to be able to build something, they have to sell the vision of why it's beneficial in the first place.

 

## CDO

It was clear to me the company was not yet aligned for arbitrary machine learning projects, and the course I created had done little to move that on. Within a couple of months, and independent of my efforts, a Chief Data Officer was recruited and my name came up on an unofficial list of people "interested in data". After a few short discussions, I agreed to join his new team as a data scientist. Specifically, I worked as an apprentice to his right hand man from a previous company. It was exciting to be learning more on the job from those who'd seen it all before.

 

## data science in practice

The beginning of being a data scientist saw me take on the task of investigating an idea in flight urgency. If there was a way to discover which itineraries were about to sell out, we could alert the traveller to that, and hence signify the importance in booking soon. I learned implicitly two observations:

 

1\. A data scientist needs (at least some) competence in three areas: [data engineering, data analysis, and data science](http://www.kdnuggets.com/2015/08/3-components-successful-data-science-team.html). As a data engineer, you must be comfortable setting up EMR clusters for Spark jobs; writing Redshift, BigQuery, or SQL queries; being proficient in shell scripting; creating a backend web service. As a data analyst, you must be proficient at visualising data; creating notebooks that tell a story of discovery. And as a data scientist, you must understand the available models, and how to parameterise them to learn a given data set.

 

2\. Despite needing all these skills, the majority of a [data scientists job is janitorial](http://www.nytimes.com/2014/08/18/technology/for-big-data-scientists-hurdle-to-insights-is-janitor-work.html). There are so much data and it's invariably in the wrong place, and in the wrong shape. Much of the daily duties are therefore in finding those data, writing ETL (extract, transform, load) scripts, and generally automating the collection and aggregation as necessary. Only once a useful and succinct data set is gathered, can the tools of machine learning be used.

 

Though I had taken the time, say, to understand the formula for logistic regression, learned about recommender systems, and multiple validation techniques guarding against bias or overfitting, the most relevant experience for being a data scientist came from my years of troubleshooting linux, and programming in a declarative style. On that last point, seriously, if you think in [LINQ](https://codeblog.jonskeet.uk/category/edulinq/) or other higher order functions while programming, you'll find [Spark](https://spark.apache.org/) (the next generation Hadoop from Apache) straightforward to pick up.

Progress in the flight urgency project was slow yet steady. Everyday more was understood and the story of what to do next was taking shape. Insights were shared around the company and prototype services were created. But just as the results of the first A/B test were coming back, the CDO's time at the company came to an end. The work in establishing data science across the company had stalled before it barely started.

 

## reasons for failure

Looking back I can see many reasons for the stalled data science revolution.

 

#### No time spent realigning organisation

The company was not organised to facilitate arbitrary data science features. Product owners were not courted nor shown the benefits of machine learning. There was no communication of the work being undertaken, and worse yet, no consultation was made for suggestions of what _could_ have been rich avenues to look into from industry experts. The data hold the information, but not the narrative.

There were further organisational problems. Other teams had long existed with data scientists that were operating independently of the CDO. There was no cohesive, company wide plan.

 

#### Data Science requires specialised and cross team collaboration

It's not enough to perform some cursory modelling and get a service into production. Organisations maintaining world class engineering standards cannot just put some test code on a box in the intranet and get a software engineer to do the rest. In this case, owing to my background, I was able to do both the data science and the software engineering which meant the product owner was happy to accomodate our work.

Whatever your standards of production server provision and deployment, you must consider how to take code from a data scientist and get it into production. Who does the front end coding? Who integrates the feature with the A/B testing framework? Who owns the back end service? These questions need answers.

 

#### Insight should not be where it ends

Though visualisation and telling a story with data are important tools in getting a message across, they should not be the end of the investigation. So often I see internal blog posts and reports about the differences in traveller cohorts, or the most important elements of an application's UI. These ideas will not simply be absorbed via osmosis by all the product owners, marketers (sorry, growth hackers), and engineers. Shared insights should be the bare minimum and not the goal. One colleague who gets this point suggested that we don't communicate anything about a project until the implementation is live, forcing the focus where its needed.

 

#### Failure of persuasion

Regardless of whether the optimal thing had been built (it hadn't), there should have been broader persuasion to get others on board with what we had. People in the business should have known about the new data science teams and how they were going to grow the business. Engineering teams approached by a data scientist should have been excited to integrate new features and try out some experiments.

 

## lessons

If you want to be a data scientist, recognise that the challenges are different whether or not your company already has successful machine learning projects.

Companies already aligned to consume the output of data scientists are more predictable in how to move to this role. There will likely be interview questions and required competencies you can discuss internally with hiring managers.

For someone who wants to bootstrap data science in their company, there are many challenges only some of which are covered in this article. The main things to consider are that understanding machine learning is only a small part of your new role, you must be successful at persuading others to come on board with you. Start small, and demonstrate value.

 

## what I'm doing now

Over a year on, the company is in a much better position with many issues resolved or nearing resolution. Our data collection is much improved, with a central [kafka](http://kafka.apache.org/) based system that greatly simplifies the ETL work for data science investigation. We have hired several new experienced data scientists and there are more still to join. We have developer enablement teams making tools to go from code to production in hours rather than days. And I've had many talks with the head of the data team about the problems I saw, described only briefly in this article.

I learned a great deal from my short time as a data scientist. I doubtless could still be doing that today if I'd elected to stay. But rather, in the resulting loss of momentum, I took advantage of a more standard career path for a software developer in another team when a technical manager role became available. It turned out to be a great move and I'm happy to be leading a stellar team of enthusiastic, young engineers. Perhaps one day I'll get that theoretical computer science buzz in my day job, but for now I'm enjoying solving people, process and organisational issues as much as technical ones.
