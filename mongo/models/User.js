const { Schema, model, Types, Mongoose } = require("mongoose");

const userSchema = new Schema(
    {
        
        type_of_user: {
            type: String,
        },
        first_name: {
            type: String,
        },
        second_name: {
            type: String,
        },
        company_name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
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
        duns: {
            type: String,
        }
    }
)

const User = model("user", userSchema,"Users")

module.exports = User;