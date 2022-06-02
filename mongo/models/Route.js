const { Schema, model, Types } = require("mongoose");

const routeSchema = new Schema(
    {
       vehicle:{
           type: Types.ObjectId,
       },
       route_type:{
           type: String,
       },
       start_location:{
            country_id: {
                type: Types.ObjectId,
            },
            city_id: {
                type: Types.ObjectId,
            },
            zip_code: {
                type: Number,
            },
            address: {
                type: String,
            },
       },
       end_location:{
            country_id: {
                type: Types.ObjectId,
            },
            city_id: {
                type: Types.ObjectId,
            },
            zip_code: {
                type: Number,
            },
            address: {
                type: String,
            },
       },
       international:{
           type: Boolean,
       }, 
       delivery:{
           type: Types.ObjectId,
       }, 
       start_date:{
           type: Date,
       },
       end_date:{
           type: Date,
       }, 
       route_order:{
           type: Number,
       }, 
    }
)

const Route = model("route", routeSchema,"Routes");

module.exports = Route;