---
title: "The outer cycle"
date: "2016-01-05"
category: "git"
---

The outer most cycle represents a full development task loop beginning with getting the latest code from the origin repo; developing, say, a new product feature or bug fix; and ending with creating a pull request for your changes so that they're available to your development collaborators. Your feature may take only a few hours in which case the cycle completes quickly, however, out of consideration to your colleagues if nothing else, you should break your changes into small, standalone merges that do not take more than a week to develop.

 

## The git commands

First checkout the master branch.

 

$ git checkout master

 

Get the latest changes from the repo server.

 

$ git pull

 

Create a new branch for your development task.

 

$ git branch MyNewTask
$ git checkout MyNewTask

 

The developer will now perform repetitions of the middle cycle. See . Once one or more loops of the middle cycle have completed and the code changes made are ready to be shared with your colleagues, push the branch to your origin repo.

 

$ git push origin MyNewTask

 

All that remains is for the developer to make a request to an admin of the origin repo the MyNewTask branch into the master branch. The process is different depending on how the git repo is hosted. For example, if it's hosted in GitHub, GitLab or BitBucket, the user can raise a request via the web app. For maintainers of a pure git server, an admin user on the git server must complete the merge request manually.

 

[git\_index\_](http://lifebeyondfife.com/git/) [git\_next\_post\_](http://lifebeyondfife.com/the-middle-cycle/)
