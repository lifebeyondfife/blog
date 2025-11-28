---
title: "Breaking into the opinionated, disjointed world of web development"
date: "2016-03-12"
category: "coding"
---

Again and again, I find web development one of the most fascinating of all the disciplines I've come across in my career. Fascinating in the way [Extreme Ironing](https://en.wikipedia.org/wiki/Extreme_ironing) is fascinating: you spend as much of the time wondering _why_ as you do _how_.

 

## Getting started

The main issue as I see it for a developer with existing skills in programming looking to become a web developer, is how to get started. Take [jstherightway.org](http://jstherightway.org/) as an example of one of many introductory guides to modern web development: as comprehensive and helpful as it is, where do you begin? How do you make decisions regarding how to create applications without devoting months of your life to research?

For instance, the logic of a web application is written in JavaScript, but which version of [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) do you learn? You can use libraries to make your coding easier but how do you [automate packaging](http://stackoverflow.com/questions/33561272/task-runners-gulp-grunt-etc-and-bundlers-webpack-browserify-why-use-toge) of your library choices? The layout of a web application is written in CSS but there are [new features](https://www.w3.org/TR/css3-flexbox/) coming all the time, and most web developers use tools to [automate its generation](https://en.wikipedia.org/wiki/Sass_%28stylesheet_language%29). Incidentally, like many JavaScript features, CSS works [inconsistently across different browsers](http://caniuse.com/). The content of a web application is written in HTML but again there are [new features](https://en.wikipedia.org/wiki/HTML5) coming, and inconsistent browser rendering leading to [polyfill libraries](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills). I haven't even mentioned the surfeit of JavaScript [frameworks](https://www.airpair.com/js/javascript-framework-comparison), patterns and fashionable concepts like [isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) development.

 

## Lots of information, no consensus

When you break the problems down, none are that complex. But the high dimensionality of the issues inherent in web development lead to many different solutions. And strong opinions from proponents and detractors of this given tool chain, or that library or framework.

The latter makes it impenetrable for existing developers to get a foothold into the discipline. Once you go beyond [elementary JavaScript](https://www.codecademy.com/learn/javascript), there's too much information, too much [angry debate](https://news.ycombinator.com/item?id=10880604) and too little consensus.

 

## An opinionated, end-to-end web application

At the risk of trying to [solve the problem](https://xkcd.com/927/) of too much information with more information, I have forked an [existing TODO list implementation](https://github.com/facebook/flux/tree/master/examples/flux-todomvc) to create an [example client-server web application](https://github.com/lifebeyondfife/flux-server-todomvc). It is opinionated, in that I have taken technology decisions to produce a working application. It is also pragmatic in that it is a full end to end solution, and allows developers similar to myself grounded in server side coding to enter lightly with a realistic template implementation.

 

[Example TODO Web Application](https://github.com/lifebeyondfife/flux-server-todomvc) on GitHub.

 

#### Opinionated choices:

- _npm_ - the JavaScript is written in separate code modules using Node Package Manager to handle dependencies.
- _webpack_ - itself an npm package, webpack is responsible for collating the JavaScript libraries and modules into a single, minified JavaScript file.
- _React_ - a popular, modern View library by Facebook for creating nested HTML components.
- _Flux_ - in lieu of a web framework such as Angular, Ember, or Backbone, Facebook recommend using React with the Flux architecture. Though there is a Flux library, this is more a conceptual [design pattern](https://facebook.github.io/flux/docs/overview.html) with minimal JavaScript interactions.
- _Python3_ - The client code in the browser communicates with a single file server via a RESTful API. For those not too familiar with JavaScript, this provides a route outside Node.js, which most guides implementing Flux assume.

 

#### Suggestions for taking it further:

1. Use newer JavaScript features in ES6. This involves add a transpiler such as Babel to your webpack build steps but the language features are nicer. For instance, you won't need an explicit library for promises like mine uses.
2. Use a Flux implementation other than Facebook's default. The advantage of Facebook creating a design pattern rather than a fully fledged framework is that there's no lock in. Dan Abramov has created a great library called [Redux](http://redux.js.org/) that supports the Flux pattern. His series of [short videos](https://egghead.io/series/getting-started-with-redux) does a great job of introducing the topic - play along with JSFiddle.
3. Choose a different server side language. As much as I love Python and Flask, it's not the most performant language choice available. Having the explicit client-server divide in place makes it easier for the developer to select an entirely different back end platform.
