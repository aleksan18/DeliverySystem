const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../mysql/database/mysql.connector.js");

class Driver {
    idemployees;
    firstname;
    secondname;
    email;
    phone;
    free;
    constructor(
        idemployees = Number,
        firstname = String,
        secondname = String,
        email = String,
        phone = String,
        free = Boolean,
    ) {
        this.idemployees = idemployees;
        this.firstname = firstname;
        this.secondname = secondname;
        this.email = email;
        this.phone = phone;
        this.free = free;
    }
    /**
    * Getters and Setters for the private fields
    */
    getIdEmployees() { return this.idemployees }
    setIdEmployees(value) { this.idemployees = value; }

    getFirstName() { return this.firstname }
    setFirstName(value) { this.firstname = value }

    getSecondName() { return this.secondname }
    setSecondName(value) { this.secondname = value }

    getEmail() { return this.email }
    setEmail(value) { this.email = value }

    getFree() { return this.free }
    setFree(value) { this.free = value }

    equals(driver = new Driver) {
        return driver.getIdEmployees() == this.idemployees &&
            driver.getFirstName() == this.firstname &&
            driver.getSecondName() == this.secondname &&
            driver.getEmail() == this.email &&
            driver.getPhone() == this.phone &&
            driver.getFree() == this.free
    }


    toString() {
        return `idemployees= ${this.idemployees}, firstname= ${this.firstname}, ` +
            `secondname= ${this.secondname}, email= ${this.email}, ` +
            `phone= ${this.phone}, free= ${this.free}`
    }

    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Driver
    */
    /**
     * Gets an array, every item in the array is an instance of driver class
     * 
     */
    static async getAllDrivers() {
        try {
            const response = await execute("SELECT * FROM driver", []);
            return response.map(v => new Driver(
                v.idemployees,
                v.firstname,
                v.secondname,
                v.email,
                v.phone,
                v.free));
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     * The function get a 1 driver from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getDriver(id = Number) {
        try {
            const response = await execute("SELECT * FROM driver WHERE idemployees=?", [`${id}`])
            return new Driver(
                response[0].idemployees,
                response[0].firstname,
                response[0].secondname,
                response[0].email,
                response[0].phone,
                response[0].free)
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }


    }
    /**
     * Compares the new Driver to the existing one and if there are changes updates the database with the new driver.
     * @param {Driver} updatedDriver provide the updated driver with which to update the database
     * @returns the updated driver object
     */
    static async updateDriver(
        updatedDriver = Driver
    ) {
        try {
            const driverFromDB = await execute("SELECT * FROM driver WHERE idemployees=?", [`${updatedDriver.getIdEmployees()}`])
            const receivedDriver = Driver(
                driverFromDB[0].idemployees,
                driverFromDB[0].firstname,
                driverFromDB[0].secondname,
                driverFromDB[0].email,
                driverFromDB[0].phone,
                driverFromDB[0].free)

            if (!updatedDriver.equals(receivedDriver)) {
                const response = await execute(
                    "UPDATE driver "
                    + "SET firstname=?,secondname=?,email=?,phone=?,free=? WHERE idemployees=?;"
                    , [updatedDriver.getFirstName(),
                    updatedDriver.getSecondName(),
                    updatedDriver.getEmail(),
                    updatedDriver.getPhone(),
                    updatedDriver.getFree(),
                    updatedDriver.getIdEmployees()])
                if (response.changedRows > 0) {
                    return { driverInfoIsSame: false, updatedDriver }
                } else {
                    return { driverInfoIsSame: false, updatedDriver: undefined };
                }
            } else {
                return { driverInfoIsSame: true, updatedDriver }
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
     * @param {number} id provide the id with which to delete a driver from the database with
     * @returns the deleted driver item and if it was successful
     */
    static async deleteDriver(id = Number) {
        try {
            const getDeletedDriver = await execute("SELECT from driver Where idemployees=", [`${id}`]);
            const response = await execute("DELETE from driver Where idemployees=", [`${id}`]);
            return new Driver(
                getDeletedDriver[0].idemployees,
                getDeletedDriver[0].firstname,
                getDeletedDriver[0].secondname,
                getDeletedDriver[0].email,
                getDeletedDriver[0].phone,
                getDeletedDriver[0].free)
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     * Creates a new Driver entry in the database
     * @param {Driver} newDriver Provide the new Driver to create in the database 
     * @returns  Return the newly created Driver
     */
    static async createDriver(
        newDriver = Driver
    ) {
        try {
            const response = await execute("INSERT INTO driver(firstname,secondname,email,phone,free) "
                + "VALUES (?,?,?,?,?);",
                [newDriver.getFirstName(),
                newDriver.getSecondName(),
                newDriver.getEmail(),
                newDriver.getPhone(),
                newDriver.getFree()])
            if (response.affectedRows > 0) {
                newDriver.setIdEmployees(response.insertId);
                return { driverCreated: true, createdDriver: newDriver }
            } else {
                return { driverCreated: false };
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
    Driver
};