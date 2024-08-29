const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?tls=false&readPreference=primary";
const connectToMonge = async() => {
    await mongoose.connect(mongoURI).then(()=>{
        console.log('Connected Succesfully')
    })
}

module.exports = connectToMonge;