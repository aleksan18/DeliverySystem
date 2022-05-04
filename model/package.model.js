const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../database/mysql.connector.js");

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
    getIdPackage() { return this.#idpackages }
    setIdPackage(value) { this.#idpackages = value; }

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
        return receivedPackage.getIdPackage === this.#idpackages &&
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
        const response = await execute("SELECT * FROM Packages", []);
        return response.map(v =>
            new Package(
                v.idpackages,
                v.user_iduser,
                v.weight,
                v.height,
                v.width,
                v.depth,
                v.fragile,
                v.electronics,
                v.oddsized,
                v.receiver_id));
    }
    /**
     * The function get a 1 Package from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getPackage(id = Number) {

        const response = await execute("SELECT * FROM Packages WHERE idpackages=?", [`${id}`])

        return new Package(
            response[0].idpackages,
            response[0].user_iduser,
            response[0].weight,
            response[0].height,
            response[0].width,
            response[0].depth,
            response[0].fragile,
            response[0].electronics,
            response[0].oddsized,
            response[0].receiver_id)

    }
    /**
     * 
     * @returns 
     */
    static async updatePackage(
        newPackage = Package
    ) {
        const getUpdatedPackage = await execute("SELECT * FROM Packages WHERE idpackages=?", [`${newPackage.getIdPackage()}`])
        if (!newPackage.equals(getUpdatedPackage[0])) {
            const response = await execute(
                "UPDATE Packages"
                + " SET user_iduser=?,weight=?,height=?,width=?,depth=?,fragile=?,electronics=?,oddsized=?,receiver_iduser=? WHERE idpackages=?"
                , [`${newPackage.getUserId()}`
                    , `${newPackage.getWeight()}`,
                `${newPackage.getHeight()}`,
                `${newPackage.getWidth()}`,
                `${newPackage.getDepth()}`,
                `${newPackage.getFragile()}`,
                `${newPackage.getElectronics()}`,
                `${newPackage.getOddSized()}`,
                `${newPackage.getReceiverId()}`,
                `${newPackage.getIdPackage}`,])
            return new Package(
                getUpdatedPackage[0].idpackages,
                getUpdatedPackage[0].user_iduser,
                getUpdatedPackage[0].weight,
                getUpdatedPackage[0].height,
                getUpdatedPackage[0].width,
                getUpdatedPackage[0].depth,
                getUpdatedPackage[0].fragile,
                getUpdatedPackage[0].electronics,
                getUpdatedPackage[0].oddsized,
                getUpdatedPackage[0].receiver_id)
        } else {
            return "Package was not updated, because the package info is the same"
        }

    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Package from the database with
     * @returns the deleted Package item and if it was successful
     */
    static async deletePackage(id = Number) {
        const getDeletedPackage = await execute("SELECT from Packages Where idpackages=", [`${id}`]);
        const response = await execute("DELETE from Packages Where idpackages=", [`${id}`]);
        return new Package(
            getDeletedPackage[0].idpackages,
            getDeletedPackage[0].user_iduser,
            getDeletedPackage[0].weight,
            getDeletedPackage[0].height,
            getDeletedPackage[0].width,
            getDeletedPackage[0].depth,
            getDeletedPackage[0].fragile,
            getDeletedPackage[0].electronics,
            getDeletedPackage[0].oddsized,
            getDeletedPackage[0].receiver_id)
    }
    /**
      * Creates a new Package entry in the database
      * @param {Package} newPackage Provide the new Package to create in the database 
      * @returns  Return the newly created Package
      */
    static async createPackage(
        newPackage = Package
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