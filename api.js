const axios = require("axios");
const http = require("http");

let handleRequest = (httpRequest, httpResponse) => {
  const url = "http://api.open-notify.org/astros.json";

  axios
  .get(url)
  .then((axiosResponse) => {
    let data = axiosResponse.data;
    let people = data.people;

    httpResponse.writeHead(200, {
        'Content-Type': 'application/json',
        // We use this when there is no data manipulation, (NO POST, PUT, PATCH, DELETE)
        // 'Access-Control-Allow-Origin': '*' 
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });

    httpResponse.write(JSON.stringify(people));
    httpResponse.end();
  })
  .catch((err) => {
    httpResponse.write("an error happened" + err.message);
    httpResponse.end();
  });

}

http.createServer(handleRequest).listen(8000);
