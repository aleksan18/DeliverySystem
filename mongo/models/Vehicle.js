const { Schema, model } = require("mongoose");

const vehicleSchema = new Schema( 
{
    type: {
        type: String,
    },
    identifier:{
        type: String,
    },
    storage_size:{
        type: Number,
    },
    free:{
        type:Boolean,
    }
}
)

const Vehicle = model("vehicle", vehicleSchema,"Vehicles");

module.exports = Vehicle;