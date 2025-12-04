---
title: "init, clone and origin"
date: "2015-05-28"
category: "git"
---

Hopefully you, and the powers that be at your company, are convinced: git is the future and the way forward. We now begin the journey of understanding the ways in which git is different to server-client VCSs. We assume the user has already installed git and is familiar with navigating directories using the command line.

 

## init

A git server can hold multiple code repositories known as repos. The simplest way to get started with git is to create a new directory with an empty repo.

 

$ git init MyFirstRepo

 

Congratulations. You created a git repo to hold the version changes of a new codebase. This command created a directory named MyFirstRepo that contains a (hidden) folder named .git. This directory is where git stores all necessary data about the repo: the commits and their deltas; the branches; the configuration settings. You never need to look in or modify the contents of this directory, and you should obviously _never_ delete it.

 

In addition, you may wish to create a text file, .gitignore, in the MyFirstRepo directory. This file gives directives to git to ignore certain types of file or even whole subdirectories and exclude them from being shared with collaborators. These are typically build artifacts but they could be anything. Some great defaults for a variety of languages are available from [GitHub](https://github.com/github/gitignore) (remember to rename the saved file to .gitignore).

 

## clone

The most common way of getting started, however, is with an existing git repo to which you wish to collaborate and help extend. The clone command is similar to init except you specify the URL of the origin repo.

 

$ git clone https://github.com/lifebeyondfife/Sierpinski.git

 

This does two things. It clones (copies) the current state of the codebase into the directory Sierpinski and crucially it sets the origin of the git repo server.

 

## origin

[![origin repo](/images/origin-repo.png)](/images/originals/origin-repo.png)For any repo that isn't a dedicated source repo (the traditional server role in a VCS system) there needs to be a link to what's known as the origin repo. By creating a git repo on your local system using clone, the origin variable is set implicitly. This link is crucial as it allows programmers to collaborate by agreeing on a common origin repo between all of them.

 

The origin repo is one of many git configuration variables and can be altered or set at any time. Your development environment will have any number of repos, and each of which will have their own origin repo.

 

[git\_index\_](http://lifebeyondfife.com/git/)

[git\_next\_post\_](http://lifebeyondfife.com/push-and-pull/)
