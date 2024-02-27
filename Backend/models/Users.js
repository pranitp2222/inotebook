const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type : String,
        require: true
    },
    email:{
        type : String,
        require: true,
        unique : true
    },
    password:{
        type : String,
        require: true
    },
    timestamp:{
        type : Date,
        default : Date.now
    },
});

const Users = mongoose.model('users', UserSchema);
Users.createIndexes();
module.exports = Users;