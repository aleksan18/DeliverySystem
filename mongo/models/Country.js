const { Schema, model, Types, Mongoose } = require("mongoose");

const countrySchema = new Schema( 
{
    name: {
        type: String,
    },
    city:[
        {
            city:{
                type: String,
            },
            zip_codes: [
                {
                    type: Number,
                }
            ]
        }
    ],
})

const Country = model("country", countrySchema,"Countries");

module.exports = Country;