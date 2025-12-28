var siteUrl = 'https://lifebeyondfife.com';
var redirects = {
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
  "/70-sabbatical-html": "https://lifebeyondfife.com/follies/sabbatical/",
  "/page/1": "https://lifebeyondfife.com/posts/page/1/",
  "/page/2": "https://lifebeyondfife.com/posts/page/2/",
  "/page/3": "https://lifebeyondfife.com/posts/page/3/",
  "/page/4": "https://lifebeyondfife.com/posts/page/4/",
  "/page/5": "https://lifebeyondfife.com/posts/page/5/",
  "/page/6": "https://lifebeyondfife.com/posts/page/6/",
  "/page/7": "https://lifebeyondfife.com/posts/page/7/",
  "/page/8": "https://lifebeyondfife.com/posts/page/8/",
  "/page/9": "https://lifebeyondfife.com/posts/page/9/",
  "/page/10": "https://lifebeyondfife.com/posts/page/10/",
  "/page/11": "https://lifebeyondfife.com/posts/page/11/",
  "/page/12": "https://lifebeyondfife.com/posts/page/12/",
  "/page/13": "https://lifebeyondfife.com/posts/page/13/",
  "/page/14": "https://lifebeyondfife.com/posts/page/14/",
  "/page/15": "https://lifebeyondfife.com/posts/page/15/",
  "/page/16": "https://lifebeyondfife.com/posts/page/16/",
  "/page/17": "https://lifebeyondfife.com/posts/page/17/",
  "/page/18": "https://lifebeyondfife.com/posts/page/18/",
  "/page/19": "https://lifebeyondfife.com/posts/page/19/"
};

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  
  var lookupUri = uri.endsWith('/') && uri.length > 1 
    ? uri.slice(0, -1) 
    : uri;
  
  if (lookupUri in redirects) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: redirects[lookupUri] },
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