---
title: "Environmentalism and Amdahl's Law for the Masses"
date: "2011-10-12"
category: "essays"
tags: 
  - "amdahls-law"
  - "environment"
legacySlug: "78-amdahls-law-html"
---

Though Life Beyond Fife is primarily a technology blog this article is for everyone. Absolutely all. I want every single person in the world who is the least bit concerned with environmental matters to know about and understand a concept from the world of computer science known as Amdahl's Law. With this one bit of knowledge it will make you much more effective at looking after the planet for tomorrow's new generation.

Right you're still reading, excellent. I can now confess to you that I don't care about the environment myself. That's not to say I doubt how drastically the delicate eco-balance has been affected by the carbon burning industrial age created by my country, nor that I don't want to live in a future where weather is so unpredictable and extreme from one day to the next and resources are so scarce that society itself hangs in the balance. My thought process is more along the lines of, "We're almost certainly screwed, there isn't enough collective will in the world to change it, and I don't particularly care about the legacy of mankind."

So why bother trying to educate the wider populace about how they can lessen their environmental impact on planet Earth seeing as I'm clearly indifferent to its outcome? My interest comes from wishing to educate and more specifically recalibrate people's misdirected green enthusiasm so that I am less likely to meet it face to face.

## Do One Thing

Before explaining Amdahl's Law I need to take the story back a little further to what initially riled me enough to write this: the blatant lies that large companies tell and the facade they present both to the outside world and their own employees. I usually write about software development practices in large companies which is where almost all of my development experiences have occurred. Thankfully the accompanying large company experience was isolated from the true Dilbertian horror it should have been by being positioned in small out-of-city offices. But there were still some things that made it through. The mandatory, unintentionally funny Big Brother Is Watching You-style corporate posters was one but the last thing that sticks fresh in the memory was the Do One Thing campaign.

Do One Thing was a kind of environmental plea. A mission to aid sustainability in the world, and wellness for us personally. Help us save the planet by doing one thing to reduce your carbon footprint and/or make yourself healthier. But this being in the land of the large corporation there's more: upload a short video about you doing your one thing; spread the word on Facebook and Twitter and the company's social media network; have a competition within your office to see who does the most. C'mon guys, we can do it. We can show the world how it's done!

The reasoning behind this kind of selfless passion is always along the lines of "giving something back" or "corporate responsibility" but from speaking to people one-to-one within organisations such as these, the bottom line is always... the bottom line. Any project setup by a company to do something altruistic will be balanced by some perks that ultimately help make the company more profitable. The most likely two suggestions are that such campaigns can be used as advertising material to paint the company in a good light to win more business, or an increased warm, fuzzy feeling can be created internally that helps staff retention. The wellness aspect of it will be simply to reduce medical insurance bills. That's how capitalism works though and I'm not saying there's anything wrong with that, I'd just prefer to be told the truth openly and honestly.

Cynicism is the natural state of a person living in the world who has managed to be aware of their surroundings and the behaviour of others. As such I find large companies staggeringly patronising. They talk the talk about wanting the best, most brilliant people - real sharp switched on individuals. But once you're inside, the talk from senior management and the messages coming down from above speak as though you're the most gullible fool ever.

What annoys me as a cynic then is that a project spanning a global organisation has taken place to attempt to disseminate tips and tricks on how ordinary people can be kinder to the environment. If the aim was truly just to lower carbon emissions, Amdahl's Law should have been used.

 

## Amdahl's Law

_"The performance improvement to be gained from using some faster mode of execution is limited by the fraction of the time the faster mode can be used."_

I must confess, [Gene Amdahl](http://en.wikipedia.org/wiki/Gene_Amdahl) is a computer scientist and was talking about a specific problem regarding the parallelisation of computation. An example relating to helping out the environment would be much better. Look at this block of carbon, A, that you, the average person, is responsible for over the course of a year owing just to unused electronic devices kept on standby.

![Electronics on standby producing 50Kg of Carbon per annum.](/images/A_50.png)

A television kept on standby for a year will rack-up in excess of 10Kg of CO2 per year (Source: [Carbon Footprint](http://www.carbonfootprint.com/energyconsumption.html)) and when you add in Digital TV receivers and other home entertainment devices it's easy to see how that can add up to 50Kg.

In a fit of altruism you decide that that's it, from now on, no devices in your house will be plugged in at the wall if not being used. No TVs, satellite boxes, games consoles, HiFi systems, printers, microwaves, radios, PC monitors will waste standby electricity in your house. All will be plugged in before use and unplugged when finished. Let's say that you manage to stick to this task for an entire year and you manage to drastically reduce the carbon footprint of standby electricity in your home by 90%.

![Electronics on standby producing only 5Kg of Carbon per annum.](/images/A_5.png)

That is commendable work. Every single day, sitting down to watch TV or play a DVD, picking up the remote control and pushing an unresponsive button, sighing deeply, standing up and walking over to the power socket, plugging all the devices in and waiting for them to warm up. And at night the routine of sweeping all rooms to make sure everything's unplugged again. Take a well deserved sip of locally sourced real ale, you've earned it. Now let me show you Amdahl's Law in action.

This is B, a return trip in an aeroplane to somewhere roughly 1,000 miles away e.g. New York to Tampa, Florida or London to Naples, Italy, after the high altitude "climatic forcing" effect is taken into account (Source: [Environmental Impact of Aviation](http://en.wikipedia.org/wiki/Environmental_impact_of_aviation))[.](http://en.wikipedia.org/wiki/Environmental_impact_of_aviation.)

![Return flight of 1,000 miles producing 800Kg of Carbon per annum.](/images/B_800.png)

This distance is significant and clearly easier to make using air travel, however, with some extra effort in planning, time and probably expense, it is a distance that you could make by train. Even allowing for a longer than direct route it's possible to reduce this carbon cost by 80%, a similar though slightly smaller amount to the example with the electronics not left on standby (Source: [Carbon Neutral Calculator](http://www.carbonneutralcalculator.com/commutecalculator.aspx)).

![Return train journey of 1,000 miles producing 150Kg of Carbon per annum.](/images/B_150.png)

Assume that the train journey, though a genuine sacrifice over the convenience and value for money of flying, is a viable alternative. A sacrifice that only needs to be done once per year, no matter how often such a journey is made, rather than an everyday task like the electronics on standby. Let's now compare these environmentally beneficial endeavours as choices by creating two people with differing attitudes. One conscientiously works everyday over the little things to be more environmentally friendly. The other prefers the convenience of having things available at the push of a button but is prepared to make a big one-off effort for the environment. The first unplugs electronics all year, the second goes by train rather than plane just once.

![Optimising standby electronic usage: 805Kg carbon waste. Optimising journey method: 200Kg carbon waste.](/images/AB.png)

The first person has taken the total carbon footprint from 850Kg down to 805Kg. The 90% improvement of standby power has resulted in an overall saving of a little over 5%. However, the second person's 80% saving from avoiding flying has produced a total of only 200Kg of carbon - a system wide saving of 76%.

Compare those combined carbon footprint savings: 5% and 76%. Five per cent and seventy-six per cent! If you take anything away from this article please let it be this: Amdahl's Law is all about concentrating on how big each part _within_ a system is rather than concentrating on how much waste there is in _each and every_ part of a system. Software developers improve the speed of the programs we write by using this technique with profiling tools and it works for a whole bunch of similar problems too. Think about reducing your monthly outgoings: don't try to save a few pence on everything but instead try to reduce your spending on the one or two things that cost the most. By doing so we're much more likely to make the biggest overall saving for the least effort.

 

## Every Little Helps

Some may now be thinking, "OK, I now understand Amdahl's Law and I take your point that keeping on top of the little things like wasted running water and making sure the doors in my house are closed won't make much difference compared to plane and car journeys. But every little helps, yeah?"

Yes, it does but your aim should be to reduce your carbon usage by as much as you can. Every time you expend your time, effort or money on reducing your carbon emissions you are wearing yourself out. The more worn out you are, the more likely you are to say, "I do my bit for the environment, why this month I've already done x, y, z..." and then think you've earned the right either to do something harmful or not bother with doing something beneficial. We only have a finite amount of energy and resources ourselves as humans so stop wasting your time unplugging electrical devices. Stop obsessing over lowering the thermostat to uncomfortable levels. Stop cutting up refuse to get every last bit of recyclable material available. Stop doing all that and look seriously at where most of your carbon footprint is coming from.

General Electric has a slick [Carbon Cost Visualisation](http://visualization.geblogs.com/visualization/co2/) flash application that sorts common items and activities by order of magnitude to help you see where most of your waste is coming from. Take that list and work to reduce your carbon footprint by being _smarter_. There is a fantastic [Amdahl's Law Calculator](http://www.julianbrowne.com/article/viewer/amdahls-law) that you can use to help you once you have a list of areas to improve upon and how much you feel you can reduce them by.

 

## Back to Business

As much as I dislike being pressured into doing things for the environment I don't actually mind it coming from middle-aged, Guardian reading, "I remember when Glastonbury wasn't so commercial" types - their concern is genuinely about the environment. They can be misguided but really do care. What annoys me are business leaders and politicians paying lip service to helping the environment. [David Cameron cycling to work](http://news.bbc.co.uk/1/hi/uk_politics/4953922.stm) and having his briefcase chauffeur driven behind him is a classic example.

To highlight what I mean, here is what a member of senior management pledged for the Do One Thing sustainability and wellness campaign.

_"Continue to exercise regularly, eat less junk food, reduce paper and power usage and play a game by candlelight to celebrate Earth Hour."_

My cynicism about [Earth Hour $$PDF$$](http://rossmckitrick.weebly.com/uploads/4/8/0/8/4808045/earthhour.pdf) notwithstanding and ignoring the fact that this is actually four things, the carbon reducing part of this pledge is to use less paper and make sure the lights are turned off etc. A return transatlantic flight from New York to London creates 1,220Kg of carbon per passenger (Source: [Carbon Cost Visualisation](http://visualization.geblogs.com/visualization/co2/#/flights_NY_London)) whereas one newspaper creates just 1.8Kg. I have seen firsthand up and down the corporate hierarchy that flying across the world happens all the time and is often unnecessary. Just a little forward planning or reworking that stops even one person taking a flight will more than make up for a ludicrous amount of wasted paper in the office.

 

## Do you seriously want to help the environment?

By writing this article I hope to have something to which I can point pushy eco-warriors - though that should still probably be the more authoritative _[Without Hot Air](http://www.withouthotair.com/), especially Chapter 19: "Every BIG Helps". But if you seriously want to protect the eco-system of this planet then do the one thing that makes more difference than any other: don't have children. If you don't, you will have saved yourself a whole other persons lifetime of carbon emissions._
