const mongoose = require("mongoose")

async function startMongo() {
      const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to Mongo");
    mongoose.connection.on('error', err => {
      console.log("error", err);
    });
    // mongoose.connection.on('disconnected', err => {
    //   logError(err);
    // });
  return db
  }
  module.exports = {startMongo}
  
