---
title: "End to Big Bang commits"
date: "2015-05-26"
category: "git"
---

No matter how agile we get, or small and isolated we try to make our changes, collaborative development will always leave us stepping on each other's toes. When there are big changes to the codebase to be made by multiple developers the key to victory is to selfishly make sure to get yours committed first, otherwise be left open to a three-way merge from hell.

 

Git allows programmers to break-up the merge process into smaller manageable chunks. Having the power of the server on your client means that you don't have to wait until your commit is ready before merging in the commits of other programmers. Whenever a new commit is sent to the origin repo, you have the power to merge those changes into your work in progress.

 

This rewards you in two ways. Firstly, you won't have to re-develop, say, five days worth of changes made as a result of the codebase changing beneath you. And secondly by frequently merging in changes as they occur, you're unlikely to have a lengthy, complex merge when you come to commit your completed work because it has been spread out across the lifespan of the change.

 

Git again helps by encouraging positive collaboration rather than a race to commit, and reduces the complexity of merging multiple developers' changes.
