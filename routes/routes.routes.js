const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator")
const { execute } = require("../database/mysql.connector")
const { Route } = require("../model/route.model")

router.post("/addRoute", async (req, res) => {
    console.log("req.body in /addRoute ", req.body)
    const {
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
        null,
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
    const { routeCreated, createdRoute }     = await Route.createRoute(newRoute);
    if (routeCreated) {
        return res.status(200).json({ response: { createdRoute } });

    } else {
        return res.status(500).json({ response: { message: "Internal Server Error" } });
    }
})
router.post("/updateRoute", async (req, res) => {
    console.log("req.body in /updateRoute ", req.body)
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

    const route = new Route(
        idroutes,
        vehicles_idvehicles,
        employees_idemployees,
        typeofroute_idtypeofroute,
        start_location,
        end_location,
        international,
        deliveries_iddeliveries,
        route_order,
        new Date(start_date),
        new Date(end_date),
    )
    console.log("route inside /updateRoute", route.toString())
    const  { routeInfoIsSame, updatedRoute } = await Route.updateRoute(route);
    if (!routeInfoIsSame && typeof updatedRoute  === 'object') {
        return res.status(200).json({ response: updatedRoute });
    } else if (!routeInfoIsSame && updatedRoute  === undefined){
        return res.status(500).json({ response: { message: "Internal Server Error" } });
    } else if (routeInfoIsSame){
        return res.status(400).json({ response: updatedRoute, message: "Route was not updated, because the route info is the same" });
    }
    // console.log("response from createDelivery inside /addWholeDelivery", response)
})

router.get("/", async (req, res) => {
    const response = await Route.getAllRoutes()
    const resp = response[0].toString() 
    // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    return res.json({ resp });
})


module.exports = router;

