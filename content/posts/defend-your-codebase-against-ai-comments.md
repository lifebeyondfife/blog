---
title: "Defend your codebase against AI comments"
date: "2025-07-27"
category: "essays"
featuredImage: "/images/ai-comments.jpg"
---

Generative AI tools such as [Claude Code](https://claude.ai/code), [Cursor](https://cursor.com/), [Devin](https://cognition.ai/), [Roo Code](https://roocode.com/), [Windsurf](https://windsurf.com/) have fundamentally changed the process of how software is written. As teams increasingly rely on AI-generated code, they need to rethink how they merge this code into their codebase, especially regarding comments.

![AI comments say a bash command isn't a pipe, but it is](/images/ai-comments.jpg)

I’ve long taken a policy against most comments when writing code. It has been perfectly summed up by [this tweet](https://x.com/nzkoz/status/538892801941848064). Maybe at one point the plastic container did hold basmati rice, but today, it’s clearly storing biscuits. This is it, the fundamental point: the compiler ignores your comments, so their relationship to the truth holds no guarantees.

The comment exceptions include those for documentation purposes e.g. OpenAPI. I like comments that explain the purpose of a class or file, somewhere near the top. I also like comments that explain why something is written the way it is, to inform the reader of some nuance or edge case they could never have anticipated without extra context. Even these comments can fall foul of the general problem with comments which is, when engineers update the code, they might not update the comments. The purpose of a class is unlikely to change, and documenting why code is written a certain way is valuable information that we take the risk to include.

Up to now, I’ve taken this as an arbitrary and biased choice based on how I see coding. Well written code that names variables and functions effectively, that breaks code into sensible units of complexity, is easy to read. The code documents itself. This position is one like tabs versus spaces, or vim versus emacs… it’s a dangerous choice for leaders to take a zero tolerance position on. If all the senior engineers in a team prefer code comments sprinkled through the codebase, they should have the autonomy to choose to do so. Generative AI fundamentally changes this though.

A comment that isn’t updated to reflect what the code is doing may confuse an engineer. What the confused engineer does next could go in a few different directions, but two of the most likely outcomes are that they work out what’s going on themselves from the code and git log, or they speak to someone on the team who knows the history of that part of the code. Either way, there’s a chance some level of common sense is applied.

In a bid to be helpful, generative AI will let you tell it that up is down, grass is blue and the sky is green, that there are 32 bits in an integer on arm64, and JavaScript arrays are 1-indexed. What it chooses to do with these falsehoods is anyone’s guess. Generative AI tools read your codebase, comments and all, and make decisions about how to modify and extend your solution. When AI tools encounter outdated comments, they incorporate this misinformation into new code and explanations, creating a compounding cycle of technical inaccuracy that’s harder to detect than traditional bugs. And because understanding natural language is the core strength of generative AI, it writes more than its fair share of comments back again.

Human nature’s propensity for shortcuts creates an even deeper problem than buggy comments: it can systematically erode team expertise. Managing a team of engineers means being aware of the Lottery Factor (also known as the more bleak Bus Factor) for disparate parts of the system design and codebase. More plainly, “How many engineers are experts in each area?” Any which have the answer “One”, or even worse, “Zero!”, are immediate concerns for the manager. Code written from scratch by an individual is implicitly at least understood by that one engineer. Just as engineers might rely too heavily on automated testing, they may rely too heavily on AI-generated explanations without truly understanding the code.

AI tools don’t just generate code, they also want to explain their work, linking the natural language semantics back to the high-level code. The motivations of a manager should always reflect their key accountability, to keep the service running. AI’s goal of being helpful may reduce the Lottery Factor, and put the effective running of the service at risk.

The inexact nature of language, especially the English language, opens up opportunities for misinterpretation e.g. “Get a carton of milk, and if they have eggs, get a dozen.” https://tapas.io/episode/1086317. Once the AI assisted code is written, the human plays the most important role in quality control. It’s not enough for the code to be syntactically valid, or even semantically correct. It must be understood, and ‘owned’ by the team. The code review becomes the place where this happens.

Teams should use AI to create high quality code, which is semantically correct, and self-documenting. This can be achieved by setting expectations for engineers prior to submitting for merge:

  1. Understand the code
  1. Refactor, where necessary
  1. Remove comments, according to an agreed policy

Similar to agreed coding standards in terms of syntax, formatting, design patterns etc. engineers should come to an agreement about what the AI comment strategy is for their team e.g. remove explanatory comments that duplicate what the code shows; preserve comments that explain business logic or non-obvious constraints; update or remove any comment that could mislead an AI tool if not maintained. By not short-cutting the benefits of AI generated code, and performing regular Lottery Factor reviews, teams will evolve a codebase that both they and their AI tools understand, today and in the future.

