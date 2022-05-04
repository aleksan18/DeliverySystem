const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../database/mysql.connector.js");
// const {checker} = require("../utility/argumentChecker");

class Package {
    #idpackages;
    #user_iduser;
    #weight;
    #height;
    #width;
    #depth;
    #fragile;
    #electronics;
    #oddsized;
    #receiver_iduser;

    constructor(
        idpackages = Number,
        user_iduser = Number,
        weight = Number,
        height = Number,
        width = Number,
        depth = Number,
        fragile = Boolean,
        electronics = Boolean,
        oddsized = Boolean,
        receiver_iduser = Number,
    ) {
        this.#idpackages = idpackages;
        this.#user_iduser = user_iduser;
        this.#weight = weight;
        this.#height = height;
        this.#width = width;
        this.#depth = depth;
        this.#fragile = fragile;
        this.#electronics = electronics;
        this.#oddsized = oddsized;
        this.#receiver_iduser = receiver_iduser;

    }
    /**
    * Getters and Setters for the private fields
    */
    getIdPackages() { return this.#idpackages }
    setIdPackages(value) { this.#idpackages = value; }

    getUserId() { return this.#user_iduser }
    setUserId(value) { this.#user_iduser = value }

    getWeight() { return this.#weight }
    setWeight(value) { this.#weight = value }

    getHeight() { return this.#height }
    setHeight(value) { this.#height = value }

    getWidth() { return this.#width }
    setWidth(value) { this.#width = value }

    getDepth() { return this.#depth }
    setDepth(value) { this.#depth = value }

    getFragile() { return this.#fragile }
    setFragile(value) { this.#fragile = value }

    getElectronics() { return this.#electronics }
    setElectronics(value) { this.#electronics = value }

    getOddSized() { return this.#oddsized }
    setOddSized(value) { this.#oddsized = value }

    getReceiverId() { return this.#receiver_iduser }
    setReceiverId(value) { this.#receiver_iduser = value }
    
    equals(receivedPackage = new Package) {
        return receivedPackage.getIdPackages === this.#idpackages &&
            receivedPackage.getUserId === this.#user_iduser &&
            receivedPackage.getDepth === this.#depth &&
            receivedPackage.getHeight === this.#height &&
            receivedPackage.getWidth === this.#width &&
            receivedPackage.getWeight === this.#weight &&
            receivedPackage.getFragile === this.#fragile &&
            receivedPackage.getOddSized === this.#oddsized &&
            receivedPackage.getElectronics === this.#electronics &&
            receivedPackage.getReceiverId === this.#receiver_iduser
    }

    toString() {
        return `idpackages= ${this.#idpackages}, user_iduser= ${this.#user_iduser}, ` +
            `depth= ${this.#depth}, height= ${this.#height}, width= ${this.#width}, ` +
            `weight= ${this.#weight}, fragile= ${this.#fragile}, oddsized= ${this.#oddsized}, ` +
            `electronics= ${this.#electronics}, receiver_iduser= ${this.#receiver_iduser}, `
    }

    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Package
    */
    /**
     * Gets an array, every item in the array is an instance of Package class
     * 
     */
    static async getAllPackages() {
        const response = await execute("SELECT * FROM packages", []);
        return response.map(v => Object.assign(new Package(), v));
    }
    /**
     * The function get a 1 Package from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getPackage(id = Number) {

        const response = await execute("SELECT * FROM packages WHERE idpackages=?", [`${id}`])

        return Object.assign(new Package(), response[0])

    }
    /**
     * 
     * @returns 
     */
    static async updatePackage(
        newPackage = new Package
    ) {
        const getUpdatedPackage = await execute("SELECT * FROM packages WHERE idpackages=?", [`${newPackage.getIdPackages()}`])
        if (newPackage.equals(getUpdatedPackage[0])) {
            const response = await execute(
                "UPDATE packages"
                + "SET(user_iduser=?,weight=?,height=?,width=?,depth=?,fragile=?,electronics=?,oddsized=?,receiver_iduser=?) WHERE idpackages=?"
                , [`${newPackage.getUserId()}`
                    , `${newPackage.getWeight()}`,
                `${newPackage.getHeight()}`,
                `${newPackage.getWidth()}`,
                `${newPackage.getDepth()}`,
                `${newPackage.getFragile()}`,
                `${newPackage.getElectronics()}`,
                `${newPackage.getOddSized()}`,
                `${newPackage.getReceiverId()}`,
                `${newPackage.getIdPackages}`,])
            return Object.assign(new Package(), getUpdatedPackage[0])
        }

    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Package from the database with
     * @returns the deleted Package item and if it was successful
     */
    static async deletePackage(id = Number) {
        const getDeletedPackage = await execute("SELECT FROM packages WHERE idpackages=", [`${id}`]);
        const response = await execute("DELETE FROM packages WHERE idpackages=", [`${id}`]);
        return Object.assign(new Package(), getDeletedPackage[0])
    }
    /**
      * Creates a new Package entry in the database
      * @param {Package} newPackage Provide the new Package to create in the database 
      * @returns  Return the newly created Package
      */
    static async createPackage(
        newPackage = new Package
    ) {
        const response = await execute("INSERT INTO packages(user_iduser,weight,height,width,depth,fragile,electronics,oddsized,receiver_iduser) "
            + "VALUES (?,?,?,?,?,?,?,?,?);",
            [newPackage.getUserId(),
            newPackage.getWeight(),
            newPackage.getHeight(),
            newPackage.getWidth(),
            newPackage.getDepth(),
            newPackage.getFragile(),
            newPackage.getElectronics(),
            newPackage.getOddSized(),
            newPackage.getReceiverId()])
        console.log("createPackage response: ", response)
        return response;
    }
}
module.exports = {
    Package
};