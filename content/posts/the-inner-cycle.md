---
title: "The inner cycle"
date: "2016-02-08"
category: "git"
---

While actively writing code and experimenting with possible solutions, it's crucial to be constantly committing code to your local git repo. By doing so you ensure you can safely undo botched attempts you might develop along the way. Indeed, this gives you the freedom to try outlandish things knowing you can easily revert to the original without needing to rely on <Ctrl>+Z in your text editor.

 

## The git commands

Anytime you're happy with a small increment of coding, you can commit your changes to the local git repo. This coding increment can be of any quality you wish; it can be incomplete; it can break unit and integration tests. The purpose is provide a save point you can return to if you wish.

 

After developing such an increment, examine the status of the changes made.

 

$ git status

 

The messages git returns should be clear, especially to those who read the entry on staging. Look at the diff between your current state and the last commit.

 

$ git diff

 

When you're happy the changes made are correct, add the changes to staging.

 

$ git add ChangeFile1.js ./subdirectory/ChangeStyle.css

 

If you deleted any old files because they're no longer needed, explicitly tell git using the remove command. NOTE – this will also delete the file from this branch if it's still there.

 

$ git rm OldFileNoLongerNeeded.cs

 

To see diffs of files that you've staged, use `git diff HEAD`. Once you've finished staging, re-examine the status again.

 

$ git status

 

If everything looks in order and all the changes you wish to make are marked as staged, commit your changes along with a small description of what changes have been made.

 

$ git commit -m "Add a new function to read in the config file."
