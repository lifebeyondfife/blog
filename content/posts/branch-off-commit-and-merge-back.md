---
title: "branch off, commit, and merge back"
date: "2015-10-29"
category: "git"
---

Once your changes have been carefully reviewed and staged, they're ready to be committed to the active branch. Include a brief sentence detailing what the change is.

 

$ git commit -m "Revolutionise e-commerce by making the book button slightly bluer."

 

## Going back to your roots

Your branch is ready to share with colleagues and collaborators by pushing it back to the origin repo (see Part 14 - Setup: the origin repo). But with all this branching off everywhere, how on earth are we all going to work on one consistent codebase? Simple, we merge the changes of the branch back to the main development branch, known as the master branch. Changes can be merged from one branch to another locally on your git server.

 

$ git merge NewFeature NeedThatNewFeature

 

But merges to master usually take place on git origin repos using a web frontend with some additional security and interactive review features. On GitHub for instance you'll hear this being referred to as a “pull request”. This is because you have changes in a branch you want the origin repo to pull. GitHub will assist and abstract the merge of your branch to the master branch.

 

## Start all over again

The development never stops. Once the branch changes are in master, everyone working on the codebase pulls it to their local repo.

 

$ git checkout master
$ git pull

 

Then, all are free to start a new feature branch and continue the cycle again.

 

$ git branch NewFeatureToBuildOnTheLast

 

[git\_index\_](http://lifebeyondfife.com/git/) [git\_next\_post\_](http://lifebeyondfife.com/never-ever-push-to-master/)
