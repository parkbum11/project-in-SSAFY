# node.js

1. main.js

```javascript
var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;

  if (_url == "/") {
    title = "Welcome";
  }
  if (_url == "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);
  fs.readFile(`data/${title}`, "utf8", function (err, description) {
    var template = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p>${description}</p>
    </body>
    </html>
    `;
    response.end(template);
  });
});
app.listen(3000);
```

현재 기본 예제를 작성하며 공부하고 있습니다.

07.22

오늘은 nodejs, express, mariadb를 연동시키는 작업을 해보았습니다.

S03P12B308-14

07.23

express와 mariadb를 이용해 로그인, 회원가입 구현중 ..

07.24

프론트 백 연동중..