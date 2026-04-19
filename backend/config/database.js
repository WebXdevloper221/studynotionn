

const mongoose = require('mongoose')
require('dotenv').config()

exports.connectDB = () => {
    mongoose.connect("mongodb+srv://pankajlovanshi252:WRJAzQzaEuf6g5hW@cluster0.wlc8a.mongodb.net/StudyNotion", {
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    .then(()=>{
        console.log("DB connection successfull!")
    })
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
}