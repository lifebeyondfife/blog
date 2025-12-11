---
title: "review with status, diff and log"
date: "2015-10-12"
category: "git"
---

Once you have staged all the changes you want to make (see [add, remove and reset](http://lifebeyondfife.com/add-and-remove-checkout-and-reset/)), you're ready to commit those changes to the active branch. This is how you collect all your development activity into a single atomic unit that delivers one feature, or fixes one bug etc. and passes all unit and integration tests, naturally.

 

But before rushing in, review the changes you want to make using the helpful git commands log, status and diff.

 

## Right branch

The log command gives a history of the branch you're working on an shows the previous commits that have been made leading up to your new epic one.

 
```
$ git log --oneline -n 5
```
 

## Right files

The status command gives an overview of the files you've added, changed and removed. It also shows the changes you've made but haven't staged.

 
```
$ git status
```
 

## Right changes

The diff command give a clear indication of the line-by-line additions and removals you've made to each changed file.

 
```
$ git diff
```