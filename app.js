const Logger = require('./logger');
const logger = new Logger();

// Register a listener (listener must be before emitter)
logger.on('messageLogged', function(arg) {
    console.log("Listener called", arg);
})

logger.log('message');

const http = require('http');

const server = http.createServer(function(req, res) {
    if (req.url === '/') {
        res.write('Hello world!');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000...');