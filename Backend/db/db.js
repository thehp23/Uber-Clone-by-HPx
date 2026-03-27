const mongoose = require('mongoose'); //mongoose

const connectToDb=()=>{
    mongoose.connect(process.env.DB_CONNECT) //connected mongoose code -- import in .env and server.js files

.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));
}

module.exports = connectToDb;