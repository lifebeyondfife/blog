---
title: "Sabbatical II"
date: "2026-06-16"
category: "follies"
featuredImage: "/images/the-good-place.jpg"
---

Sabbaticals are about transition, and preparing to make the stage beyond the transition successful. They're also about taking a step back, and seeing if what you're doing makes sense. They give opportunities to recover, to learn, to try new things and think deeply about where next. So what have I been working on?


## Blog

I rebuilt my WordPress blog from the ground-up, to a Jamstack site; one that you're reading right now! Low cost, low maintenance, low latency, easy to ship. Extremely happy with the results, and it got me thinking about the [future of software](https://lifebeyondfife.com/dystopia-or-hegemony/).

## Keynote Talk for Acast

Be open to saying yes to things that scare you. A friend and former Skyscanner colleague, Mark Fuller, asked me if I had anything to talk about on AI, data-driven development, CI/CD, or something else current. [CTO Craft Con](https://conference.ctocraft.com/london/)'s loss was [Acast](https://acast.com/)'s gain, as I had rough notes for a talk about how mature CI/CD supercharges engineering culture, called *Deploying at 5pm on a Friday*. You can watch that keynote [here](https://youtu.be/81qOOg3G7aM).


## Speedrun a failed startup

I rebuilt a superior implementation of my first webapp in 2 weeks — a real 25x improvement over the previous year-long endeavour. The idea was to make it easy to buy new releases from your favourite musical artists. This is a genuine problem I have that I hoped could become a passive income stream, and I targeted it specifically as an experiment to invalidate. Happy with [the outcome](https://lifebeyondfife.com/follies/speedrunning-a-failed-business/) even if that was, "No, you shouldn't pursue this any further."


## Adventures in open source

I made my C# constraint solver open source when I saw it could be used to [tame an NP-complete problem](https://lifebeyondfife.com/helping) in my day job working at Moody's Analytics. Dating back 13 years to [June 20213](https://github.com/lifebeyondfife/Decider/commit/8f1c1eac8b53396a86ec0cd83affa170907b5bb9), and with 160 stars to date, this is the most popular repo of all my GitHub projects. After using AI agents in my previous projects, I wondered how they would fair on more complex features in a combinatorial search backtracking domain.

I made some great strides with upgraded GitHub Action pipelines, adding a benchmark suite, improving the global AllDifferent constraint, including a search traversal progress bar, and a time-tabling constraint. I had to pause properly implementing learned clauses and a SAT solver as I descended into madness trying to compete with Google's decade-long unbeaten [OR Tools](https://github.com/google/or-tools/). I discovered I was repeating most of the lessons shared by David Low's post [Learning to flow](https://www.linkedin.com/pulse/nuggets-33-learning-flow-david-low-dikae/).

In the end I realised I was stuck in a battle of answering, "How long is a piece of string?" There was no exit condition for me working on Decider. I learned a lot about agents, and have some excellent [GitHub Issues](https://github.com/lifebeyondfife/Decider/issues) to return to if I ever feel like it again one day. Time to call it a day.


## Fantasy Football Premier League Optimiser

Up to now most projects had a degree of seriousness; time to do something frivalous and fun. I rebuilt my [Fantasy Football Premier League optimiser](https://lifebeyondfife.com/fantasy-football-2011-12/) which was originally Visual Basic in the back of an Excel spreadsheet. The new version is a Google Sheet and some ActionScript. The season is over, but you can try this out yourself: [https://docs.google.com/spreadsheets/d/10-6NisjrvBDfrRzNjx5wmD4EG7pzZ7t0oVCNJh6ATgo](https://docs.google.com/spreadsheets/d/10-6NisjrvBDfrRzNjx5wmD4EG7pzZ7t0oVCNJh6ATgo)

This has seen reasonable usage for posting once in two subreddits. The fact it's increased beyond the end of the premier league makes me think maybe there's a world cup game going on? 🤷

![Instructions shown in the spreadsheet](/images/fantasypl-setup.png)

![Spreadsheet with the optimise panel](/images/fantasypl-sidebar.png)

![Usage data](/images/fantasypl-usage.png)


## Vibe coding in Godot

Up to now, I'd been using AI to build things in platforms and languages in which I was competent-to-comfortable. As much as I love video games, I know literally nothing about making them, so I fired up Godot and 100% vibe coded something. Full-on Ralph loop stuff.

Knowing nothing about GDScript, the Godot game engine, or how to structure a game, made it easy to switch off from decisions I'd usually be so opinionated regarding. Instead I concentrated on requesting precisely the results I wanted to see. And what did I make? A 15 year old idea about making a [video game based on real life](https://lifebeyondfife.com/real-games/). One of the more interesting things about having such a long-running blog is that I can keep some track of whimsical ideas from a lifetime ago.

Having driven my cuboid car around Princes Street, up Arthur's Seat, and then out toward Fife via Barnton Junction, I concluded time was up. I was getting better at spotting time-sinks.

![Barnton Junction](/images/godot.png)


## Gaming and football management

Combining games and football management, I was interested in how AI coped with complex upgrades. Alongside Decider, this was the second time I increased my spending from Pro to Max, to kick the tyres on what could truly be achieved. [Cm93](https://github.com/lifebeyondfife/Cm93/), based loosely on Championship Manager '93, was a C# .Net 4.5 WPF project, untouched in over a decade. I remember working on this for years before admitting that I would never have the time to complete it to the standard I would consider acceptable. This was a landmark project that taught me to make future projects more tightly scoped so that I could complete them.

I don't always get this spot on, but I finish things a lot more often than not these days. This is something that translates to how I approach work, and I credit lessons learned from mistakes in Cm93 with a lot of past successes getting things over the line. In reflecting on all these weird and different projects from this year, I see that I'm recalibrating the idea about what is possible under the new ways of working.

Within a week, I had the codebase working again with the basic Scottish Premier League data from the mid-2010s — a real heyday of St Johnstone. Could I nurse this back into into life as a cross-platform app? Absolutely. AI is a great development partner and fleshing out what remained to make a playable game showed it was just too much. Fun little trip down memory lane, but another project that could devour all time, if left unchecked. Time to move on.

![Cm93 running on the latest version of .Net on MacOS](/images/cm93-reprise.png)


## The simple app in a single HTML page

The biggest productivity tool benefit is how easily AI will create a single HTML page without you barely asking for one. I now have several local HTML files bookmarked and backed up to the cloud that do all manner of things. Animate scrolling code snippets and other video effects, create favicon.ico files for websites, make playing card templates.

I got back into playing hardware assembler coding game [Shenzhen I/O](https://store.steampowered.com/app/504210/SHENZHEN_IO/). Great fun but such a busman's holiday. Playing the bonus game [Shenzhen Solitaire](https://store.steampowered.com/app/570490/SHENZHEN_SOLITAIRE/) got me thinking about how I'd love to play the game with a physical deck of cards. But the cards are a unique amalgam of standard playing cards and mahjong. Enter an AI project to create SVG images which can be rendered to precise PNGs and be custom made.

This only took a day or so, but was such a great use of time. I love the mindfulness of shuffling the cards and spending a few minutes trying to beat the randomness.

![The AI generated HTML tool](/images/shenzhen-html.png)

![The physical cards playing Shenzhen Solitaire](/images/shenzhen-solitaire.png)


## Boring vibe coding

This was the project that brought my sabbatical to a close.

A friend recently described his view of why companies are no longer hiring entry level engineers. It's a bet that by the time the current generation of experienced software engineers have retired, the tools will have improved to such a degree that the role will no longer be needed.

Regardless of whether this is a safe bet or not, it's a galling prospect for the recent computer science graduate who was justifiably thinking they were likely to be employed. They now need to show not just that they have great potential, but rather that they're already the complete package. What might be referred to as a Senior Engineer.

I've been thinking for many years about what that looks like. This led to me publishing a model about how to think about the progression of a software engineer. Not just what great looks like, but how to work out where to focus next efforts, and consider failure modes. The Three Layers of Software Engineering is shared at [https://layers.lifebeyondfife.com/](https://layers.lifebeyondfife.com/).

This thinking inspired a project which I've parked for now but poured a month of hard work into: Boring Vibe Coding. A channel of working through one-a-day programming problems in different languages, and different difficulties. Not because I'm the greatest programmer in the world... in fact, it was eye-opening seeing how many mistakes I made from jumping to the wrong conclusion too quickly, over-complicating the solution, and trying to shoehorn a declarative approach in where something stateful was the better solution. I took on this challenge because I'm an experienced programmer who can write code without AI tools, and use judgement about what, if anything, should be delegated.

Building up a resource of repetition through entertainment. A first step to [helping bootcamp graduates](https://lifebeyondfife.com/hiring-advice-for-bootcamp-graduates/) before moving on to the higher layers in the pyramid.

I know the way to publish a perfect episode 100, is just to ship a crappy episode 1. But the value here is making a commitment to the viewer: if you join me on day 1, I'll be here everyday for another few weeks. After recording 25 days of raw footage, I was left with the editing and intro and outro shots. This was too much, and I could tell the sabbatical was over.

The project is paused for now, while I work towards finding another day job. From Simon Sinek's [The Infinite Game](https://simonsinek.com/books/the-infinite-game), this is my [Just Cause](https://coachingforleaders.com/podcast/just-cause-simon-sinek/). For now at least, enjoy the intro.

<div class="flex justify-center my-8">
  <video width="480px" controls>
    <source src="/videos/bvc-ident.mp4" type="video/mp4">
    Boring Vibe Coding ident
  </video>
</div>


## Time is all we have

My postie is a friendly man called Jimmy, who often stops to chat about how things are going. I walk around the neighbourhood and several streets away I'll see Jimmy on his route talking to other people on their doorstep. He must know hundreds around here. It likely won't be too many more years until he retires, and I think about how, overnight, his daily routine will be so different.

Retirement is still a long time away for me, but taking a break is an interesting preview of how your routine changes, and what life might be like. For me, I don't fear having nothing to do — I am constantly making work for myself, and breaks only show how there is far too much to do, more than I could ever properly finish.

The conclusion of the sitcom The Good Place (watch it if you haven't already, and trust me, avoid all Season 1 spoilers) is that all we have is time. Work is complex and challenges us to do more with limited budget, people, and time. Even if we have unlimited time, our eyes are bigger than our bellies and there's always too much to do.

So don't stress. This is a game that no one can complete. Just keep working on what inspires, and don't be afraid to ship it.

![Time with loved ones, that's the dream](/images/the-good-place.jpg)

