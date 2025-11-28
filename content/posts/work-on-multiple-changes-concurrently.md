---
title: "Work on multiple changes concurrently"
date: "2015-05-23"
category: "git"
---

Some server-client Version Control Systems (VCSs), for instance Perforce, have concepts like shelving where you can isolate changes you make for a bug fix from concurrent changes for a new product feature. In a perfect world we'd only ever work on one task at a time but we know how unrealistic an expectation that is from life. Context switching when programming is a huge productivity killer and any extra tasks that takes up time when moving from one thing to another e.g. juggling changes for different features in one file into separate commits, should be avoided.

 

For users of server-client VCSs, the idea of creating a new branch everytime you work on a code change isn't sustainable because everyone shares the same repo server. When using a DVCS like git, branching becomes free. You literally can, and indeed should, create a brand new branch for every isolated change you make. Working on a bug fix, a refactor of some legacy code, a personal side project, and a new product feature can all be done concurrently, each in their own branch. One simple command switches instantly from one branch to the next - context switching becomes a breeze and productivity soars.

 

[git\_index\_](http://lifebeyondfife.com/git/)

[git\_next\_post\_](http://lifebeyondfife.com/backup-as-often-as-you-like/)
