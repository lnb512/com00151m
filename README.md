# COM00151M final project repository.
# It contains source code for the HTTP Microservices REST API.

## This HTTP Microservice leverages the Problem Details RFC 7807 HTTP specification to return detailed HTTP errors to the client application, for improved troubleshooting. 
 
RFC7807 can be found [here](https://datatracker.ietf.org/doc/html/rfc7807).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/lnb512/com00151m-http-api-microservice.git 
cd repository folder
npm install 
node app.js
```

# Your app should now be running locally.
Load http://localhost:3001 on your client (browser) to send request to HTTP Microservice.
The HTTP Problem Details Response will be sent to your terminal console. 

# Use Postman API client to trigger the HTTP Microservice REST API
Make sure you have [Postman](https://www.postman.com/downloads/) installed. 
Send a GET request to http://localhost:3001 and the response will appear below your request.
