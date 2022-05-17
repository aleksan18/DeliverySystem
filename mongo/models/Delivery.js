const { Schema, model, Types, Mongoose } = require("mongoose");

const deliverySchema = new Schema( 
{
    sender:{
        type: Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: Types.ObjectId,
        ref: "User"
    },
    package:{
        weight:{
            type: Number,
        },
        height:{
            type: Number,
        },
        width:{
            type: Number,
        },
        depth:{
            type: Number,
        },
        fragile:{
            type: Boolean,
        },
        electronics:{
            type: Boolean,
        },
        oddsized:{
            type: Boolean,
        },
        
    },
    priority:{
        type: Boolean,
    },
    payment:{
        type_of_payment:{
            type: String,
        },
        amount:{
            type: Number,
        },
        payed:{
            type: Boolean,
        },
        perpaid:{
            type:Boolean,
        },
        transactionId: {
            type: String,
        },
        billing_adress: {
            type: String,
        }

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
    date_frame:{
        estimated_date:{
            type: Date,
        },
        start_date:{
            type: Date,
        },
        end_date:{
            type: Date,
        }
    },
    uid:{
        type: Types.ObjectId,
    },
    message:{
        type: String,
    },
    
}
)

const Delivery = model("delivery", deliverySchema,"Deliveries");

module.exports = Delivery;