---
title: "Never, EVER, push to master"
date: "2015-11-15"
category: "git"
---

Every repo, after an initial commit, starts by default with one branch and that is named _master_. It's the branch that everyones' branches get merged into and is largely the one from which developers pull changes. This makes it the most important – it's the one that contains the latest changes, it's the one that's used by the build servers to power continuous integration. Therefore it needs special protection to ensure [nothing bad happens to it](https://groups.google.com/forum/#!searchin/jenkinsci-dev/force$20push/jenkinsci-dev/-myjRIPcVwU/mrwn8VkyXagJ).

 

## Tools and process

Firstly, there should be safety measures in whatever git server hosting you use (GitHub, GitLab, BitBucket) to protect a master branch from being overwritten by a stray push command. But more importantly there should be a set process that every developer follows. One that doesn't get in the way of productivity but rather helps collaborative development thrive. These template workflow entries give you a blueprint to get started. And look, already you know never to push to master.

 

[git\_index\_](http://lifebeyondfife.com/git/) [git\_next\_post\_](http://lifebeyondfife.com/cycles-the-introduction/)
