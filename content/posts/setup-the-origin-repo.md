---
title: "Setup: the origin repo"
date: "2015-12-19"
category: "git"
---

When beginning to collaborate on a coding project using git, there are a couple of steps to create a local copy of the repo. Assuming you're joining a project that's already underway, use the git clone command to create your own local copy. In the same way that **master** is the default name for the main development branch, **origin** is the default name for your shared repo server.

 

$ git clone https://your-repo-hosting.com/repo-name.git

 

You now have the master branch on your local machine, with a link to http://your-repo-hosting.com/repo-name.git as your origin repo. To verify the origin repo is what you expect, use the git config command.

 

$ git config --get remote.origin.url
