var siteUrl = 'https://blog.chezmcdonald.info';
var redirects = {
  "/plain-english1": "https://blog.chezmcdonald.info/compsci/plain-english/",
  "/fantasy-football": "https://blog.chezmcdonald.info/coding/fantasy-football-2013-14/",
  "/98-whats-new-music-html": "https://blog.chezmcdonald.info/follies/whats-new-music/",
  "/97-web-developer-html": "https://blog.chezmcdonald.info/essays/web-developer/",
  "/96-failure-html": "https://blog.chezmcdonald.info/essays/failure/",
  "/95-fantasy2-html": "https://blog.chezmcdonald.info/coding/fantasy-football-2012-13/",
  "/93-prism-html": "https://blog.chezmcdonald.info/coding/prism/",
  "/92-barrier-html": "https://blog.chezmcdonald.info/essays/barrier/",
  "/91-mojo-html": "https://blog.chezmcdonald.info/essays/mojo/",
  "/90-new-music-part-one-html": "https://blog.chezmcdonald.info/follies/new-music-part-one/",
  "/89-man-at-work-html": "https://blog.chezmcdonald.info/follies/man-at-work/",
  "/88-restful-html": "https://blog.chezmcdonald.info/follies/restful/",
  "/87-beauty-html": "https://blog.chezmcdonald.info/follies/beauty/",
  "/85-university-challenge-html": "https://blog.chezmcdonald.info/follies/university-challenge/",
  "/84-remote-dev-teams-html": "https://blog.chezmcdonald.info/essays/remote-dev-teams/",
  "/83-e-to-the-pi-or-pi-to-the-e-html": "https://blog.chezmcdonald.info/follies/e-to-the-pi-or-pi-to-the-e/",
  "/82-f-sharp-html": "https://blog.chezmcdonald.info/follies/f-sharp/",
  "/81-real-games-html": "https://blog.chezmcdonald.info/follies/real-games/",
  "/80-async-await-html": "https://blog.chezmcdonald.info/coding/async-await/",
  "/79-ironpython-wpf-html": "https://blog.chezmcdonald.info/coding/ironpython-wpf/",
  "/78-amdahls-law-html": "https://blog.chezmcdonald.info/essays/amdahls-law/",
  "/77-d-lighted-html": "https://blog.chezmcdonald.info/follies/d-lighted/",
  "/76-in-house-html": "https://blog.chezmcdonald.info/essays/in-house/",
  "/75-agile-html": "https://blog.chezmcdonald.info/essays/agile/",
  "/74-fantasy-football-html": "https://blog.chezmcdonald.info/follies/fantasy-football-2011-12/",
  "/73-exhell-html": "https://blog.chezmcdonald.info/follies/exhell/",
  "/72-brown-field-html": "https://blog.chezmcdonald.info/essays/brown-field/",
  "/70-sabbatical-html": "https://blog.chezmcdonald.info/follies/sabbatical/"
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
  
  return request;
}