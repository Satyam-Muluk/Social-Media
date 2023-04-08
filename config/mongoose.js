const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeal_development');



const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDb!!!!"));


db.once('open',function(){
    console.log('connected to the database!!!');
});

module.exports = db;