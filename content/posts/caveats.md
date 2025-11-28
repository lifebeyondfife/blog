---
title: "Caveats"
date: "2016-02-28"
category: "git"
---

If this isn't the only site you've looked at for assistance learning git, you may have come across advice that perhaps contradicts some of the suggestions I've made. For example, the template workflow I describe instructs users to get the latest changes from the origin repo using `git pull`. Other sources will recommend, [with good reason](http://longair.net/blog/2009/04/16/git-fetch-and-merge/), a slightly longer approach that splits this over two git commands, `fetch` and `merge`.

 

## Opiniated versus Non-opinionated

As a programmer you may have heard languages being referred to as opinionated or non-opinionated. Opinionated languages do not just specify their, often terse, syntax, but rather as well define how the programmer should write their programs. Non-opinionated languages on the other hand provide many language features allowing for creative and varied ways of solving problems. For instance, Go and Python are opinionated, whereas C++ and Ruby are not.

Non-opinionated programming languages are great for solo programmers who are free to develop in the style of their choosing. Teams of programmers writing in non-opinionated languages, however, will often choose a subset of all available features or explicitly enforce a certain coding style in code reviews to foster a homogenised code appearance.

 

## The human side of the git process

As a programming tool, git is very much non-opinionated. There are a great many number of ways of doing things and it's worth saying now that just because you _can_ do something in git, does not mean that it's a good idea. Teams who use git should consider not just the technical ways of using the tool, but also the human side i.e. the processes the team agrees upon.

I am not a git expert, and unless forced otherwise, I have no intention of becoming one. The reason for this is that I am perfectly happy with my level of git knowledge because the process my current and former teams used were simple ones, requiring only intermediate knowledge of the git tool.

 

## Enhancements to the template workflow

The workflow described in this blog series is as simple as I could make it while still providing something of value to the beginner. In order to avoid confusion there are processes that teams I've worked in have adopted that I elected to omit; there are shortcuts that I take that I did not advertise. A few examples:

My recommendation to commit locally every hour is a sensible one from the point of view of safety but in practice, this will lead to a noisy commit history in the master branch. It's possible to collapse all changes from one branch into a single commit using combinations of the `branch`, `reset` and `commit` commands.

After a code review has been made there may be additional changes to a branch that interleaves commits between different features. The `rebase` command can be used to reorder related commits into a contiguous block.

Many common git tasks can be done quickly using command line flags e.g. `git checkout -b MyNewTask` creates a new branch, and immediately calls checkout on that branch. Something that would take two commands without the dash-b flag.

More detailed commit messages can be left by omitting the dash-m flag of the `commit` command and writing paragraphs in the default git text editor, vi. As text editor tools go, I believe vi is an efficient one once you get over the steep learning curve, however, back in the nineties I used pico (nano) and these days I'm a notepad++ and atom fan - I have no desire to go back and learn how to enter text like they did in the seventies. So for novice users of git, you may want to edit your config to tell git to use another terminal based text editor because unless you know to type `[:wq](http://www.cyberciti.biz/faq/save-file-in-vi-vim-linux-apple-macos-unix-bsd/)`, you may be stuck even trying to exit vi.

 

## The correct way to use git

The intention of this series of blog posts on git is to say to the competent engineers out there who are struggling to use a tool that everyone else in the world seemed to pick up effortlessly, "I get it, it's not that simple." Doubly so if you're not used to working with a \*nix terminal. Hopefully it's been pitched at the right level to get you started.

The intention of this caveats entry is to admit that there's a lot more to learn, and that, often, there isn't a single correct way to use git. Whatever makes sense, and works for you and your team is the correct way. So keep reading and learning about git from many sources far and wide, but don't just think in terms of right and wrong, think in terms of safety or efficiency, simplicity or complexity. Good luck!

 

[git\_index\_](http://lifebeyondfife.com/git/)

The End.
