

const mongoose = require('mongoose')
require('dotenv').config()

exports.connectDB = () => {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
        throw new Error("MONGODB_URL is not defined");
    }

    mongoose.connect(mongoUrl)
    .then(()=>{
        console.log("DB connection successfull!")
    })
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
}
