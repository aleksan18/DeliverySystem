const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../database/mysql.connector.js");
// const {checker} = require("../utility/argumentChecker");

class Location {
    #idlocation;
    #typeoflocation_idtypeoflocation;
    #address;
    #zip_city_zipcode_idzipcode;
    #zip_city_city_idcity;
    constructor(
        idlocation = Number,
        typeoflocation_idtypeoflocation = Number,
        address = String,
        zip_city_zipcode_idzipcode = Number,
        zip_city_city_idcity = Number,
    ) {
        this.#idlocation = idlocation;
        this.#typeoflocation_idtypeoflocation = typeoflocation_idtypeoflocation;
        this.#address = address;
        this.#zip_city_zipcode_idzipcode = zip_city_zipcode_idzipcode;
        this.#zip_city_city_idcity = zip_city_city_idcity;
    }
    /**
    * Getters and Setters for the private fields
    */
    getIdLocation() { return this.#idlocation }
    setIdLocation(value) { this.#idlocation = value; }

    getTypeOfLocation() { return this.#typeoflocation_idtypeoflocation }
    setTypeOfLocation(value) { this.#typeoflocation_idtypeoflocation = value }

    getAddress() { return this.#address }
    setAddress(value) { this.#address = value }

    getZipCode() { return this.#zip_city_zipcode_idzipcode }
    setZipCode(value) { this.#zip_city_zipcode_idzipcode = value }

    getCity() { return this.#zip_city_city_idcity }
    setCity(value) { this.#zip_city_city_idcity = value }
    equals(location = new Location) {
        return location.getIdLocation === this.#idlocation &&
            location.getAddress() === this.#address &&
            location.getCity() === this.#zip_city_city_idcity &&
            location.getZipCode() === this.#zip_city_zipcode_idzipcode &&
            location.getTypeOfLocation === this.#typeoflocation_idtypeoflocation

    }
    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Location
    */
    /**
     * Gets an array, every item in the array is an instance of Location class
     * 
     */
    static async getAllLocations() {
        const response = await execute("SELECT * FROM Location", []);
        return response.map(v => new Location(
            v.idlocation,
            v.typeoflocation_idtypeoflocation,
            v.address,
            v.zip_city_zipcode_idzipcode,
            v.zip_city_city_idcity));
    }
    /**
     * The function get a 1 Location from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getLocation(id = Number) {

        const response = await execute("SELECT * FROM Location WHERE idlocation=?", [`${id}`])

        return new Location(
            response[0].idlocation,
            response[0].typeoflocation_idtypeoflocation,
            response[0].address,
            response[0].zip_city_zipcode_idzipcode,
            response[0].zip_city_city_idcity)

    }
    /**
     * 
     * @returns 
     */
    static async updateLocation(
        newLocation = Location
    ) {
        const getUpdatedLocation = await execute("SELECT * FROM Location WHERE idlocation=?", [`${newLocation.getUID()}`])
        if (!newLocation.equals(getUpdatedLocation[0])) {
            const response = await execute(
                "UPDATE Location"
                + " SET typeoflocation_idtypeoflocation=?,address=?,zip_city_zipcode_idzipcode=?,zip_city_city_idcity=? WHERE idlocation=?"
                , [`${newLocation.getTypeOfLocation()}`
                    , `${newLocation.getAddress()}`,
                `${newLocation.getZipCode()}`,
                `${newLocation.getCity()}`,
                `${newLocation.getIdLocation}`])
            return new Location(
                getUpdatedLocation[0].idlocation,
                getUpdatedLocation[0].typeoflocation_idtypeoflocation,
                getUpdatedLocation[0].address,
                getUpdatedLocation[0].zip_city_zipcode_idzipcode,
                getUpdatedLocation[0].zip_city_city_idcity)
        } {
            return "Location was not updated, because the location info is the same "
        }

    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Location from the database with
     * @returns the deleted Location item and if it was successful
     */
    static async deleteLocation(id = Number) {
        const getDeletedLocation = await execute("SELECT from Location Where idlocation=", [`${id}`]);
        const response = await execute("DELETE from Location Where idlocation=", [`${id}`]);
        return new Location(
            getDeletedLocation[0].idlocation,
            getDeletedLocation[0].typeoflocation_idtypeoflocation,
            getDeletedLocation[0].address,
            getDeletedLocation[0].zip_city_zipcode_idzipcode,
            getDeletedLocation[0].zip_city_city_idcity)
    }
    /**
      * Creates a new Location entry in the database
      * @param {Location} newLocation Provide the new Location to create in the database 
      * @returns  Return the newly created Location
      */
    static async createLocation(
        newLocation = Location
    ) {
        const response = await execute("INSERT INTO Location (typeoflocation_idtypeoflocation,address,zip_city_zipcode_idzipcode,zip_city_city_idcity)"
            + "VALUES(?,?,?,?)",
            [`${newLocation.getTypeOfLocation()}`,
            `${newLocation.getAddress()}`,
            `${newLocation.getZipCode()}`,
            `${newLocation.getCity()}`,
            ])
        return newLocation;
    }
}
module.exports = {
    Location
};