const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const {execute} = require("../database/mysql.connector.js");
class Driver {
    #idemployees;
    #firstname ;
    #secondname ;
    #email ;
    #phone;
    #free ;
    constructor(
        idemployees= Number,
        firstname= String,
        secondname= String,
        email= String,
        phone= String,
        free= Boolean,
   ){
       this.#idemployees = idemployees;
       this.#firstname = firstname;
       this.#secondname = secondname;
       this.#email = email;
       this.#phone=phone;
       this.#free =free;  
   }
    /**
    * Getters and Setters for the private fields
    */
    getIdEmployees () { return this.#idemployees}
    setIdEmployees (value) { this.#idemployees=value; }
    
    getFirstName () { return this.#firstname}
    setFirstName(value) { this.#firstname=value}

    getSecondName () { return this.#secondname}
    setSecondName(value){ this.#secondname=value}

    getEmail () { return this.#email}
    setEmail(value) { this.#email=value}

    getPhone() { return this.#phone}
    setPhone(value){ this.#phone=value}

    getFree(){return this.#free}
    setFree(value){ this.#free=value}
    equals(driver=new Driver){
        return  driver.getIdEmployees() === this.#idemployees&&
                driver.getFirstName() === this.#firstname&&
                driver.getSecondName() === this.#secondname &&
                driver.getEmail() === this.#email &&
                driver.getPhone() === this.#phone &&
                driver.getFree() === this.#free
    }
    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Driver
    */
    /**
     * Gets an array, every item in the array is an instance of driver class
     * 
     */
    static async getAllDrivers (){
    const response = await execute("SELECT * FROM driver",[]);
    return response.map(v => new Driver(
        v.idemployees,
        v.firstname,
        v.secondname,
        v.email,
        v.phone,
        v.free));
    }
    /**
     * The function get a 1 driver from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getDriver(id=Number) {
        
        const response= await execute("SELECT * FROM driver WHERE idemployees=?",[`${id}`])
        
        return new Driver(
            response[0].idemployees,
            response[0].firstname,
            response[0].secondname,
            response[0].email,
            response[0].phone,
            response[0].free)
    
    }
    /**
     * 
     * @returns 
     */
    static async updateDriver (
        newDriver= Driver
    ) {
        const getUpdatedDriver = await execute("SELECT * FROM driver WHERE idemployees=?",[`${newDriver.getIdEmployees()}`])
        if (!newDriver.equals(getUpdatedDriver[0])) {
            const response = await execute(
                "UPDATE Driver"
                +"SET firstname=?,secondname=?,email=?,phone=?,free=? WHERE idemployees=?"
                ,[`${newUser.getFirstName()}`
                ,`${newUser.getSecondName()}`,
                `${newUser.getEmail()}`,
                `${newUser.getPhone()}`,
                `${newUser.getFree()}`,
                `${newDriver.getIdEmployees()}`])
            return new Driver(
                getUpdatedDriver[0].idemployees,
                getUpdatedDriver[0].firstname,
                getUpdatedDriver[0].secondname,
                getUpdatedDriver[0].email,
                getUpdatedDriver[0].phone,
                getUpdatedDriver[0].free)
        }{
            return "Driver was not updated, because the driver info is the same"
        }
       
    }
    /**
     * 
     * @param {number} id provide the id with which to delete a driver from the database with
     * @returns the deleted driver item and if it was successful
     */
    static async deleteDriver  (id = Number) {
        const getDeletedDriver = await execute("SELECT from driver Where idemployees=",[`${id}`]);
        const response = await execute("DELETE from driver Where idemployees=",[`${id}`]);
        return new Driver(
            getDeletedDriver[0].idemployees,
            getDeletedDriver[0].firstname,
            getDeletedDriver[0].secondname,
            getDeletedDriver[0].email,
            getDeletedDriver[0].phone,
            getDeletedDriver[0].free)
    }
    /**
     * Creates a new Driver entry in the database
     * @param {Driver} newDriver Provide the new Driver to create in the database 
     * @returns  Return the newly created Driver
     */
    static async createDriver (
        newDriver=  Driver
    ) {
        const response = await execute("INSERT INTO Driver (firstname,secondname,email,phone,free)"
        +"VALUES(?,?,?,?,?)",
        [`${newUser.getFirstName()}`,
        `${newUser.getSecondName()}`,
        `${newUser.getEmail()}`,
        `${newUser.getPhone()}`,
        `${newUser.getFree()}`,])
        return newDriver;
    }
}
module.exports={
  Driver  
};