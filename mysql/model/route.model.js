const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../database/mysql.connector.js");

class Route {
    idroutes;
    vehicles_idvehicles;
    employees_idemployees;
    typeofroute_idtypeofroute;
    start_location;
    end_location;
    international;
    deliveries_iddeliveries;
    route_order;
    start_date;
    end_date;
    constructor(
        idroutes = Number,
        vehicles_idvehicles = Number,
        employees_idemployees = Number,
        typeofroute_idtypeofroute = Number,
        start_location = Number,
        end_location = Number,
        international = Boolean,
        deliveries_iddeliveries = Number,
        route_order = Number,
        start_date = DATETIME,
        end_date = DATETIME,
    ) {
        this.idroutes = idroutes;
        this.vehicles_idvehicles = vehicles_idvehicles;
        this.employees_idemployees = employees_idemployees;
        this.typeofroute_idtypeofroute = typeofroute_idtypeofroute;
        this.start_location = start_location;
        this.end_location = end_location;
        this.international = international;
        this.deliveries_iddeliveries = deliveries_iddeliveries;
        this.route_order = route_order;
        this.start_date = start_date;
        this.end_date = end_date;
    }
    /**
    * Getters and Setters for the private fields
    */
    getIdRoutes() { return this.idroutes }
    setIdRoutes(value) { this.idroutes = value; }

    getIdVehicle() { return this.vehicles_idvehicles }
    setIdVehicle(value) { this.vehicles_idvehicles = value }

    getIdEmployees() { return this.employees_idemployees }
    setIdEmployees(value) { this.employees_idemployees = value }

    getTypeOfRoute() { return this.typeofroute_idtypeofroute }
    setTypeOfRoute(value) { this.typeofroute_idtypeofroute = value }

    getStartLocation() { return this.start_location }
    setStartLocation(value) { this.start_location = value }

    getEndLocation() { return this.end_location }
    setEndLocation(value) { this.end_location = value }

    getInternational() { return this.international }
    setInternational(value) { this.international = value }

    getDeliveries() { return this.deliveries_iddeliveries }
    setDeliveries(value) { this.deliveries_iddeliveries = value }

    getRouteOrder() { return this.route_order }
    setRouteOrder(value) { this.route_order = value }

    getStartDate() { return this.start_date }
    setStartDate(value) { this.start_date = value }
    getStartDateInSqlFormat() {
        const year = this.start_date.getFullYear()
        const month = ((this.start_date.getMonth() + 1) >= 10) ? `${this.start_date.getMonth() + 1}` : `0${this.start_date.getMonth() + 1}`
        const date = (this.start_date.getDate() >= 10) ? `${this.start_date.getDate()}` : `0${this.start_date.getDate()}`
        const hours = (this.start_date.getHours() >= 10) ? `${this.start_date.getHours()}` : `0${this.start_date.getHours()}`
        const minutes = (this.start_date.getMinutes() >= 10) ? `${this.start_date.getMinutes()}` : `0${this.start_date.getMinutes()}`
        const seconds = (this.start_date.getSeconds() >= 10) ? `${this.start_date.getSeconds()}` : `0${this.start_date.getSeconds()}`
        // YYYY-MM-DD HH:MI:SS
        console.log("getStartDateInSqlFormat() > this.start_date: ", this.start_date)
        console.log("getStartDateInSqlFormat() > this.start_date.getMonth: ", this.start_date.getMonth())
        console.log("getStartDateInSqlFormat() > this.start_date.ISO: ", this.start_date.toISOString())
        console.dir(this.start_date)
        const res = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
        console.log("getStartDateInSqlFormat() > res: ", res)
        return res
    }

    getEndDate() { return this.end_date }
    setEndDate(value) { this.end_date = value }
    getEndDateInSqlFormat() {
        const year = this.end_date.getFullYear()
        const month = ((this.end_date.getMonth() + 1) >= 10) ? `${this.end_date.getMonth() + 1}` : `0${this.end_date.getMonth() + 1}`
        const date = (this.end_date.getDate() >= 10) ? `${this.end_date.getDate()}` : `0${this.end_date.getDate()}`
        const hours = (this.end_date.getHours() >= 10) ? `${this.end_date.getHours()}` : `0${this.end_date.getHours()}`
        const minutes = (this.end_date.getMinutes() >= 10) ? `${this.end_date.getMinutes()}` : `0${this.end_date.getMinutes()}`
        const seconds = (this.end_date.getSeconds() >= 10) ? `${this.end_date.getSeconds()}` : `0${this.end_date.getSeconds()}`
        // Date format that Mysql expects to receive: YYYY-MM-DD HH:MI:SS 
        console.log("getEndDateInSqlFormat() > this.end_date: ", this.end_date)
        console.log("getEndDateInSqlFormat() > this.end_date.getMonth: ", this.end_date.getMonth())
        console.log("getEndDateInSqlFormat() > this.end_date.ISO: ", this.end_date.toISOString())
        console.dir(this.end_date)
        const res = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
        console.log("getEndDateInSqlFormat() > res: ", res)
        return res
    }

    equals(route = new Route) {
        const isEqual = route.getIdRoutes() == this.idroutes &&
            route.getIdVehicle() == this.vehicles_idvehicles &&
            route.getIdEmployees() == this.employees_idemployees &&
            route.getTypeOfRoute() == this.typeofroute_idtypeofroute &&
            route.getStartLocation() == this.start_location &&
            route.getEndLocation() == this.end_location &&
            route.getInternational() == this.international &&
            route.getDeliveries() == this.deliveries_iddeliveries &&
            route.getRouteOrder() == this.route_order &&
            route.getStartDate().toString() == this.start_date.toString() &&
            route.getEndDate().toString() == this.end_date.toString()

        // console.log(`route.getStartDate(): ${route.getStartDate()}, this.start_date: ${this.start_date}`);
        // console.log(`typeof route.start_date: ${typeof route.start_date}, typeof this.start_date: ${typeof this.start_date}`);
        // console.log(`route.getEndDate(): ${route.getEndDate()}, this.end_date: ${this.end_date}`);
        // console.log(` route.getStartDate().toString() == this.start_date.toString(): ${route.getStartDate().toString() == this.start_date.toString()}`);
        // console.log(`route: `);
        // console.dir(route);
        // console.log(`route.getStartDateInSqlFormat(): `);
        // console.dir(route.getStartDateInSqlFormat());
        // console.log(`route.getEndDateInSqlFormat(): `);
        // console.dir(route.getEndDateInSqlFormat());
        // console.log("isEqual: ", isEqual);
        return isEqual
    }

    toString() {
        return `idroutes=${this.idroutes}, vehicles_idvehicles= ${this.vehicles_idvehicles}, ` +
            `employees_idemployees= ${this.employees_idemployees}, typeofroute_idtypeofroute= ${this.typeofroute_idtypeofroute}, ` +
            `start_location= ${this.start_location}, end_location= ${this.end_location}, international= ${this.international}, ` +
            `deliveries_iddeliveries= ${this.deliveries_iddeliveries}, route_order= ${this.route_order}, ` +
            `start_date= ${this.start_date}, end_date= ${this.end_date}`
    }
    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Route
    */
    /**
     * Gets an array, every item in the array is an instance of Route class
     * 
     */
    static async getAllRoutes() {
        try {
            const response = await execute("SELECT * FROM routes", []);
            return response.map(v =>
                new Route(
                    v.idroutes,
                    v.vehicles_idvehicles,
                    v.employees_idemployees,
                    v.typeofroute_idtypeofroute,
                    v.start_location,
                    v.end_location,
                    v.international,
                    v.deliveries_iddeliveries,
                    v.route_order,
                    v.start_date,
                    v.end_date));
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     * The function get a 1 routes from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getRoute(id = Number) {
        try {
            const response = await execute("SELECT * FROM routes WHERE idroutes=?", [`${id}`])

            return new Route(
                response[0].idroutes,
                response[0].vehicles_idvehicles,
                response[0].employees_idemployees,
                response[0].typeofroute_idtypeofroute,
                response[0].start_location,
                response[0].end_location,
                response[0].international,
                response[0].deliveries_iddeliveries,
                response[0].route_order,
                response[0].start_date,
                response[0].end_date)
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }


    }
    /**
     * 
     * @returns 
     */
    static async updateRoute(
        updatedRoute = Route
    ) {
        try {
            const routeFromDB = await execute("SELECT * FROM routes WHERE idroutes=?", [`${updatedRoute.getIdRoutes()}`])
            console.log("updateRoute > routeFromDB: ", routeFromDB)
            const receivedRoute = new Route(
                routeFromDB[0].idroutes,
                routeFromDB[0].vehicles_idvehicles,
                routeFromDB[0].employees_idemployees,
                routeFromDB[0].typeofroute_idtypeofroute,
                routeFromDB[0].start_location,
                routeFromDB[0].end_location,
                routeFromDB[0].international,
                routeFromDB[0].deliveries_iddeliveries,
                routeFromDB[0].route_order,
                routeFromDB[0].start_date,
                routeFromDB[0].end_date)
            console.log("updateRoute > updatedRoute: ", updatedRoute)
            console.log("updateRoute > receivedRoute: ", receivedRoute)
            if (!updatedRoute.equals(receivedRoute)) {
                const response = await execute(
                    "UPDATE routes "
                    + "SET vehicles_idvehicles=?,employees_idemployees=?,typeofroute_idtypeofroute=?,start_location=?,end_location=?,international=?,deliveries_iddeliveries=?,route_order=?,start_date=?,end_date=? WHERE idroutes=?;"
                    , [updatedRoute.getIdVehicle(),
                    updatedRoute.getIdEmployees(),
                    updatedRoute.getTypeOfRoute(),
                    updatedRoute.getStartLocation(),
                    updatedRoute.getEndLocation(),
                    updatedRoute.getInternational(),
                    updatedRoute.getDeliveries(),
                    updatedRoute.getRouteOrder(),
                    updatedRoute.getStartDateInSqlFormat(),
                    updatedRoute.getEndDateInSqlFormat(),
                    updatedRoute.getIdRoutes()])
                console.log("Inside Route Model > updateRoute > response: ", response);
                if (response.changedRows > 0) {
                    return { routeInfoIsSame: false, updatedRoute }
                } else {
                    return { routeInfoIsSame: false, updatedRoute: undefined };
                }

            } else {
                return { routeInfoIsSame: true, updatedRoute }
            }
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Route from the database with
     * @returns the deleted Route item and if it was successful
     */
    static async deleteRoute(id = Number) {
        try {
            const getDeletedroutes = await execute("SELECT from routes Where idroutes=", [`${id}`]);
            const response = await execute("DELETE from routes Where idroutes=", [`${id}`]);
            return new Route(
                getDeletedroutes[0].idroutes,
                getDeletedroutes[0].vehicles_idvehicles,
                getDeletedroutes[0].employees_idemployees,
                getDeletedroutes[0].typeofroute_idtypeofroute,
                getDeletedroutes[0].start_location,
                getDeletedroutes[0].end_location,
                getDeletedroutes[0].international,
                getDeletedroutes[0].deliveries_iddeliveries,
                getDeletedroutes[0].route_order,
                getDeletedroutes[0].start_date,
                getDeletedroutes[0].end_date)
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     * Creates a new Route entry in the database
     * @param {Route} newRoute Provide the new Route to create in the database 
     * @returns  Return the newly created Route
     */
    static async createRoute(
        newRoute = Route
    ) {
        try {
            const response = await execute("INSERT INTO routes(vehicles_idvehicles,employees_idemployees,typeofroute_idtypeofroute,start_location,end_location,international,deliveries_iddeliveries,route_order,start_date,end_date) "
                + "VALUES (?,?,?,?,?,?,?,?,?,?);",
                [newRoute.getIdVehicle(),
                newRoute.getIdEmployees(),
                newRoute.getTypeOfRoute(),
                newRoute.getStartLocation(),
                newRoute.getEndLocation(),
                newRoute.getInternational(),
                newRoute.getDeliveries(),
                newRoute.getRouteOrder(),
                newRoute.getStartDate(),
                newRoute.getEndDate(),])
            console.log(response);
            if (response.affectedRows > 0) {
                newRoute.setIdRoutes(response.insertId);
                return { routeCreated: true, createdRoute: newRoute }
            } else {
                return { routeCreated: false };
            }
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
}
module.exports = {
    Route
};