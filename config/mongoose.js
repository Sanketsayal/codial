const mongoose=require('mongoose');
const env=require('./environment')

mongoose.connect(env.db);
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting to database'));
db.once('open',function(){
    console.log('connected to db');

}); 
module.exports=db;