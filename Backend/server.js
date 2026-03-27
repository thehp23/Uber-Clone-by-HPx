const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000; //port
const connectToDb = require('./db/db') //database connect
connectToDb();




const server = http.createServer(app); //create server






server.listen(port,()=>{
    console.log(`Server is running on : http://localhost:4000`);
});