---
title: "A Restful Weekend"
date: "2012-02-20"
category: "follies"
tags: 
  - "c"
  - "code"
  - "restful"
  - "soa"
  - "wcf"
legacySlug: "88-restful-html"
---

This is an amusing play-on-words type of blog post as I can't remember the last time I had a restful weekend. I'm simultaneously job hunting and flat hunting in Edinburgh from my base back in Fife (thanks Mum & Dad ;) with most of my stuff, half of my CDs and most importantly my [guitar](http://www.lifebeyondfife.com/images/restful/preciousss.jpg) back in Cambridge \*sigh\* No matter, I press on with a mini project for a [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) web service using ASP.Net and WCF.

A couple of weeks back I tweeted the following:

![](/images/challenge.png)

The awesome [rateyourmusic.com](http://rateyourmusic.com/) do have a section within a user's profile page that provides this information but it can't be traversed backwards through time or accessed via, say, an RSS feed. I received no suggestions so if I want it, I'll have to solve the problem myself.

## Smart phone app, web site, web service...?

As a predominantly desktop application programmer, this problem felt different to most others I solve with software. More robust than required by a quick and dirty console script, more fluid than the overhead of a full blown exe. It felt most natural as a smart phone app but I'm afraid that working with [Django](https://www.djangoproject.com/) and, more specifically, [Eclipse](http://www.eclipse.org/downloads/) on a side project with friends has led me to the conclusion that the Android development platform is naught but [pain and suffering](http://blog.nofail.de/2011/06/developing-android-sucks/) (read Dan's comment, so spot on). During my research days I was a card carrying Linux supporter but ever since using Visual Studio and C# I have been a Microsoft fan, for development at least.

But until I get a Windows Phone upgrade - not to mention an installation of Visual Studio 2012 and Windows 8 - it seems pointless for now to construct a [Windows Mango](http://en.wikipedia.org/wiki/Windows_Phone_7.5) app. So how about a web based solution instead? I have to say I love my current host [ovh](http://www.ovh.co.uk/), but there's no ASP.Net hosting available quite yet so while I like to provide fully functioning code samples, this is a little more preliminary than usual. But working sourcecode is (hopefully) always useful to someone. Here are the results of my efforts to get started with a RESTful web service architecture.

## Rest-what-now?

It's a term I'd seen frequently on Hacker News which, as a place for technology entrepreneur enthusiasts, loves web best practice. It is far from a new concept however, dating back to the HTTP 1.1 specification and describes a set of constraints that should be applied when creating web services e.g. a stateless client context, server-side caching.

It's a complicated minefield for the uninitiated though i.e. me, so here are two downloads I found that helped me get moving quickly:

[WCF REST Service Template 40(CS)](http://visualstudiogallery.msdn.microsoft.com/fbc7e5c1-a0d2-41bd-9d7b-e54c845394cd) - This is a template extension for Visual Studio created by Microsoft's own WCF team. It creates a small project that provides a RESTful service that helpfully maps elements of the client requested URI to a server side parameter. For example, the code below allows me to send a HTTP GET request (note the WebGet attribute), to a URI such as, say, http://www.mycoolrestfulproject.com/WhatsNewMusicService/Wu-Tang Clan/TopEntries/4 and the UriTemplate parses my request to extract "Wu-Tang Clan" and "4" as the artist and entries parameters respectively for the GetEntries function.

![](/images/templates.png)

[WFetch](http://www.microsoft.com/download/en/details.aspx?displaylang=en&id=21625) - This brilliant application, also from Microsoft, allows you to create HTTP requests easily, essential for when you need to send something other than a GET e.g. POST, PUT, DELETE etc.

## What's New? Music

"What's New? Music" is the work-in-progress name for this early stage prototype. It is a web service that uses the [Music Brainz web API](http://musicbrainz.org/doc/XML_Web_Service/Version_2) to discover all the albums released by a given artist. The server caches a list of all albums from all queried artists and returns them ordered from most recent to oldest. The user can ask for the most recent albums from a specific artist or aggregated for all artists. Also, the top X albums can be requested instead of all of them. To start with, you'll find the process incredibly slow as each new artist request requires several Music Brainz queries which, owing to their T&Cs, must be separated by a window of one second between each (enter the [Proxy design pattern](http://en.wikipedia.org/wiki/Proxy_pattern)). The requests to the What's New? Music service are returned in the form of an XML document.

![](/images/wutang.png)

## Next steps

So the next things to do before I consider this problem "solved".

- Get ASP.Net hosting. Recommendations welcome :)
- Create a nice web front end for this service, an RSS feed too would be ideal.
- Handle the occasional flakiness in the data set more gracefully than simply ignoring it.
- Make the data properly serialisable rather than having session based data structures.
- Allow for a user login - or at least some way for a client specific view of the artists you wish to know about.

Or someone can feel free to stop me and _tell me if there's already an app that does this!_ Anyone? No?
