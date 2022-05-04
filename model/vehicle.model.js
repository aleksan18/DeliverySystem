const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const {execute} = require("../database/mysql.connector.js");
const {checker} = require("../utility/argumentChecker");

class Vehicle {
    #idvehicles;
    #type_of_vehicles_idtype_of_vehicles ;
    #identifier ;
    #storage_size ;
    #free;
    constructor(
        idvehicles=Number,
        type_of_vehicles_idtype_of_vehicles=Number,
        identifier=String,
        storage_size=Number,
        free=Boolean,
   ){
       this.#idvehicles = idvehicles;
       this.#type_of_vehicles_idtype_of_vehicles = type_of_vehicles_idtype_of_vehicles;
       this.#identifier = identifier;
       this.#storage_size = storage_size;
       this.#free =free;
   }
    /**
    * Getters and Setters for the private fields
    */
    getIdVehicles () { return this.#idvehicles}
    setIdVehicles (value) { this.#idvehicles=value; }
    
    getTypeOfVehicle () { return this.#type_of_vehicles_idtype_of_vehicles}
    setTypeOfVehicle(value){ this.#type_of_vehicles_idtype_of_vehicles=value}
    
    getIdentifier () { return this.#identifier}
    setIdentifier(value) { this.#identifier=value}

    getStorageSize () { return this.#storage_size}
    setStorageSize(value){ this.#storage_size=value}
    
    getFree () { return this.#free}
    setFree(value) { this.#free=value}
    equals(delivery=Vehicle){
        return delivery.getidvehicles()=== this.#idvehicles &&
                delivery.getTypeOfVehicle() === this.#type_of_vehicles_idtype_of_vehicles &&
                delivery.getIdentifier() === this.#identifier &&
                delivery.getStorageSize() === this.#storage_size &&
                delivery.getFree() === this.#free 
    }
    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Vehicle
    */
    /**
     * Gets an array, every item in the array is an instance of Vehicle class
     * 
     */
    static async getAllVehicles (){
    const response = await execute("SELECT * FROM vehicles",[]);
    return response.map(v => new Vehicle(v.idvehicles,
        v.type_of_vehicles_idtype_of_vehicles,
        v.identifier,
        v.storage_size,
        v.free));
    }
    /**
     * The function get a 1 delivery from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getVehicle(id=Number) {
        
        const response= await execute("SELECT * FROM vehicles WHERE idvehicles=?",[`${id}`])
        
        return new Vehicle(response[0].idvehicles,response[0].type_of_vehicles_idtype_of_vehicles,response[0].identifier,response[0].storage_size,response[0].free)
    
    }
    /**
     * 
     * @returns 
     */
    static async updateVehicle (
        newVehicle= Vehicle
    ) {
        const getUpdatedVehicle = await execute("SELECT * FROM vehicles WHERE idvehicles=?",[`${newVehicle.getIdVehicles()}`])
        if (!newVehicle.equals(getUpdatedVehicle[0])) {
            const response = await execute(
                "UPDATE vehicles"
                +" SET type_of_vehicles_idtype_of_vehicles=?,identifier=?,storage_size=?,free=? WHERE idvehicles=?"
                ,[`${newVehicle.getTypeOfVehicle()}`
                ,`${newVehicle.getIdentifier()}`,
                `${newVehicle.getStorageSize()}`,
                `${newVehicle.getFree()}`,
                `${newVehicle.getIdVehicles()}`])
            return new Vehicle(getUpdatedVehicle[0].idvehicles,getUpdatedVehicle[0].type_of_vehicles_idtype_of_vehicles,getUpdatedVehicle[0].identifier,getUpdatedVehicle[0].storage_size,getUpdatedVehicle[0].free,)
        }else{
            return "Vehicle was not updated, because the vehicle info is the same"
        }
       
    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Vehicle from the database with
     * @returns the deleted Vehicle item and if it was successful
     */
    static async deleteVehicle  (id=Number) {
        const getDeletedDelivery = await execute("SELECT from vehicles Where idvehicles=",[`${id}`]);
        const response = await execute("DELETE from vehicles Where idvehicles=",[`${id}`]);
        return new Vehicle(
            getDeletedDelivery[0].idvehicles,
            getDeletedDelivery[0].type_of_vehicles_idtype_of_vehicles,
            getDeletedDelivery[0].identifier,
            getDeletedDelivery[0].storage_size,
            getDeletedDelivery[0].free)
    }
      /**
     * Creates a new Vehicle entry in the database
     * @param {Vehicle} newVehicle Provide the new Vehicle to create in the database 
     * @returns  Return the newly created Vehicle
     */
       static async createVehicle (
        newVehicle= Vehicle
    ) {
        const response = await execute("INSERT INTO vehicles (type_of_vehicles_idtype_of_vehicles,identifier,storage_size,free)"
        +"VALUES(?,?,?,?)",
        [`${newVehicle.getTypeOfVehicle}`
        `${newVehicle.getIdentifier()}`,
        `${newVehicle.getStorageSize()}`,
        `${newVehicle.getFree()}`,])
        return newVehicle;
    }
}
module.exports={
  Vehicle  
};