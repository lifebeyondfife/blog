var siteUrl = 'https://lifebeyondfife.com';

var legacyRedirects = {
  "/plain-english1": "https://lifebeyondfife.com/compsci/plain-english/",
  "/fantasy-football": "https://lifebeyondfife.com/coding/fantasy-football-2013-14/",
  "/98-whats-new-music-html": "https://lifebeyondfife.com/follies/whats-new-music/",
  "/97-web-developer-html": "https://lifebeyondfife.com/essays/web-developer/",
  "/96-failure-html": "https://lifebeyondfife.com/essays/failure/",
  "/95-fantasy2-html": "https://lifebeyondfife.com/coding/fantasy-football-2012-13/",
  "/93-prism-html": "https://lifebeyondfife.com/coding/prism/",
  "/92-barrier-html": "https://lifebeyondfife.com/essays/barrier/",
  "/91-mojo-html": "https://lifebeyondfife.com/essays/mojo/",
  "/90-new-music-part-one-html": "https://lifebeyondfife.com/follies/new-music-part-one/",
  "/89-man-at-work-html": "https://lifebeyondfife.com/follies/man-at-work/",
  "/88-restful-html": "https://lifebeyondfife.com/follies/restful/",
  "/87-beauty-html": "https://lifebeyondfife.com/follies/beauty/",
  "/85-university-challenge-html": "https://lifebeyondfife.com/follies/university-challenge/",
  "/84-remote-dev-teams-html": "https://lifebeyondfife.com/essays/remote-dev-teams/",
  "/83-e-to-the-pi-or-pi-to-the-e-html": "https://lifebeyondfife.com/follies/e-to-the-pi-or-pi-to-the-e/",
  "/82-f-sharp-html": "https://lifebeyondfife.com/follies/f-sharp/",
  "/81-real-games-html": "https://lifebeyondfife.com/follies/real-games/",
  "/80-async-await-html": "https://lifebeyondfife.com/coding/async-await/",
  "/79-ironpython-wpf-html": "https://lifebeyondfife.com/coding/ironpython-wpf/",
  "/78-amdahls-law-html": "https://lifebeyondfife.com/essays/amdahls-law/",
  "/77-d-lighted-html": "https://lifebeyondfife.com/follies/d-lighted/",
  "/76-in-house-html": "https://lifebeyondfife.com/essays/in-house/",
  "/75-agile-html": "https://lifebeyondfife.com/essays/agile/",
  "/74-fantasy-football-html": "https://lifebeyondfife.com/follies/fantasy-football-2011-12/",
  "/73-exhell-html": "https://lifebeyondfife.com/follies/exhell/",
  "/72-brown-field-html": "https://lifebeyondfife.com/essays/brown-field/",
  "/70-sabbatical-html": "https://lifebeyondfife.com/follies/sabbatical/"
};

var slugToCategory = {
  "ready-to-start": "fitness",
  "plateau": "fitness",
  "move-outwards-from-the-core": "fitness",
  "warming-up-and-down": "fitness",
  "ratio-of-lifts": "fitness",
  "basis-of-strength": "fitness",
  "technique-is-key": "fitness",
  "compound-lifts": "fitness",
  "why-getting-strong-is-hard-part-iii": "fitness",
  "why-getting-strong-is-hard-part-ii": "fitness",
  "why-getting-strong-is-hard-part-i": "fitness",
  "food": "fitness",
  "get-strong-first": "fitness",
  "preparation-for-training": "fitness",
  "increase-calories": "fitness",
  "the-body-as-an-engine": "fitness",
  "fitness-types": "fitness",
  "systems-not-goals": "fitness",
  "body-image": "fitness",
  "motivation": "fitness",
  "stress": "fitness",
  "training": "fitness",
  "measure-the-right-thing": "fitness",
  "question-everything": "fitness",
  "sacrifice-and-results": "fitness",
  "change-for-life": "fitness",
  "snake-oil": "fitness",
  "how-i-became-a-data-scientist": "follies",
  "higher-order-functions": "follies",
  "a-git-workflow-for-beginners": "follies",
  "how-not-to-do-a-hackathon": "follies",
  "helping": "follies",
  "designing-your-wedding-ring-with-13-year-old-code": "follies",
  "idea-a-day": "follies",
  "the-difference-between-mean-and-median": "follies",
  "from-idea-to-launch-a-website-dissection": "follies",
  "whats-new-music": "follies",
  "one-year-in": "follies",
  "new-music-part-one": "follies",
  "man-at-work": "follies",
  "restful": "follies",
  "beauty": "follies",
  "university-challenge": "follies",
  "e-to-the-pi-or-pi-to-the-e": "follies",
  "f-sharp": "follies",
  "real-games": "follies",
  "d-lighted": "follies",
  "fantasy-football-2011-12": "follies",
  "exhell": "follies",
  "sabbatical": "follies",
  "defend-your-codebase-against-ai-comments": "essays",
  "the-slow-path-to-everything": "essays",
  "the-deployment-constraint-speed-safety-and-automation": "essays",
  "stop-saying-tech-debt": "essays",
  "hiring-advice-for-bootcamp-graduates": "essays",
  "corporate-values-as-memes": "essays",
  "are-you-happy": "essays",
  "death-by-a-million-cuts": "essays",
  "the-future-of-education": "essays",
  "expert-or-generalist": "essays",
  "curiosity-killed-the-productivity": "essays",
  "web-developer": "essays",
  "failure": "essays",
  "barrier": "essays",
  "mojo": "essays",
  "banking-isnt-evil": "essays",
  "remote-dev-teams": "essays",
  "amdahls-law": "essays",
  "in-house": "essays",
  "agile": "essays",
  "brown-field": "essays",
  "caveats": "git",
  "conclusion": "git",
  "the-inner-cycle": "git",
  "the-middle-cycle": "git",
  "the-outer-cycle": "git",
  "setup-the-origin-repo": "git",
  "cycles-the-introduction": "git",
  "never-ever-push-to-master": "git",
  "branch-off-commit-and-merge-back": "git",
  "status-and-diff-and-log": "git",
  "add-and-remove-checkout-and-reset": "git",
  "checkout-this-branch": "git",
  "push-and-pull": "git",
  "init-clone-and-origin": "git",
  "end-to-big-bang-commits": "git",
  "backup-as-often-as-you-like": "git",
  "work-on-multiple-changes-concurrently": "git",
  "power-of-the-server-in-your-client": "git",
  "for-those-not-yet-using-git": "git",
  "insurance-against-leftpad-level-events": "coding",
  "breaking-into-web-development": "coding",
  "fantasy-football-2014-15": "coding",
  "converting-xml-to-json": "coding",
  "fantasy-football-2013-14": "coding",
  "xml-serialisation": "coding",
  "fantasy-football-2012-13": "coding",
  "prism": "coding",
  "async-await": "coding",
  "ironpython-wpf": "coding",
  "i-have-a-book-for-that": "management",
  "why-5-whys-isnt-enough": "management",
  "convincing-or-instructing": "management",
  "managing-expectations": "management",
  "what-are-your-engineering-culture-values": "management",
  "manager-readme-2021": "management",
  "manager-readme": "management",
  "are-you-joining-a-good-engineering-team": "management",
  "how-much-coding-should-a-manager-do": "management",
  "before-you-learn-to-program": "compsci",
  "converting-bases": "compsci",
  "the-10-types-of-people": "compsci",
  "counting": "compsci",
  "plain-english": "compsci"
};

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (legacyRedirects[uri]) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: legacyRedirects[uri] },
        'cache-control': { value: 'max-age=31536000' }
      }
    };
  }

  var paginationMatch = uri.match(/^\/page\/(\d+)$/);
  if (paginationMatch) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: '/posts/page/' + paginationMatch[1] },
        'cache-control': { value: 'max-age=31536000' }
      }
    };
  }

  var slug = uri.replace(/^\/|\/$/g, '');
  if (slug && slugToCategory[slug]) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: siteUrl + '/' + slugToCategory[slug] + '/' + slug + '/' },
        'cache-control': { value: 'max-age=31536000' }
      }
    };
  }

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (!uri.split('/').pop().includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
