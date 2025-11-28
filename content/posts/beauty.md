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

Our transformation is to scale the line down by 50%, rotate \\(\\frac{\\pi}{3}\\) anti-clockwise, draw a line. Rotate \\(\\frac{\\pi}{3}\\) clockwise and draw another line. Finally rotate \\(\\frac{\\pi}{3}\\) clockwise again and draw one last line. We'll also add a little complexity to this fractal by alternating the direction of the rotations from one application to the next.

![](/images/fractal.png)

## Beauty

In this amazing world, beauty is all around us. But it's important never to forget that while it's rewarding to appreciate the finished article, we shouldn't lazily stop thinking about how they came about in the first place. The simplest instructions like the three I've mentioned can create something [quite unexpected](http://en.wikipedia.org/wiki/Sierpinski_triangle).

Your browser doesn't support HTML5 so the above buttons won't do anything :(

Adding Numbers Random Points Fractal

<script type="text/javascript">/* Copyright © Iain McDonald 2012 This file is part of Sierpinski Gasket. Sierpinski Gasket is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. Sierpinski Gasket is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with Sierpinski Gasket. If not, see <http://www.gnu.org/licenses/>. */ var context = document.getElementById('myCanvas').getContext('2d'); var canvas = document.getElementById('myCanvas'); var grey = '#e0e0e0'; var black = '#000000'; <div></div> function drawRow(rowDepth, previousRow) { var rows = 64; var currentRow = []; currentRow[0] = {}; currentRow[0].value = 1; currentRow[0].x = previousRow[0].x - 5; currentRow[0].y = 10 + (rowDepth / (rows - 1)) * 546; currentRow[previousRow.length] = {}; currentRow[previousRow.length].value = 1; currentRow[previousRow.length].x = previousRow[previousRow.length-1].x + 5; currentRow[previousRow.length].y = 10 + (rowDepth / (rows - 1)) * 546; for (var i = 0; i < previousRow.length - 1; ++i) { currentRow[i+1] = {}; currentRow[i+1].value = (previousRow[i].value + previousRow[i+1].value) % 10; currentRow[i+1].x = currentRow[i].x + 10; currentRow[i+1].y = currentRow[i].y; } for (var i = 0; i < currentRow.length; ++i) { if (currentRow[i].value % 2 == 0) context.fillStyle = grey; else context.fillStyle = black; context.fillText(currentRow[i].value, currentRow[i].x, currentRow[i].y); } if (rowDepth < (rows - 1)) setTimeout(function(){ drawRow(rowDepth + 1, currentRow); }, 3000 / rowDepth); } <div></div> function clearCanvas() { context.clearRect(0, 0, canvas.width, canvas.height); var w = canvas.width; canvas.width = 1; canvas.width = w; } <div></div> function additionSierpinski() { clearCanvas(); var initialRow = []; initialRow[0] = {}; initialRow[0].x = canvas.width / 2; initialRow[0].y = 10; initialRow[0].value = 1; <div></div> context.fillText(initialRow[0].value, initialRow[0].x, initialRow[0].y); setTimeout(function(){ drawRow(1, initialRow); }, 3000); } <div></div> var points = []; <div></div> function colourPoint(point) { context.beginPath(); context.arc(point.x, point.y, 1, 0, 2 * Math.PI); context.closePath(); context.stroke(); } <div></div> function randomPoint(pointNumber, previousPoint) { var currentPoint = {}; var randomVertex = points[Math.round((Math.random() * 3)) % 3]; currentPoint.x = previousPoint.x + (randomVertex.x - previousPoint.x) / 2; currentPoint.y = previousPoint.y + (randomVertex.y - previousPoint.y) / 2; <div></div> colourPoint(currentPoint); <div></div> if (pointNumber < 7500) setTimeout(function(){ randomPoint(pointNumber + 1, currentPoint); }, 1000 / pointNumber); } <div></div> function randomSierpinski() { clearCanvas(); <div></div> points[0] = {}; points[0].x = canvas.width / 2.0 + 3; points[0].y = 7.0; colourPoint(points[0]); <div></div> points[1] = {}; points[1].x = 13.0; points[1].y = canvas.height - 13.0; colourPoint(points[1]); <div></div> points[2] = {}; points[2].x = canvas.width - 7.0; points[2].y = canvas.height - 13.0; colourPoint(points[2]); <div></div> var startingPoint = {}; startingPoint.x = points[0].x; startingPoint.y = points[0].y; colourPoint(startingPoint); setTimeout(function(){ randomPoint(1, startingPoint); }, 1000); } <div></div> var lineCount = 0; function recursiveFractal(line, i, turnClockwise) { var rotateBy = Math.PI / 3; if (turnClockwise) rotateBy = -rotateBy; <div></div> if (i > 0) { scale(line, 0.5); rotate(line, rotateBy); recursiveFractal(line, i - 1, !turnClockwise); rotateBy = -rotateBy; rotate(line, rotateBy); recursiveFractal(line, i - 1, turnClockwise); rotate(line, rotateBy); recursiveFractal(line, i - 1, !turnClockwise); rotateBy = -rotateBy; rotate(line, rotateBy); scale(line, 2.0); return; } <div></div> var xStart = line.xStart; var yStart = line.yStart; var xEnd = line.xEnd; var yEnd = line.yEnd; drawLine(xStart, yStart, xEnd, yEnd); translate(line, line.xEnd - line.xStart, line.yEnd - line.yStart); } <div></div> function drawLine(xStart, yStart, xEnd, yEnd) { context.beginPath(); context.moveTo(xStart, yStart); context.lineTo(xEnd, yEnd); context.closePath(); context.stroke(); } <div></div> function translate(line, x, y) { var translate = new Array(3); translate[0] = new Array(1.0, 0.0, 0.0); translate[1] = new Array(0.0, 1.0, 0.0); translate[2] = new Array(x, y, 1.0); <div></div> applyMatrixToLine(line, translate); } <div></div> function scale(line, factor) { var scale = new Array(3); scale[0] = new Array(factor, 0.0, 0.0); scale[1] = new Array(0.0, factor, 0.0); scale[2] = new Array(0.0, 0.0, 1.0); <div></div> var xInitial = line.xStart; var yInitial = line.yStart; translate(line, -xInitial, -yInitial); applyMatrixToLine(line, scale); translate(line, xInitial, yInitial); } <div></div> function rotate(line, radians) { var rotate = new Array(3); rotate[0] = new Array(Math.cos(radians), -Math.sin(radians), 0.0); rotate[1] = new Array(Math.sin(radians), Math.cos(radians), 0.0); rotate[2] = new Array(0.0, 0.0, 1.0); <div></div> var xInitial = line.xStart; var yInitial = line.yStart; translate(line, -xInitial, -yInitial); applyMatrixToLine(line, rotate); translate(line, xInitial, yInitial); } <div></div> function applyMatrixToLine(line, matrix) { var lineStartVector = new Array(line.xStart, line.yStart, 1.0); var outputVector = matrixMultiply(lineStartVector, matrix); line.xStart = outputVector[0]; line.yStart = outputVector[1]; <div></div> var lineEndVector = new Array(line.xEnd, line.yEnd, 1.0); outputVector = matrixMultiply(lineEndVector, matrix); line.xEnd = outputVector[0]; line.yEnd = outputVector[1]; } <div></div> function matrixMultiply(vector, matrix) { var outputVector = new Array(0.0, 0.0, 0.0); for (var i = 0; i < matrix.length; ++i) { var result = 0.0; for (var j = 0; j < matrix[0].length; j++) result += matrix[j][i] * vector[j]; outputVector[i] = result; } <div></div> return outputVector; } <div></div> function fractalSierpinski() { for (var i = 0; i < 11; ++i) { drawTriangle(i); } } <div></div> function drawTriangle(i) { lineCount = 0; var line = {}; line.xStart = 13.0; line.yStart = canvas.height - 13.0; line.xEnd = canvas.width - 7.0; line.yEnd = canvas.height - 13.0; setTimeout(function(){ clearCanvas(); recursiveFractal(line, i, false); }, 5000 * Math.pow(i, 0.6) ); }</script>
