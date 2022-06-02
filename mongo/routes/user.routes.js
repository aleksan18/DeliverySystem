const { Router } = require("express");
const { check, validationResult } = require("express-validator");

const User = require("../models/User")

const router = Router()
router.get("/getUsers",async(req,res)=>{

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const allUsers = await User.find({});
        // const updatedOrder = await C.findByIdAndUpdate(order._id, order, { new: true });
        //console.log(updatedOrder);
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
  })

  router.post("/getUser", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const { email } = req.body
        const user = await User.findOne({ email });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/createUser", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { user } = req.body
        const createdUser = new User({ type_of_user: user.type_of_user, first_name: user.first_name, second_name: user.second_name, company_name: user.company_name, email: user.email, phone: user.phone, address: user.address, duns: user.duns});
        await createdUser.save();
        const size = new TextEncoder().encode(JSON.stringify(createdUser)).length
        const size2 = Buffer.byteLength(JSON.stringify(createdUser))
        console.log("User size: ", size)
        console.log("User size 2: ", size2)

        if (createdUser) {
            return res.status(200).json({ createdUser });
        } else {
            return res.status(500).json({ createdUser }); // actually I dont know what sata type will be createdStudent if saving fails
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/updateUser", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { user } = req.body
        const updatedUser = await User.findOneAndUpdate(user._id, user, { new: true })
        if (updatedUser) {
            return res.status(200).json({ userUpdated: true });
        } else {
            return res.status(500).json({ userUpdated: false });
        }
        // .then(function (err, doc) {
        //     if (err) {
        //         console.log("inside student.routes.js > saveStudent > error: ", err);
        //         return res.status(500).json({ studentUpdated: false });
        //     } else {
        //         console.log("inside student.routes.js > saveStudent > all good:")
        //         return res.status(200).json({ studentUpdated: true });
        //     }
        // });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

  module.exports = router;