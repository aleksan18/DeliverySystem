const { Schema, model, Types, Mongoose } = require("mongoose");

const driverSchema = new Schema(
    {
       first_name:{
           type: String,
       },
       second_name:{
           type: String,
       },
       email:{
           type:String,
       },
       phone:{
           type: String,
       },
       free:{
           type: Boolean,
       } 
    }
)

const Driver = model("driver", driverSchema,"Drivers");

module.exports = Driver;