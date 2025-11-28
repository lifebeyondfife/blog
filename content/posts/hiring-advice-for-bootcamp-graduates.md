---
title: "Hiring advice for bootcamp graduates"
date: "2021-08-12"
category: "essays"
---

I'm currently trying to hire as many software engineers as I can, and more and more I'm seeing applications from candidates who retrained via an intense, engineering bootcamp. I want to hire every single one of them. In general whenever I'm interviewing someone I want them to succeed regardless, but there's a lack of diversity of thought in tech and when I see someone with a background in marketing, customer support, or even a short order cook, I get excited about what they could teach me.

  

Anecdotally, I see the tech enthusiastic clique who started coding when they were a teenager, or perhaps even earlier, as the most populous cohort. Solving programming problems is our crossword puzzle, or sudoku. With data from the [Stack Overflow Developer Survey 2021](https://insights.stackoverflow.com/survey/2021), I can say more definitively that over 80% of industry professionals have a university degree, over 90% identify as male, and over 60% are white. It's my belief that getting people from different paths, different walks of life, with different behaviour types, builds a more diverse, and thus a stronger team ([as explained in this book](https://www.surroundedbyidiots.com/en/books/surrounded-by-idiots/)).

  

![](https://lifebeyondfife.com/wp-content/uploads/2021/08/bruce.webp)

_"I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times."_ — Bruce Lee

  

I know why bootcamps arrange their syllabus the way they do. They prioritise breadth. Résumés of bootcamp graduates are impressive because of how many modern technologies are listed, as well as how relelvant these are to modern internet economy companies. The result suggests a software engineer who can work anywhere in the stack whether they're updating a web frontend in Vue, a mobile app in React Native, or fixing a backend service in Java or Ruby. The cost of this breadth, which is necessary to make someone marketable for the full range of engineering jobs available, comes at the expense of depth.

  

![Meme mocking programmers' reliance on Google to do their job](/images/programmer-meme.png)

  

It's an industry joke that no-one knows how to program, and we all just use Stack Overflow. Don't get me wrong, I've used Stack Overflow many times, especially when I'm using a language or technology that I'm not an expert in, and won't be using regularly. However, I learned to code without an IDE; I wrote programs from scratch, again and again until I moved what was a [System 2 skill to a System 1 skill](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow). Software engineering as a career path has seen exponential take up over the last few decades, so at any time, the majority of all software engineers in existence are [the most inexperienced of all of us](https://insights.stackoverflow.com/survey/2021/#section-experience-years-coding-professionally). It's the job of more experienced engineers to teach the correct way of doing things and stop the bad habits; treating software engineering solely as hacking together tech with glue code you copied from Stack Overflow is one of them.

  

![Cartoon which shows an easy method of drawing a character crudely, and an easier method to draw the same character well, but requires a lot of practice.](/images/binky-1-1024x699.png)

  

A penny dropped for me in my early twenties seeing this Matt Groening comic. Sometimes the best way of doing something is the easiest — it just takes a lot of work to make something easy. This is the fundamental idea behind Bruce Lee's 10,000 kicks quote above, or Peter Norvig's [Teach Yourself Programming in Ten Years](http://www.norvig.com/21-days.html). Given not even students from full bachelors degrees spend ten years learning to program, I'm not advocating it takes that long to be employable, but this learning through repetition cannot be skipped.

  

Employers pay for someone who can solve customer problems with code. This can be done by someone who has invested time in three separate activities. First, they must understand the rules of a programming language or technology; they need to know the syntax of how to perform common tasks e.g. writing a C-style `for` loop to iterate over a collection. At high school, this was taught to me as Knowledge & Understanding. Second, they have practiced the core concepts from the previous step multiple times again and again in new and varied situations. I was taught this as Problem Solving. Finally, the successful practitioner takes the skills from the previous two steps and can apply it to larger, real-world problems e.g. handle all the UI, API, service, and database changes to add a new type of product category to an e-commerce site. This third classification was known as Practical.

  

Bootcamps have to teach multiple technologies so they cover the knowledge and understanding element. They also have to be able to show real-world results so they cover the practical side of things too. There isn't enough time to make people experts in only 3 months, so they rush the problem solving, leaving their graduates massively underfitting when exposed to new problems.

  

![GitHub contribution graph which shows a lot of activity for 3 months with nothing before or after.](/images/github-1024x324.png)

  

I can see evidence of this in prospective engineer's git activity. It's full on and frenetic for the months where they're working on their projects and assignments. But once the grading stops, the coding stops, and this is absolutely the worst thing to do. The ability to draw Binky in the easy way needs constant practice, and similarly, bootcamp graduates need to pick a preferred technology and keep coding to backfill their problem solving gap.

  

[![Tweet from Max Howell, "Google: 90% of our engineers use the software you wrote (Homebrew), but you can't invert a binary tree on a whiteboard so fuck off."](/images/invert.png)](https://twitter.com/mxcl/status/608682016205344768)

  

The biggest tech companies have candidates falling over themselves to join, which is a nice problem to have. Interviewers have taken a cookie-cutter template of what their "best" employees look like and, in an effort to "raise the bar", they make the questions harder and harder. I wish I'd written this blog post because it's just so perfect: companies should [hire for weakness, not talent](https://benjiweber.co.uk/blog/2021/04/10/dont-hire-top-talent-hire-for-weaknesses/). If Google had done the same, they would have almost certainly offered Max a job.

  

With that said, I am a 20+ year computer science veteran and not all theoretical computer science topics are esoteric nonsense to lord over industry novices. A few years ago an outage occurred in a service under my responsibility. It took a lot of investigation into the telemetry and logs to discover but it came back to a long (multiple hundred lines of code) function. This is bad programming practice. It had a single value that was expensive to calculate evaluated multiple times. This is bad programming practice. This recalculation was done in a nested for loop, which was harder to spot owing to the lengthy function and multiple layers of nesting. This is bad... you get the idea.

  

I want programmers joining my teams to be able to break problems down as easily as tying their shoes. And I want the programs to run in linear time so that the service code doesn't fall over when large inputs are passed in. This is what bootcamps gloss over by necessity, because they do not have the time. The good news is, the remediation is simple, it's just hard work that needs to be applied repeatedly.

  

## Big-O Complexity (Knowledge & Understanding)

For simple algorithms, you may be able to construct a formula determining how many instructions it will take to complete for a given input (for non-simple algorithms, let's save the Halting Problem for another day). Discard all but the largest term of sums for that formula and you have the [Big-O](https://en.wikipedia.org/wiki/Big_O_notation) time complexity of the algorithm. For an input of _n_ items, a linear complexity, _O(n)_, is ideal, _O(log2(n))_ even better. If you know the input is manageably small, _O(n.log2(n))_ or possibly even _O(n2)_, might be acceptable. Anything exponential e.g. _O(2n)_, should be a red flag that [another approach is needed](https://lifebeyondfife.com/helping/). Premature optimisation and trying to squeeze clock cycle efficiency out of code is unnecessary in almost all cases, but this low bar of algorithmic efficiency isn't theoretical naval gazing but necessary to create responsive products that respect users' time.

  

## Data Structures (Knowledge & Understanding)

Choose the correct data structure when solving a problem and the code pretty much writes itself (see [this discussion](https://softwareengineering.stackexchange.com/a/163195) on a relevant quote from Linus Torvalds). It's obvious to me someone hasn't practiced enough problem solving when they struggle to consider what data should be persisted to break the problem down, or how it could be represented. Lists, stacks, heaps, hashtables (or maps, dictionaries, objects, whatever you know them as), trees, graphs... they all have their uses. Most will get by with just lists and maps, which is why Python and JavaScript both make creating these data structures extremely easy (`[]` or `{}`).

  

## Data Structure Operations and Big-O (Knowledge & Understanding)

Combining the previous two topics, software engineers should know the common operations available to different data structures e.g. retrieve an object from a map. They should also know the Big-O time complexities of these operations so they can evaluate the algorithms they create and validate they have an acceptable complexity in total. They should know the Big-O complexity of general operations as well e.g. sorting algorithms. Create a working solution however inefficient to begin with is great, but then challenge yourself, "Can this be done better?"

  

## Apply The Above (Problem Solving)

This is the most important paragraph of this whole post. Find programming problems and solve them. Find more and solve more. Keep going, this is practicing one kick 10,000 times. This is your route to being able easily to convince anyone that you're a good programmer. My personal recommendation in recent years is Advent of Code. There are several years of problems open to all ([2020](https://adventofcode.com/), [2019](https://adventofcode.com/2019), [2018](https://adventofcode.com/2018), [2017](https://adventofcode.com/2017), [2016](https://adventofcode.com/2016), [2015](https://adventofcode.com/2015)), with a [subreddit](https://www.reddit.com/r/adventofcode/) showing solutions in every programming language imagineable.

  

## Success As A Software Engineer

There is always more to learn than you could possibly know. Early stage software engineering professionals especially will have to learn a specific tech stack for each product they develop; they'll have to learn the subtly bespoke ways each team plans and collaborates on coding tasks. You'll rarely join a company and hit the ground running with nothing new to learn. But solid fundamentals in programming problem solving, data structures, and space and time complexity analysis, make you eminently maleable to any software role.
