---
title: "Insurance against LeftPad level events"
date: "2016-06-03"
category: "coding"
---

When it comes to dependencies, there are two extremes in software development. Complete ownership of everything right down to the abstract data types e.g. "Yes I write my own open addressing hash table and hash map"; or on the other hand grabbing strangers' code left, right and centre e.g. "I'd rather have a dependency on some random, 12 line implementation of LeftPad because that's one less thing to bugfix, debug and maintain". As with all computer science trade offs, the majority feel comfortable somewhere in the middle. Done properly, I see the elegance of relying on [small, composable dependencies](https://github.com/sindresorhus/ama/issues/10#issuecomment-117766328) but perhaps I'm overcompensating for my years of suffering in enterprise corporations, filling out forms to use an open source library. (No really, apply [here](https://www.moodys.jobs/).)

There is no getting away from the chequered history of JavaScript but one weak spot has always been modularity. It's such a fundamental aspect of successful modern languages and platforms: having a mechanism to easily publish and consume componentised units of code. The popularity of nodejs comes from both the performance of the V8 engine, but also the convenience of npm. Given how easy it is to use, it's no surprise that 12 line functions are packaged and published as modules, free to be used by all.

The possibility that these packages our nodejs projects rely upon could be taken away at a moment's notice highlights the fragility of npm in general. It's a situation that cannot last. In the meantime, however, what is a concerned JavaScript programmer to do? They could remove the node_modules folder from their .gitignore, but that is not without its problems. Build artifacts are not intended to be committed alongside sourcecode for good reason.

One alternative is to keep regular backups elsewhere. An unpleasant task, but one I have made easier with, surprise surprise, an npm package, [npm-rescue](https://github.com/lifebeyondfife/npm-rescue).

[https://github.com/lifebeyondfife/npm-rescue](https://github.com/lifebeyondfife/npm-rescue)

[https://www.npmjs.com/package/npm-rescue](https://www.npmjs.com/package/npm-rescue)

This handy tool creates a backup of every node_modules directory it finds into a single git repository. Each npm project is persisted to its own branch. Backup as often as you like and git will manage the changes efficiently. If ever a dependency disappears by LeftPad style "liberation", you can find the necessary files in your backup git repository.

It's my hope, you'll never need to.
