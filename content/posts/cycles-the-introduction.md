---
title: "Cycles: the introduction"
date: "2015-12-02"
category: "git"
---

There are three development activities that cycle repeatedly within each other. They can be done as often as you like but we introduce a best practice upper bound of one hour, one day, and one week for each. These durations are of course advisory and can be ignored, but discipline in this regard will reward you with increased productivity and more streamlined cooperation. Alongside each cycle there are associated git commands that allow you to complete the required steps.

 

## The Three Cycles

The outer most cycle represents a full development task loop beginning with getting the latest code from the origin repo; creating, say, a new product feature or bug fix; and ending with creating a pull request for your changes so that they're available to your development collaborators. The middle cycle pulls the latest changes from the origin repo to be merged locally with your work in progress thus making the merge conflicts less extreme. The inner most cycle sees you constantly committing code to your local git repo to ensure a stable code state is always available to revert to.

 

Those cycles in full, from inner most to outer most:

- Once an hour - commit to your local branch
- Once a day - merge changes from master into your local branch
- Once a week - push your local branch to the origin repo and merge your changes into master

 

Remember, these are _upper bounds_, you can do them as frequently as you like but you shouldn't wait longer.

 

## The cycle is complete

Following these three, simple cycles gives the novice git user a template not only for which git commands to follow next, but also to allow them a plan to work against to join in collaborating with git veterans. The following entries will provide specific technical instruction in which git commands are required for each cycle, and the setup to get started with a new repo.

 

[git\_index\_](http://lifebeyondfife.com/git/) [git\_next\_post\_](http://lifebeyondfife.com/setup-the-origin-repo/)
