const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator")
const { execute } = require("../database/mysql.connector")
const { Route } = require("../model/route.model")

router.post("/addRoute", async (req, res) => {
    console.log("req.body in /addRoute ", req.body)
    const {
        idroutes,
        vehicles_idvehicles,
        employees_idemployees,
        typeofroute_idtypeofroute,
        start_location,
        end_location,
        international,
        deliveries_iddeliveries,
        route_order,
        start_date,
        end_date,
    } = req.body;


    const newRoute = new Route(
        idroutes,
        vehicles_idvehicles,
        employees_idemployees,
        typeofroute_idtypeofroute,
        start_location,
        end_location,
        international,
        deliveries_iddeliveries,
        route_order,
        start_date,
        end_date,
    )
    console.log("newRoute inside /addRoute", newRoute.toString())
    
    // const response = await Route.createRoute(newRoute);
    // example of what Delivery.createDelivery() should return 
    // OkPacket {
    //     fieldCount: 0,
    //     affectedRows: 1,
    //     insertId: 14,
    //     serverStatus: 2,
    //     warningCount: 0,
    //     message: '',
    //     protocol41: true,
    //     changedRows: 0
    //   }
    // values can be accessed through response.insertId
    return res.status(200).json({ response });
    newRoute.setIdRoutes(response.insertId)
    if (response.affectedRows > 0) {

    } else {
        return res.status(500).json({ response: { message: "Internal Server Error" } });
    }
    // console.log("response from createDelivery inside /addWholeDelivery", response)
})

router.get("/", async (req, res) => {
    const response = await Route.getAllRoutes()
    // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    return res.json({ response });
})


module.exports = router;

