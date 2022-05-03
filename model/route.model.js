const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const {execute} = require("../database/mysql.connector.js");
const {checker} = require("../utility/argumentChecker");

class Route {
    #idroutes;
    #vehicles_idvehicles ;
    #employees_idemployees ;
    #typeofroute_idtypeofroute ;
    #start_location ;
    #end_location ;
    #international;
    #deliveries_iddeliveries ;
    #route_order ;
    #start_date;
    #end_date;
    constructor(
        idroutes=Number,
        vehicles_idvehicles=Number,
        employees_idemployees=Number,
        typeofroute_idtypeofroute=Number,
        start_location=Number,
        end_location=Number,
        international=Boolean,
        deliveries_iddeliveries=Number,
        route_order=Number,
        start_date=DATETIME,
        end_date=DATETIME,
   ){
       this.#idroutes = idroutes;
       this.#vehicles_idvehicles = vehicles_idvehicles;
       this.#employees_idemployees = employees_idemployees;
       this.#typeofroute_idtypeofroute = typeofroute_idtypeofroute;
       this.#start_location =start_location;
       this.#end_location = end_location;
       this.#international=international;
       this.#deliveries_iddeliveries = deliveries_iddeliveries;
       this.#route_order = route_order;
       this.#start_date = start_date;
       this.#end_date = end_date;
   }
    /**
    * Getters and Setters for the private fields
    */
    getIdRoutes () { return this.#idroutes}
    setIdRoutes (value) { this.#idroutes=value; }
    
    getIdVehicle () { return this.#vehicles_idvehicles}
    setIdVehicle(value){ this.#vehicles_idvehicles=value}
    
    getIdEmployees () { return this.#employees_idemployees}
    setIdEmployees(value) { this.#employees_idemployees=value}

    getTypeOfRoute () { return this.#typeofroute_idtypeofroute}
    setTypeOfRoute(value){ this.#typeofroute_idtypeofroute=value}
    
    getStartLocation () { return this.#start_location}
    setStartLocation(value) { this.#start_location=value}

    getEndLocation () { return this.#end_location}
    setEndLocation(value) { this.#end_location=value}

    getInternational() { return this.#international}
    setInternational(value){ this.#international=value}

    getDeliveries(){return this.#deliveries_iddeliveries}
    setDeliveries(value){ this.#deliveries_iddeliveries=value}

    getRouteOrder(){return this.#route_order}
    setRouteOrder(value){this.#route_order=value}

    getStartDate(){return this.#start_date}
    setStartDate(value){this.#start_date=value}

    getEndDate(){return this.#end_date}
    setEndDate(value){this.#end_date=value}
    equals(route= new Route){
        return route.getIdRoutes === this.#idroutes &&
                route.getIdVehicle=== this.#vehicles_idvehicles &&
                route.getIdEmployees === this.#employees_idemployees &&
                route.getTypeOfRoute ===this.typeofroute_idtypeofroute &&
                route.getStartLocation() === this.#start_location &&
                route.getEndLocation() === this.#end_location &&
                route.getInternational() === this.#international &&
                route.getDeliveries === this.#deliveries_iddeliveries &&
                route.getRouteOrder === this.#route_order &&
                route.getStartDate() === this.#start_date &&
                route.getEndDate() === this.#end_date
    }
    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Route
    */
    /**
     * Gets an array, every item in the array is an instance of Route class
     * 
     */
    static async getAllRoutes (){
    const response = await execute("SELECT * FROM routes",[]);
    return response.map(v => Object.assign(new Route(), v));
    }
    /**
     * The function get a 1 routes from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getRoute(id=Number) {
        
        const response= await execute("SELECT * FROM routes WHERE idroutes=?",[`${id}`])
        
        return Object.assign(new Route(),response[0])
    
    }
    /**
     * 
     * @returns 
     */
    static async updateRoute (
        newRoute=new Route
    ) {
        const getUpdatedRoute = await execute("SELECT * FROM routes WHERE idroutes=?",[`${newRoute.getIdRoutes()}`])
        if (newRoute.equals(getUpdatedRoute[0])) {
            const response = await execute(
                "UPDATE routes"
                +"SET vehicles_idvehicles=?,employees_idemployees=?,typeofroute_idtypeofroute=?,start_location=?,end_location=?,international=?,deliveries_iddeliveries=?,route_order=?,start_date=?,end_date=? WHERE idroutes=?"
                ,[`${newRoute.getIdVehicle()}`,
                `${newRoute.getIdEmployees()}`,
                `${newRoute.getTypeOfRoute()}`,
                `${newRoute.getStartLocation()}`,
                `${newRoute.getEndLocation()}`,
                `${newRoute.getInternational()}`,
                `${newRoute.getDeliveries()}`,
                `${newRoute.getRouteOrder()}`
                `${newRoute.getStartDate()}`,
                `${newRoute.getEndDate()}`,
                `${newRoute.getIdRoutes}`])
            console.log(response);
            return Object.assign(new Route(),getUpdatedRoute[0])
        }
    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Route from the database with
     * @returns the deleted Route item and if it was successful
     */
    static async deleteRoute  (id=Number) {
        const getDeletedroutes = await execute("SELECT from routes Where idroutes=",[`${id}`]);
        const response = await execute("DELETE from routes Where idroutes=",[`${id}`]);
        return Object.assign(new Route(),getDeletedroutes[0])
    }
    /**
     * Creates a new Route entry in the database
     * @param {Route} newRoute Provide the new Route to create in the database 
     * @returns  Return the newly created Route
     */
     static async createRoutes (
        newRoute=new Route
    ) {
        const response = await execute("INSERT INTO Routes(vehicles_idvehicles,employees_idemployees,typeofroute_idtypeofroute,start_location,end_location,international,deliveries_iddeliveries,route_order,start_date,end_date)"
        +"VALUES(?,?,?,?,?,?,?,?,?,?)",
        [`${newRoute.getIdVehicle()}`,
        `${newRoute.getIdEmployees()}`,
        `${newRoute.getTypeOfRoute()}`,
        `${newRoute.getStartLocation()}`,
        `${newRoute.getEndLocation()}`,
        `${newRoute.getInternational()}`,
        `${newRoute.getDeliveries()}`,
        `${newRoute.getRouteOrder()}`
        `${newRoute.getStartDate()}`,
        `${newRoute.getEndDate()}`,])
        console.log(response);
        return newRoute;
    }
}
module.exports={
  Route  
};