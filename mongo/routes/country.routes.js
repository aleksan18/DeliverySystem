const { Router } = require("express");

const Country = require("../models/Country")

const router = Router()
router.get("/getCountries",async(req,res)=>{

    try {
        const allCountries = await Country.find({});
        // const updatedOrder = await C.findByIdAndUpdate(order._id, order, { new: true });
        //console.log(updatedOrder);
        return res.status(200).json(allCountries);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
  })

  router.post("/getCountry", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const { id } = req.body
        const country = await Country.findOne({ id });
        const size = new TextEncoder().encode(JSON.stringify(country)).length
        console.log("country from db size ", size)
        return res.status(200).json(country);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/createCountry", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { country } = req.body
        const createdCountry = new Country({ name: country.name, city: country.city});
        await createdCountry.save();

        //1 new city with 10 zipCodes is 117 bytes
        //1 zip code in city is 5.53 bytes  
        const size = new TextEncoder().encode(JSON.stringify(createdCountry)).length
        const size2 = Buffer.byteLength(JSON.stringify(createdCountry))
        console.log("created country size: ", size)
        console.log("created country size 2 : ", size2)
        if (createdCountry) {
            return res.status(200).json({ createdCountry });
        } else {
            return res.status(500).json({ createdCountry }); 
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/updateCountry", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { country } = req.body
        console.log(req.body)
        const updatedCountry = await Country.findOneAndUpdate(country._id, country, { new: true })
        if (updatedCountry) {
            return res.status(200).json({ countryUpdated: true });
        } else {
            return res.status(500).json({ countryUpdated: false });
        }
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

  module.exports = router;