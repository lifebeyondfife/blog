---
title: "Backup as often as you like"
date: "2015-05-24"
category: "git"
---

Have you ever experimented with a few different approaches to solving a tricky problem only later to try to salvage an earlier working state with a mixture of <Ctrl>+Z bashing and consulting the last known state in the VCS server? Or do you get round that by making occasional copies of files or subdirectories, possibly with "\_v1" suffixes? Well with git, there's a better way.

 

You wouldn't commit code to the origin repo that was broken, incomplete or didn't pass all unit, integration and acceptance tests. And the same applies to the origin repo with DVCS as well. However, remember that your development environment is its own source control server. You can commit broken and incomplete work as frequently as you like. Think of it like leaving a trail of breadcrumbs through a maze. It's perfectly easy to get back to a previous, working state because there's no penalty for making commits and you can undo coding cul-de-sac experiments by simply popping them off the stack.

 

In producing production worthy code that you can share with your colleagues, the route taken doesn't matter. Git allows you to get there with extra security knowing your changes and experiments are backed up every step of the way without hindering the collaborative development process.

 

[git\_index\_](http://lifebeyondfife.com/git/)

[git\_next\_post\_](http://lifebeyondfife.com/end-to-big-bang-commits/)
