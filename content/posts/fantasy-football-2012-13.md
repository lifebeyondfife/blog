---
title: "Fantasy Football League Team Selector 2012-13"
date: "2012-08-07"
category: "coding"
tags: 
  - "constraint-programming"
  - "excel"
  - "fantasy-football"
legacySlug: "95-fantasy2-html"
---

UPDATED VERSION: [Fantasy Football Team Selector 2013-14](http://lifebeyondfife.com/fantasy-football/)

It's that exciting time of year again. I know, I know, London 2012 and all that but who really wants to watch amateur archers and beginner judo students when the English Premier League is about to restart?

For those who weren't here last year, I announced in an overly technical way an area of artificial intelligence called [constraint programming](http://en.wikipedia.org/wiki/Constraint_programming). Never mind all that though: [here is an Excel spreadsheet](https://github.com/lifebeyondfife/FantasyFootball) that will help you improve your Fantasy Football League team for the Official Premier League version.

EDIT: I've also added a Yahoo! version but beware, that problem has greatly skewed player prices - a bit of manual culling is needed to the high-priced players to get it to find a solution this century. The best value technique still finds solutions quickly but some formations work better than others.

## Best Performers, Best Value or Follow the Crowd

![](/images/FantasyFootball2012-13.png)

This year I'm not going to go into _too_ much detail over how the spreadsheet works. Put simply I've taken the list of premiership players available from the official Premier League website, their team and position and also how much they cost for the Fantasy Football game. Add to that some statistics about how they performed last season and how many people have already chosen them to be in their team. Those are all rolled up into an artificial intelligence constraint solver in the back of an Excel spreadsheet and it produces valid team selections for you to ponder.

There are three different worksheets in the spreadsheet that tailor the type of team it produces. First up, the players are ordered by how many points they got in total last season. This will mean the team is front loaded with the big ticket star players. You'll probably only get a few, however, before the rest of your team is taken up with cheap over-achieving super-subs and journeymen.

Second up is the value alternative. This puts together a list of solid, mainly mid-price players who always deliver a dependable display on Saturday afternoon. Not quite as exciting a tactic as the previous one perhaps, but the points totals don't lie - this generally provides a superior selection.

Finally for those a little uncertain about where to turn and want to be a bit of a sheep, we have the "follow the crowd" worksheet. Players are ranked by popularity i.e. what percentage of Fantasy Football league players have already chosen them. The first two techniques are a bit backwards looking and assume that the players who had a great 2011-12 season will do it all over again. Following the crowd assimilates a bit of the speculation about the players who will likely have a good 2012-13. Of course, remember, [crowds and popular opinion](http://blog.icepredict.com/2010/06/when-are-crowds-unwise/) isn't always particularly wise.

## Experimentation and Patience

Without going into all the science of it, exploring all the combinations of players is an impossibly hard problem so in order to get any kind of solution we cut some big corners. You can experiment with the spreadsheet by removing players you know you don't want to include e.g. if you're an Arsenal fan you could remove Gareth Bale from the list of players to consider - just make sure you don't leave any gaps in the spreadsheet. If there's someone you definitely want in your team in spite of how they stack up in the ranking (perhaps you think this is finally the year Koscielny isn't going to pass it into his own net) then move them higher up the list.

The problem solver is an optimiser, everytime it finds a better solution it replaces the previously found one. But you could be waiting for several days without any further movement in the spreadsheet - this is known as the [curse of dimensionality](http://en.wikipedia.org/wiki/Curse_of_dimensionality). Remember two things to help keep your sanity (1) double-tap the 'Esc' key to stop the solver in its tracks and regain control of Excel and (2) alter the maximum number of players to consider - there's an editable field on each worksheet for this. Smaller numbers make the problem harder to solve, larger numbers make the problem easier to solve but will take longer to go through all the possible combinations and find a possibly great solution.

If you're interested in finding out more I recommend reading the [article from last year](http://lifebeyondfife.com/74-fantasy-football.html) on this subject and maybe even having a look at the solver code itself. Press <Alt>+F11 in any Excel spreadsheet to open up the Visual Basic editor and look at any code macros that are hidden behind the cell grids.

Best of luck for the upcoming season.
