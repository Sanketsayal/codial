const mongoose=require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/codial');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting to database'));
db.once('open',function(){
    console.log('connected to db');

}); 
module.exports=db;