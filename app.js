/**
 * Author: lnb512@york.ac.uk
 * Project: COM00151M Final Project
 * Date: 08.10.2021
 * 
 * This HTTP REST MICROSERVICE API processes a client POST (REQUEST) of student details.
 * It validates the input and responds with HTTP 200 if the validation passes. 
 * Else it returns an RFC7807 specification 400 HTTP error response to the client.   
 * 
 * The client sends an RFC7808 specification "application/problem+json" payload as 'Content-Type', 
 * with the API returning a problem details "application/problem+json" response back to the client. 
 * 
 * The RFC7807 HTTP specification describes in detail the error encountered
 * and the causes. Providing the client with enough information for error handling.
 */

const express = require('express');
const httpProblem = require('problem-json'); 
const cors = require('cors');

const app = express();  
app.use(cors());           // all for all CORS

const port = 3001;         // port number of microservice

// middleware to access raw HTTP client data 
// and prepare for API
app.use((req, res, next) => {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { 
       data += chunk;
    });

    req.on('end', () => {
        req.body = data;
        next();
    });
});

// handle client POST REQUEST
app.post('/', (req, res) => {    
    if ((req.headers['content-type']) != ("application/problem+json")) {
        res.status(400);
        res.send('Invalid Content-Type received - Expected RFC7808 specification');  
    }

    if (req.body) {
        let data = JSON.parse(req.body);            // get raw client request from middleware 
        console.log(data['firstName']);     
    }


    if (Object.keys(req.body).length == 0) {
            // error encountered
            // use RFC7807 HTTP specification for RESPONSE 
            ///         extend error description  
            const extension = new httpProblem.Extension({
                invalidParms: [{ 
                    firstName: 'Cannot be blank.', 
                    lastName: 'Cannot be blank.', 
                    studentNumber: 'Must be numeric' 
                }]
            });
    
            // problem details (incl. extension)
            const doc = new httpProblem.Document({
                type: 'https://york.ac.uk/students/registration-exception',
                title: 'Validation error.',
                detail: 'Student registration request parameters failed to validate.',
                instance: 'york.ac.uk/students/registrations',
                status: 400,
            }, extension);

            // send RFC7807 HTTP specification RESPONSE back to client
            res.writeHead(400, 
                'Student registration request parameters failed to validate.', {
                'Content-Type': 'application/problem+json',
                'Content-Language': 'en', 
            });
            res.end(JSON.stringify(doc)); 
        }  else { 
            // student details validation was successful
            let resp = {
                "firstName": req.body['firstName'], 
                "lastName": req.body['lastName'], 
                "studentNumber": req.body['studentNumber']
            }
        
            //res.set({ 'Content-Type': 'application/problem+json' });   // ensure payload in RFC7808
            //res.statusMessage = "Student details validated OK";
            res.status(201);
            res.send("Student details validated OK");  
            //res.send(JSON.stringify(resp));
        }
});
 
//listen for client request
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`); 
});   