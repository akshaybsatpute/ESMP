const mongoose = require('mongoose');

const URI = "mongodb+srv://Rambo:2BDZElSR0mto0fOD@cluster0.xcusk.mongodb.net/ESMP?retryWrites=true&w=majority";


const connectDB = async() => {
    try {    
        await mongoose.connect(URI,{
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("CONNECTED");
    } catch (error) {
        console.log("failed");
        console.log(error);
    }
}

module.exports = connectDB;






// const mysql=require('mysql')

// var connection=mysql.createPool({
//     connectionLimit: 20,
//     host:'localhost',
//     user: 'Rambo',
//     password:'RamB#@2711',
//     database:'esmp_project'
// })

// module.exports=connection;