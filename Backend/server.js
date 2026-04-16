const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;

const {initializeSocket} = require('./socket');



// ✅ FIRST create server
const server = http.createServer(app);

// ✅ THEN initialize socket
initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on :${port}`);
});