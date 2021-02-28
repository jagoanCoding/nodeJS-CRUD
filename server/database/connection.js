const mongoose = require('mongoose')


const connectDB = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`MongoDB connected : ${con.connection.host} on URI : ${process.env.MONGO_URI}`)
    } catch(err){
        
        console.log(err);
        process.exit(true);
    }
}

module.exports = connectDB;