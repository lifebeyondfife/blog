---
title: "The middle cycle"
date: "2016-01-22"
category: "git"
---

The middle cycle helps reduce the complexity of your final commit. This daily task is to pull the latest changes from the origin repo to your git repo and merge them locally with your work in progress. Therefore, when you're ready to persist your changes to the master branch on the origin repo, many of the potential merge conflicts will likely be resolved for you by git because the task has been broken up into smaller chunks.

 

## The git commands

The developer begins by completing one or more repetitions of the inner most cycle. Once some time has elapsed and there are code changes made locally, you can pull changes from the origin repo and merge them with your own. Begin by checking out the master branch.

 

$ git checkout master

 

Pull the updated code with changes from your fellow coders.

 

$ git pull

 

Revisit the feature branch that you've been working on.

 

$ git checkout MyNewTask

 

Merge in the changes made by others into your own local branch.

 

$ git merge master

 

Depending on the complexity of the code changes, git should correctly perform the merge without requiring any input from you – the successfully completed merge should be observable as the last commit using the git log command.

 

$ git log --oneline -n 3

 

If there were any error messages after executing the above merge, consult the web regarding the git mergetool command and how to complete the merge commit manually.

 

[git\_index\_](http://lifebeyondfife.com/git/) [git\_next\_post\_](http://lifebeyondfife.com/the-inner-cycle/)
