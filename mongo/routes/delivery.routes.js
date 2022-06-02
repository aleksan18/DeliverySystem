const { Router } = require("express");
const  mongoose  = require("mongoose")
const Delivery = require("../models/Delivery")
const User = require("../models/User")

const router = Router()
router.get("/getDeliveries",async(req,res)=>{

    try {
        const allDeliveries = await Delivery.find({});
        // const updatedOrder = await C.findByIdAndUpdate(order._id, order, { new: true });
        //console.log(updatedOrder);
        return res.status(200).json(allDeliveries);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
  })

  router.post("/getDelivery", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const { id } = req.body
        const delivery = await Delivery.findOne({ _id: id });
        return res.status(200).json(delivery);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/createDelivery", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { delivery } = req.body
        
        const createdDelivery = new Delivery({ sender: delivery.sender, receiver: delivery.receiver, package: delivery.package, priority: delivery.priority, payment: delivery.payment, start_location: delivery.start_location, end_location: delivery.end_location, date_frame: delivery.date_frame, message: delivery.message});
        
        //await createdDelivery.save();
        //1 delivery size is 808
        const size = new TextEncoder().encode(JSON.stringify(createdDelivery)).length
        const size2 = Buffer.byteLength(JSON.stringify(createdDelivery))
        console.log("Delivery size: ", size)
        console.log("Delivery size 2: ", size2)
        if (createdDelivery) {
            return res.status(200).json({ createdDelivery });
        } else {
            return res.status(500).json({ createdDelivery }); // actually I dont know what sata type will be createdStudent if saving fails
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/updateDelivery", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { delivery } = req.body
        const updatedDelivery = await Delivery.findOneAndUpdate(delivery._id, delivery, { new: true })
        if (updatedDelivery) {
            return res.status(200).json({ deliveryUpdated: true });
        } else {
            return res.status(500).json({ deliveryUpdated: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/createDeliveryAndUser", async (req,res)=>{
    //let session = null
    const db = await mongoose.createConnection("mongodb+srv://onixapple:12341234@cluster0.1buri.mongodb.net/Delivery_sistem").asPromise();
    console.log("db:",db)
    console.log("db:",typeof db)

    const session = await db.startSession();
// Using custom connection
    const {user,delivery} = req.body
    //const createdDelivery = new Delivery({ sender: delivery.sender, receiver: delivery.receiver, package: delivery.package, priority: delivery.priority, payment: delivery.payment, start_location: delivery.start_location, end_location: delivery.end_location, date_frame: delivery.date_frame, message: delivery.message});
    const createdUser = new User({ type_of_user: user.type_of_user, first_name: user.first_name, second_name: user.second_name, company_name: user.company_name, email: user.email, phone: user.phone, address: user.address, duns: user.duns});       
    console.log("delivery,body", req.body)
    console.log("delivery,body user id ", createdUser._id)
    return session.withTransaction( async () => {

                const createUser =  await User.create([createdUser], { session: session });
                const deliveri = new Delivery({ sender: createUser[createUser.length-1]._id, receiver: delivery.receiver, package: delivery.package, priority: delivery.priority, payment: delivery.payment, start_location: delivery.start_location, end_location: delivery.end_location, date_frame: delivery.date_frame, message: delivery.message});
                const createDelivery = await Delivery.create([{undefined}],{ session: session })
                console.log("created user:",createUser)
                console.log("deliveri:",deliveri)
                console.log("created user ID:",createUser._id)
                console.log("created DelicreateDelivery:",createDelivery)
               
            }).
        then(() => session.endSession());
})

  module.exports = router;