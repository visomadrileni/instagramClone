const mongoose = require('mongoose');

const connectDb = async () => {
  try{
     await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    });

    console.log(`MongoDB Atlas is connected`)
  }catch(err){
    console.error(err.message);
    process.exit(1);
  }
}
module.exports = connectDb;