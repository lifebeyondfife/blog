---
title: "Speedrunning A Failed Business"
date: "2026-02-13"
category: "follies"
---

I've worked at two scale-ups over the last 12 years, and after two exits, I'm taking a break to work out what I want to do next. I have a list of projects that sound interesting to me, but mostly I'm staying curious and not being prescriptive about the path to take for a while. One of these impromptu projects led to me speedrunning a failed business in two weeks.

In the summer of 2013 I completed a Coursera MOOC called Startup Engineering. Knowing how to code, but not a thing about making a business, I took away a key insight about how to build a multi-billion dollar empire: don't treat that as the end goal. The trick is, you're not trying to create a massively successful company, you're trying to invalidate a business idea. And because this is a disruptful tech startup, you're not looking to start a small business to be nutured slowly over the years; you're trying to achieve exponential growth.

The way it was presented therefore is set yourself order of magnitude milestones, with time horizons for each, and a flavour of how mature the product is at each stage. For example:


| Users | System Maturity | Timeline | Invalidation Signal |
|-------|----------------|----------|-------------------|
| 1 (You) | Hacky prototype, hardcoded values | 1-2 weeks | You don't use it daily |
| 10 (Friends) | Basic functionality, manual processes OK | 2-4 weeks | Try once, never return |
| 100 (Network) | Core features automated, simple database | 2-3 months | <10% willing to pay, <20% weekly retention |
| 1,000 (Early adopters) | Authentication, deployment, support tools | 4-6 months | CAC > 3x LTV, support exceeds dev time |
| 10,000 (PMF test) | Horizontal scaling, caching, A/B testing | 9-12 months | Growth requires constant paid acquisition |
| 100,000 (Scale validation) | Service architecture, CDN, data pipeline | 18-24 months | Unit economics don't improve with scale |
| 1M+ (Growth machine) | Multi-zone, microservices, dedicated teams | 2-4 years | Growth plateau, no competitive moat |

Each milestone tests a fundamental assumption about the business. Reaching the next order of magnitude should happen within the timeline shown, or the signal suggests pivoting rather than pushing forward. The exponential nature of startup growth means that linear progress often indicates fundamental product-market fit issues. This framework prioritises speed of learning over technical perfection, allowing teams to discover fatal flaws early when the cost of change remains manageable.

The course was useful in giving me context for my first attempt at making a web app. Growing up in the 90s, I've always been a collector of CDs, and though I listen to FLAC today, I never moved away from buying physical media. This means I don't use music services, and need to keep on top of new releases myself. I had an idea about creating a web app that you tell your favourite artists to, and it returns you the latest releases by those artists.

This was something I built as [What's New? Music](https://web.archive.org/web/20121212203148/https://whatsnewmusic.com/), a failed app that I sunk a year into (see old blog posts about the original API service [Feb 2012](https://lifebeyondfife.com/follies/restful/), the data layer [Apr 2012](https://lifebeyondfife.com/follies/new-music-part-one/), site launch [Dec 2012](https://lifebeyondfife.com/follies/whats-new-music/), and launch dissection [Jan 2013](https://lifebeyondfife.com/follies/from-idea-to-launch-a-website-dissection/)). I credit making that site with learning lessons which gave me authenticity in my interviews at Skyscanner that landed me a job as senior engineer. Not a complete waste of time then, but certainly not an efficient use either. Using the above learning milestone framework, I could have created a tiny hardcoded prototype to invalidate the appalling UX much sooner.

One of the over-engineered decisions from that time 14 years ago, was full integration with Amazon and Apple's affiliate programmes. In Amazon's case, in multiple European and North American markets. I hadn't given a thought to that web app in over a decade when I received an email a few weeks ago from Amazon:

    Hello whxxxxx-21,

    Your account is currently out of compliance and requires action to prevent potential
    account suspension. We regularly review websites listed in Amazon Associates accounts to
    ensure compliance with our Operating Agreement. During our recent review, we found that
    the websites that you declared in your account are not accessible or not working.

Normally I would have ignored this email and gone about my day, but something belligerent must have been brewing in me. Why not instead of ignoring the email, remake the website, much better than I did the first time round, and do it a week? This is the beauty of being in complete control of the calendar: nothing to stop me literally giving it a go.

Looking at the problem space with a more refined product manager hat on, I saw this app having three product problems to solve:

1. find the user's favourite artists
2. find release information and images for the latest releases by those artists
3. provide convenient affiliate links where those releases could be purchased

My naïve original attempt solved #1 by expecting the user to type them in by hand, #2 was solved mostly by using Amazon's Product API, which they no longer just allow anyone to use, and #3 was handled by Amazon and Apple APIs. For the new web app, I took a decision to shortcut a hacky implementation by using Spotify's user API to solve #1, Spotify's artists  API to solve #2, and a generic search URL to amazon.com, with an affiliate tag, to solve #3. Much better UX, and significantly easier implementation.

![New Music modern architecture for 2026](/images/newmusic.png)

All of the above is released via continuous deployment using [GitHub Actions](https://docs.github.com/en/actions), [SAM infrastructure-as-code](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html), and developed against either a local setup using [LocalStack](https://www.localstack.cloud/), or against the production AWS instructure, depending on the configuration. All in all, it's a joy to troubleshoot and maintain. Given everything is serverless and event driven, the hosting is essentially free while there's no traffic.

The web app itself was built using Claude Opus for the project outline, broken into the epics below, and Claude Sonnet for the individual tasks.

1. Project Foundation & Local Development Environment — installing pnpm, Vite, React, LocalStack etc.
2. Backend Infrastructure & Continuous Deployment — creating "Hello, World!" artefacts in LocalStack and AWS
3. Spotify OAuth2 Authentication — handling Spotify's API integration for OAuth session tokens, and validating `/v1/me` [endpoint](https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile)
4. Artist & Release Data Pipeline — AWS lambda functions for retrieving user's favourite artists, and queueing SQS jobs to fetch album data, while exponentially backing off for 429 responses etc.
5. REST API Implementation — AWS Gateway API routing and Lambda function backend API endpoints for user login/logout, and fetching user's releases
6. Frontend Application — React single page application, with infinite scroll, and extensive use of Local Storage caching given the mostly static nature of the site's data
7. Production Hardening & Observability — didn't need to get round to this; read on...

Also notable is the use of another of my existing projects, [simple-static-website](https://github.com/lifebeyondfife/simple-static-website), to host the React single page application in an S3 bucket, served via AWS' CloudFront CDN. Here's a quick demo of the product in action.

<div class="flex justify-center my-8">
  <video width="320px" controls>
    <source src="/videos/newmusic.mp4" type="video/mp4">
    New Music web app demo
  </video>
</div>

During the course of building the MVP, I uncovered a pretty big problem. First, Spotify only give API access to 25 named individuals during app development. To get out of the development stage and into production, you must be a legally registered company, and the app must have 250k monthly active users. Using Spotify could help bootstrap customer interviews, but the high MAU requirement meant it wouldn't be viable for a generally available launch. I would need another solution for specifying users' favourite artists, and finding their latest releases.

For me though, it allowed for kicking some tyres. It was exciting to scroll through a list of albums from bands I liked that I'd never seen before! Two of my favourite alternative rock/metal acts from the early 2000s, Filter and Puddle of Mudd, had released albums I knew nothing about. I'm still waiting for the album by Filter to arrive, but Puddle of Mudd's paint-by-numbers atrocities made me question multiple life choices. Part of the fun of buying music blind is not knowing what you're getting, but there are limits... more fool me.

Purchasing these three CDs had a dual purpose. I could now login to my Amazon Affiliate account to validate the end-to-end flow of the app's affiliate tracking.

![Summary of Amazon Affiliate Earnings, Clicks, and Ordered Items](/images/affiliate-report.png)

And it's there that I learned that CD, vinyl, and digital music are not counted in the Amazon Affiliate programme. So unless a user also happened to buy a new laptop alongside their new music, this business wasn't going to make a penny from Amazon.

The path forward needed to solve several problems:
* create an MVP product to ask users for their favourite bands — I had a vague idea about maintaining blocks of lists to make it easy to add whole sub-genres, auto-complete manually typing out artist names, and make it easy to remove unwanted artists
* regularly download the [MusicBrainz music database](https://musicbrainz.org/doc/MusicBrainz_Database/Download), and drive release discovery from that data source
* join other affiliate programmes e.g. Juno etc.


These all felt like large time sinks. I could see getting any usage for such a niche product idea would be difficult regardless. I mean, who _buys_ music in this day and age other than weird middle-aged men like me!? One lesson I learned from my time at Skyscanner about how to grow a great two-sided marketplace, is to put customers first, partners second, and your own company third. With that in mind, even if I added other affiliate partners, I would keep it easy for users to buy music from their preferred retailers, further reducing revenue opportunities.

I had earlier priced the market cap of retail music media in the UK at roughly £330m. Not nothing, but not great. There are some big technical problems to solve in providing solutions to the three key product problems. Looking back at my table of milestones, I cannot in all honesty progress it beyond me. No trying to get 10 friends to use it; no landing page looking for the 100 first users.

I'm counting this as a big victory. I pushed 371 commits to GitHub over 12 days. I made something much more technically robust than it needed to be, violating all the guidance of my above framework, but I did so because I was enjoying it so much.

Even if I broke my own rules, I created MVP #2 25x faster than it took to make MVP #1 in 2013. And I've another AI co-authored project under the belt. Having worked in tech for 20 years, you're rarely accountable for everything yourself, so it was a genuine concern whether I could create something of quality, end-to-end, even with the assistance of AI. I learned some new lessons to double-check ahead of time i.e. whether something can make money, what restrictions there are on API usage.

I genuinely count myself lucky this only cost me two weeks. When I discovered that Amazon paid 0% commission on music, I laughed. Had this been multiple months of blood, sweat and tears, with spiralling cloud costs, I would have cried.

On to the next idea to invalidate.
