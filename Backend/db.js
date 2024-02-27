const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/inotebook"
const connectToMongo = () =>{
    mongoose.connect(mongooseURI)
    .then(() =>{
        console.log("Connected to MongoDB Successfully");
    })
    .catch(() =>{
        console.log("Not Connected");
    })
};

module.exports = connectToMongo;