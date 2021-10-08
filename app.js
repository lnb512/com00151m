const http = require('http'); 
const httpProblem = require('problem-json');

const port = 3000;

//accept client request 
const server = http.createServer(function(req, res) {

    const extension = new httpProblem.Extension({
        balance: 30,
        accounts: ['/account/12345', '/account/67890']
    });
    
    const doc = new httpProblem.Document({
        type: 'https://example.com/probs/out-of-credit',
        title: 'You do not have enough credit.',
        detail: 'You are low on cash',
        instance: '/sales/products/available',
        status: 400,
    }, extension);

    console.log(doc);
    res.writeHead(200);
    res.end(); 
}); 


//listen for client request
server.listen(port, function(error){
    if (error) {
        console.log('Something went wrong ', error);
    } else {
        console.log('Server listening on port ' + port);
    }
}); 