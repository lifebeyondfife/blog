---
title: "Fantasy Football Team Selector"
date: "2011-07-27"
category: "follies"
tags: 
  - "code"
  - "constraint-programming"
  - "excel"
  - "fantasy-football"
  - "vba"
legacySlug: "74-fantasy-football-html"
---

The start of the new football season in England is upon us and for some this means careful deliberation over their [Fantasy Football League](http://fantasy.premierleague.com/) team for the opening week. It's a complicated task. There have been big money moves over the summer, recovery from injury for some, other players saw a strong end to the previous season carried into summer friendlies and, as always, there are the new boys up from the Championship. Help is here though with the Fantasy Football Team Selector available from the [download](https://github.com/lifebeyondfife/FantasyFootball) section. Simply open up the Excel spreadsheet, enable macros and click on the Run Solver button. Or if you're a glutton for punishment, read on to learn a little about the science behind it and how to tailor the selector to your own needs.

## "So, robots right?"

Job titles these days are getting more and more complicated. A couple of generations ago most would have had a trade but now we have Regional Facilitation Officers and Customer Liaison Technicians. But even if your job _title_ is straightforward, explaining what you actually do could be just as tough. Leaving academia to become a software developer gave me relief from having to describe exactly what it meant to be a computer science researcher.

As a PhD student and subsequently a researcher into Artificial Intelligence I thought I had a cool job title. This was compensation for a distinctly more down to earth and, quite frankly, not very exciting workload that had nothing to do with robots. My branch of computer science was symbolic artificial intelligence, more specifically, combinatorial search, more specifically, [constraint satisfaction problems](http://en.wikipedia.org/wiki/Constraint_satisfaction_problem) or CSPs. CSPs are representations of complicated problems - ones that even the most expensive supercomputers find hard to solve - where the programmer simply describes the problem and the computer solves it for you. Sounds awesome right? I haven't even begun to scratch the surface of how complicated and specific this is though.

Allow me to simplify things with an example. If you have a problem where a solution depends on many combinations of decisions you could well have a CSP. A combination lock, for example. You have four numbers from 0 to 9 and even if you get one of them right, the lock won't open. All four need to be correct at once. The final dramatic scene of the Matthew Broderick film WarGames has always driven me crazy. The code was broken one character at a time which is completely unrealistic. If there's one thing that will ruin humour and popular culture for you it's science.

![](/images/wargames.jpg)

In essence, a computer solving such a problem tries every combination until a solution is found and you have no idea how close or far away you are from finding one. There are many tricks and valid shortcuts that can be taken along the way, the actual science part, but that's essentially it. How about another example? Picking players for a Fantasy Football League team. This is a problem where you have to choose players which satisfy certain constraints, namely, no more than three from one squad, five defenders etc., total cost of all players to be £100m or less. Of course just picking a valid team is quite simple. What about selecting a _good_ team. One whose players have a track record of scoring a lot of points. Now that's a problem worth solving!

Predicting the future is out and it's open to interpretation how an up-and-coming star like Jordan Henderson moving to Liverpool, or an experienced defender like Wes Brown moving to Sunderland will both do. All we do know is how many points each player scored last season and how much they cost now. So bearing in mind the financial sector's legally required phrase, "Past performance is no guarantee of future results," I constructed an Excel spreadsheet that would try every combination of players and record the one whose total number of points from last season is greater than any other and also forms a valid team under the Premier League's Fantasy Football [rules](http://fantasy.premierleague.com/rules/). Two hundred and forty high scoring players from last season have been transferred to an Excel spreadsheet along with their current cost and points total for the 2010-11 season.

But here is where the science has to come back and reign in expectations. Remember how I said CSPs are problems so complicated that even the most powerful computers in the world can't solve them? Even choosing 15 players, the right 15, is something that is beyond the capabilities of computing.

Before attempting to solve any CSP it's handy to know roughly what size it is. Thankfully there's a simple mathematical formula. For a problem with **n** unknown variables (the 15 positions in our team) with a domain of **d** possible choices (the list of all English Premier League players) we can work out how many possible combinations there are by calculating **d^n** i.e. "d to the power of n". That list of players is a few hundred long so lets simplify it and say we know who we think the best 50 or so are. That leaves 5015, which if for the sake of argument we assume we can consider 1,000 combinations a second, will still take 967 billion years to go through them all.

Using Excel with a simple problem representation means that we'll never be able to try all the combinations. Can we at least find a _good_ team? Thankfully the answer is yes. Even without using the proper constraint programming tools we can do a couple of neat tricks in Excel to get some good mileage.

One thing we can do is prioritise the players so we consider the ones we're most likely to want to pick first e.g. order the players by how many points they got last season, or by what their points per price is. In the artificial intelligence trade this is called using an ordering heuristic. Players who scored the most points are generally the most expensive so solutions found using this heuristic tend to be skewed with big-ticket superstars alongside over-achieving squad players, for example:

```
Nani        Man Utd      198      10       MF
Adam        Liverpool    192      9        MF
Malouda     Chelsea      186      10.5     MF
Tevez       Man City     185      12       FW
Baines      Everton      178      8        DF
Kuyt        Liverpool    177      10       MF
Al-Habsi    Wigan        125      4.5      GK
Alcaraz     Wigan        87       4.5      DF
Mignolet    Sunderland   83       4.5      GK
Foley       Wolves       81       4.5      DF
Salgado     Blackburn    80       4.5      DF
Simpson     Newcastle    70       4        DF
Henry       Wolves       59       4.5      MF
Best        Newcastle    51       5        FW
Ranger      Newcastle    27       4.5      FW
Total:                   1779     100
```

If we use the best value heuristic we're more likely to see teams with less variation in price, only a couple of expensive players and more likely a bigger overall points haul, for example:

```
Al-Habsi    Wigan        125      4.5      GK
Hughes      Fulham       129      5        DF
Robinson    Blackburn    127      5        GK
Bardsley    Sunderland   123      5        DF
Johnson     Wolves       120      5        DF
Hangeland   Fulham       154      6.5      DF
Huth        Stoke        138      6        DF
Odemwingie  West Brom    171      7.5      FW
N'Zogbia    Wigan        167      7.5      MF
Jarvis      Wolves       133      6        MF
Barton      Newcastle    131      6        MF
Adam        Liverpool    192      9        MF
Davies K    Bolton       132      6.5      FW
Nani        Man Utd      198      10       MF
Berbatov    Man Utd      176      9.5      FW
Total:                   2216     99
```

On the Excel spreadsheet you'll find two sheets with the players pre-sorted for the above two heurisitics. Depending on how long you're prepared to wait you can change how many players Excel should consider by changing the number next to the "Size of search" cell. The more you choose, the longer it takes to move through the list and find different teams. But choosing too few players could generate a problem too complicated to ever find even one valid team. Regardless, a bit of experimentation should provide promising results.

Finally to really tailor the selector for your own needs, move the players you're already fairly sure you want to pick to the top of the list and remove those altogether who you definitely don't want to choose (being careful not to leave any gaps in the spreadsheet!). Or if you've got an idea for the 20 or so players you're interested in and want help narrowing it down to the final 15, the spreadsheet should be able to tell you your optimal valid team. Once you've set the problem solving in motion by clicking on the Run Solver button, Excel will continue to search for teams and update the spreadsheet each time it finds one with a bigger total score. Keep on tapping the 'Esc' key to stop it when you've had enough. If you're particularly curious, press Alt+<F11> in the Excel spreadsheet to open the Visual Basic editor and view the artificial intelligence code. As with everything on this site, it's released under the GNU Public Licence. Best of luck for the upcoming season!
