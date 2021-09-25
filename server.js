const axios = require("axios");
const http = require("http");
const fs = require('fs')

let handleRequest = (httpRequest, httpResponse) => {
  const url = "http://api.open-notify.org/astros.json";

  console.log(httpRequest.url);

  if(httpRequest.url === '/' || httpRequest.url === 'index.html'){
    httpResponse.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(httpResponse)
  }
  else if(httpRequest.url === '/data.json'){
    axios
    .get(url)
    .then((axiosResponse) => {
      let data = axiosResponse.data;
      let people = data.people;
  
      httpResponse.writeHead(200, {
          'Content-Type': 'application/json',
          // We use this when there is no data manipulation, (NO POST, PUT, PATCH, DELETE)
          // 'Access-Control-Allow-Origin': '*' 
      });
  
      httpResponse.write(JSON.stringify(people));
      httpResponse.end();
    })
    .catch((err) => {
      httpResponse.write("an error happened" + err.message);
      httpResponse.end();
    });
  }
}

http.createServer(handleRequest).listen(8000);
