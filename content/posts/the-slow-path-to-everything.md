---
title: "The Slow Path to Everything"
date: "2025-07-08"
category: "essays"
featuredImage: "/images/torment.jpg"
---


Over twenty years in software development, I’ve witnessed an evolution in how code integrates with other code. Each step has enabled more complex and distributed systems capable of progressively more impressive achievements. This comes with the price of understanding each new layer’s abstraction, moving us further from fast, direct execution and closer to slow, human communication. This journey reveals where we could be heading next.

## It’s all code, in one place

My first job as a software developer in the early 2000s was a lesson in how not to do things. The best example I can give is how version control was achieved: copy the sourcecode from a semantically versioned folder in a Windows network folder, and paste it to a new folder with the patch number incremented. Then hope and pray that you could finish your change before someone else wanted to make another, otherwise you’d have to solve the issue with a meeting.

This kind of hacking was part of the team’s success (the origin of that company lives on as Reuters; no, really). Our product was realtime European stock exchange ticker-plant software, and the state persistence at its core was an in-house key-value database library written in C. Both the library and the code for processing the stock exchange data, were built into the same single executable.

With all the code in the same executable, you’re limited to the memory address space of the server’s RAM and the processor bus size. There is inflexibility in making modifications to either the service, the database library, or both. The performance is lightning fast though, with direct memory address jumps occurring within 10 nanoseconds. One codebase, one team, one integration point: yourself. Total addressable code: ~100K lines.

## It’s all code, on the same machine

My next job used the Windows app, Perforce, for version control — it was a big step in the right direction. This company sold software to banks and financial institutions that needed to perform complex quantitative risk assessment on portfolios worth multiple billions of dollars. This platform had a multi-dimensional tabular UI for displaying financial instrument data for all sorts of pricing and risk metrics. It was my first 1m+ LOC codebase, and it was a behemoth.

The product was built on top of COM, a Microsoft technology that allowed executable code to live in independently deployable units, called dynamic linked libraries (DLLs). These not only allowed code from a single executable to call code from another independently compiled source, it also bridged the language gap of .Net managed-to-unmanaged code.

Similar addressable memory constraints existed for executables using COM, but the build process was decoupled to some degree. There was a performance penalty owing to the marshalling of data via the COM interface resulting in function calls taking up to 10 microseconds. Now you could integrate with dozens of libraries from different teams. Total addressable code: ~10M lines across your organisation.

## It’s all code, somewhere

Sensing the shifting winds, my career saw me leaving financial services altogether to join a B2C travel company. Engineering was no longer a cost centre, but rather a driver of innovation. The user may have seen only a few different screens, but there were countless teams behind the scenes building the backbone upon which the product was built. Integrations with more than a thousand data providers, and services coping with the data and computation complexity to handle the trillions of different language, market, currency, and travel destination combinations.

The innovation of Netscape, Mozilla and Google, showed that web applications could hit that sweet spot of being good enough in practice, with the added benefit of the persistence layer being device independent. Code no longer needed to be in the same process, or even the same physical machine. The network became our integration layer.

By following the RESTful API conventions, HATEOAS, and http network protocols enabled code to be larger and more complex as applications lived in several different services, potentially in a multitude of different programming languages. There was no limit to memory or CPU, now that servers could be horizontally scaled. Deployments were totally independent to the point that teams didn’t even need to coordinate releases with each other — the whole became a living organism.

The toll to pay for this abstraction is in the maintenance of the http integration contract — the API — as well as the time penalty of the network latency. Typically at least 100 milliseconds, between services. And any service with an API became a potential partner. Total addressable code: billions of lines across the entire internet.

## It’s not even code anymore

We can make optimisations here and there by putting web artifacts in CDNs, and using more efficient protocols like gRPC to reduce the pure network latency costs. Ultimately though, time spent idle by the user, while they wait for a response, is not the biggest scaling limit of modern day web apps.

The best teams will follow all the best practices with perfect OpenAPI documentation, semantically versioned APIs, tracking user request analytics, and sending proactive, tailored comms regarding API deprecation. Independent platforms growing alongside each other will still only move at the pace of the companies, and their engineering teams, themselves. Generative AI has opened the door to the next big abstraction.

Running a challenge at a university hackathon last year, I saw first-hand how much time and mental energy was spent navigating the complexity of the OAuth2 authorisation flow to start integrating with my company’s platform. Time not spent on developing the hack. This space is open for automation to a more permissive environment where a platform using Agentic Generative AI (AI that can autonomously navigate and interact with external systems), can decide in realtime whether it can integrate to another platform. Tentatively feeling out the API compatibility could increase the latency from 100 milliseconds to, say, 1 minute.

Users have always accepted latency for capability. We wait 100 milliseconds for web pages to load because we want access to global information. With AI-mediated integration, the trade-off becomes: wait one minute for your CRM to connect to that niche industry tool that would never make it onto Salesforce’s roadmap. Wait one minute to pull data from the legacy system your company built in 2010. Wait one minute to integrate with your competitor’s public API that they’d never officially support. The latency isn’t a bug, it’s the price of freedom from vendor roadmaps

This is the most radical abstraction yet. We’ve moved from direct memory access to describing what we want in human language. The question isn’t whether one minute latency is acceptable; it’s whether infinite integration is valuable. With AI-mediated integration, new and legacy APIs alike become accessible. Total addressable code: all of it.

This shift fundamentally changes what’s possible for both established platforms and new entrants.

## Integrating with 100,000 SaaS platforms

A Senior VP of Product I worked with had a north star vision: “Get 100 logos on the integration page.” It was ambitious; each logo represented months of partnership negotiations, technical work, and ongoing maintenance. The best platforms in the world might showcase 1,000 integrations.

But what if that constraint is artificial? Industry estimates suggest over 100,000 SaaS companies exist globally. In a world of AI-mediated integration, the question shifts from “Which 100 partners can we support?” to “Which of the 100,000 platforms do our users already rely on?”

Imagine a CRM that, on day one, can work with any existing system in your stack—negotiating APIs where available, or learning workflows through observation. Rather than asking engineers to master a new integration framework, the app simply asks, “What systems do you already use?”

## Choose Your Latency

Each abstraction layer we’ve built has asked us to accept higher latencies in exchange for greater scale. We’ve consistently chosen scale. As we approach the era of AI-mediated integration, the pattern holds: we’ll gladly wait a minute if it means we have access to every platform.

The question facing every platform today isn’t whether to embrace this shift, but when. In an ecosystem where any system can talk to any other system, the platforms that limit integrations to a curated few aren’t just constraining their users, they’re constraining their own future. The companies that understand this will build the next generation of truly connected software.