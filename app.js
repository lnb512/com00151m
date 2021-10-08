const http = require('http'); 
const httpProblem = require('problem-json');

const port = 3000;

//accept client request 
const server = http.createServer(function(req, res) { 

    // extend error description
    const extension = new httpProblem.Extension({
        firstName: 'Cannot be blank.',
        lastName: 'Cannot be blank.', 
        studentNumber: 'Must be numeric',  
    });
    
    // problem details (incl. extension)
    const doc = new httpProblem.Document({
        type: 'https://york.ac.uk/students/registration-exception',
        title: 'Validation error.',
        detail: 'Student registration request parameters failed to validate.',
        instance: 'york.ac.uk/students/registrations',
        status: 400,
    }, extension);

    // send Response to client
    res.writeHead(400, 'Student registration request parameters failed to validate.', {
        'Content-Type': 'application/problem+json',
        'Content-Language': 'en', 
    });
    res.end(JSON.stringify(doc)); 
}); 


//listen for client request
server.listen(port, function(error){
    if (error) {
        console.log('Something went wrong ', error);
    } else {
        console.log('Server listening on port ' + port);
    }
}); 