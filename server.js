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
    });

    httpResponse.write(JSON.stringify(people));
    httpResponse.end();
  })
  .catch((err) => {
    httpResponse.write("an error happened" + err.message);
    httpResponse.end();
  });

}

  /*
  axios
    .get(url)
    .then((axiosResponse) => {
      let data = axiosResponse.data;
    })
    .catch((err) => {
    });
};
*/

http.createServer(handleRequest).listen(8000);
