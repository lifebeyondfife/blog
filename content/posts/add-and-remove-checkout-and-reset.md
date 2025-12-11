---
title: "add and remove (rm), checkout and reset"
date: "2015-07-07"
category: "git"
---

Git is a stickler for detail, but helpfully so. It tries not to do things unless you specifically tell it to. So if you make changes to the codebase, git won't include your changes unless you explicitly tell git that it's intended. For example, say you add a new file called myProg.c to your codebase, or edit an existing file called myProg.c, the intended change must be signalled to git using the add command.

 
```
$ git add myProg.c
```
 

Thankfully, git lets you add whole subdirectories easily enough with the add command so you can do multiple files in a one liner. Similarly, removing files has to be ok-ed in advance as well. To be clear, even if you've deleted the file from your harddrive, git must still be informed that this was an intentional action.

 
```
$ git rm obsolete.cpp
```
 

These explicit steps are called staging. Before you commit your changes to a branch, your changes must be staged. If you accidentally staged files you didn't mean to add, you can undo the action using reset.

 
```
$ git reset DidntMeanToAddYou.cs
```
 

And you can even undo changes made to a file with a modified checkout command. This gets files back to their state at the last known commit. Clearly, this is a command to use carefully so you don't accidentally lose work!

 
```
$ git checkout -- backToHowYouWere.ml
```