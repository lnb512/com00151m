const express = require('express');
const httpProblem = require('problem-json');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); 
app.use(express.json())    // <==== parse request body as JSON
app.use(cors())

const port = 3000;

app.post('/', (req, res) => { 
    if ((Object.keys(req.body).length == 0) || 
        (!req.body.firstName) ||
        (!req.body.lastName) ||
        (!req.body.studentNumber)) {
            // extend error description  
            const extension = new httpProblem.Extension({
                invalidParms: [{
                    firstName: 'Cannot be blank.',
                    lastName: 'Cannot be blank.', 
                    studentNumber: 'Must be numeric',  
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

            // send Response back to client
            res.writeHead(400, 'Student registration request parameters failed to validate.', {
                'Content-Type': 'application/problem+json',
                'Content-Language': 'en', 
            });
            res.end(JSON.stringify(doc)); 
        }  else { 
            let Resp = {
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "studentNumber": req.body.studentNumber
            }
        
            res.set({ 
                'Content-Type': 'application/json'
            }); 
            res.statusMessage = "Student details validated.";
            res.send(JSON.stringify(Resp));
        }
});
 
//listen for client request
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`); 
});   