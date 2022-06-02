const { Router } = require("express");

const Route = require("../models/Route")

const router = Router()
router.get("/getRoutes",async(req,res)=>{

    try {
        const allRoutes = await Route.find({});
        // const updatedOrder = await C.findByIdAndUpdate(order._id, order, { new: true });
        //console.log(updatedOrder);
        return res.status(200).json(allRoutes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
  })

  router.post("/getRoute", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const { id } = req.body
        const route = await Route.findOne({ id });
        return res.status(200).json(route);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/createRoute", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { route } = req.body
        const createdRoute = new Route({ vehicle: route.vehicle, route_type: route.route_type, start_location: route.start_location, end_location: route.end_location, international: route.international, delivery: route.delivery, start_date: route.start_date, end_date: route.end_date, route_order: route.route_order});
        await createdRoute.save();
        const size = new TextEncoder().encode(JSON.stringify(createdRoute)).length
        const size2 = Buffer.byteLength(JSON.stringify(createdRoute))
        console.log("Route size: ", size)
        console.log("Route size 2: ", size2)
        
        if (createdRoute) {
            return res.status(200).json({ createdRoute });
        } else {
            return res.status(500).json({ createdRoute }); // actually I dont know what sata type will be createdStudent if saving fails
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/updateRoute", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { route } = req.body
        const updatedRoute = await Route.findOneAndUpdate(route._id, route, { new: true })
        if (updatedRoute) {
            return res.status(200).json({ routeUpdated: true });
        } else {
            return res.status(500).json({ routeUpdated: false });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

  module.exports = router;