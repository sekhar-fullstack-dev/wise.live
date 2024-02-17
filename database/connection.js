const mongoose = require('mongoose');

// Replace 'your_database_url' with your actual MongoDB connection string
const connect = async()=>{
    try{
        mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true,dbName: process.env.DB })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));
    }catch(e){
        console.error(e);
    }
}

module.exports = {connect}