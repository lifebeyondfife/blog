---
title: "Beauty in Mathematics"
date: "2012-02-06"
category: "follies"
tags: 
  - "code"
  - "fractals"
  - "javascript"
  - "maths"
  - "sierpinski"
legacySlug: "87-beauty-html"
---

Many people look at the beauty in nature and wonder how it all could have possibly been created. You could also look in awe at the Sistine Chapel and feel likewise impressed but we know this was simply the patient brushstrokes of a talented artist with plenty of time. Quite often the most stunning sights in the universe are a result of simple patterns repeating and evolving over time. Though we can't create a planet in a laboratory and fast-forward a few millenia whilst looking in, we can create simple patterns using mathematics. I'm going to show you three such patterns and hopefully surprise you.

## Adding Numbers

Given a row of single digit numbers, we're going to create another row by adding together adjacent numbers and disregarding all but the final digit i.e. modulo ten. For example:

```
  0 2 3 9 0
 0 2 5 2 9 0
0 2 7 7 1 9 0
```

From the first row we have 0 + 2 = 2, 2 + 3 = 5, 3 + 9 = 12 (but we only keep the 2) and 9 + 0 = 9 which gives us the numbers for the second row. Notice how the size of the rows increase by one each time. Even just a single number on its own can create a complex pattern.

```
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```

We'll see more on this later when we create more rows, colour the odd numbers black, and the even numbers white (light-grey).

## Chaos and Randomness

Patterns can emerge from chaos as well as order. Consider a number of points making a shape. We can create a pattern by starting somewhere in the middle, picking one of the outlying points at random, moving half way toward it and drawing a dot. By continuing to pick random outliers and drawing dots we can create a structured pattern even though it was created using randomness.

![](/images/random.png)

## Fractals

Fractals appear all around us in nature. A fractal is simply a structure or shape that repeats and appears again as you look at it from further back and similarly as you zoom in. We can create a fractal by repeatedly applying a transformation to an initial structure. The fractal we're going to look at is a transformation to a straight line, breaking it up into three straight lines. After a second application we would have nine straight lines, then twenty-seven etc.

Our transformation is to scale the line down by 50%, rotate \$\\frac{\\pi}{3}\$ anti-clockwise, draw a line. Rotate \$\\frac{\\pi}{3}\$ clockwise and draw another line. Finally rotate \$\\frac{\\pi}{3}\$ clockwise again and draw one last line. We'll also add a little complexity to this fractal by alternating the direction of the rotations from one application to the next.

![](/images/fractal.png)

## Beauty

In this amazing world, beauty is all around us. But it's important never to forget that while it's rewarding to appreciate the finished article, we shouldn't lazily stop thinking about how they came about in the first place. The simplest instructions like the three I've mentioned can create something [quite unexpected](http://en.wikipedia.org/wiki/Sierpinski_triangle).

<!-- sierpinski-widget -->
