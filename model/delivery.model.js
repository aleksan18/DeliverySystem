const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../database/mysql.connector.js");
const { characterGenerator } = require("../utility/utility.generators");
class Delivery {
    iddeliveries;
    packages_idpackages;
    priority;
    payment_idpayment;
    international;
    start_location;
    end_location;
    message;
    estimated_date;
    start_date;
    end_date;
    uid;
    constructor(
        iddeliveries = Number,
        packages_idpackages = Number,
        priority = Boolean,
        payment_idpayment = Number,
        international = Boolean,
        start_location = Number,
        end_location = Number,
        message = String,
        estimated_date = DATETIME,
        start_date = DATETIME,
        end_date = null,
        uid = String,
    ) {
        this.iddeliveries = iddeliveries;
        this.packages_idpackages = packages_idpackages;
        this.priority = priority;
        this.payment_idpayment = payment_idpayment;
        this.international = international;
        this.start_location = start_location;
        this.end_location = end_location;
        this.message = message;
        this.estimated_date = estimated_date;
        this.start_date = start_date;
        this.end_date = end_date;
        this.uid = uid;
    }
    /**
    * Getters and Setters for the private fields
    */
    getIdDeliveries() { return this.iddeliveries }
    setIdDeliveries(value) { this.iddeliveries = value; }

    getPackageId() { return this.packages_idpackages }
    setPackagesId(value) { this.packages_idpackages = value }

    getPriority() { return this.priority }
    setPriority(value) { this.priority = value }

    getPaymentId() { return this.payment_idpayment }
    setPaymentId(value) { this.payment_idpayment = value }

    getInternational() { return this.international }
    setInternational(value) { this.international = value }

    getStartLocation() { return this.start_location }
    setStartLocation(value) { this.start_location = value }

    getEndLocation() { return this.end_location }
    setEndLocation(value) { this.end_location = value }

    getMessage() { return this.message }
    setMessage(value) { this.message = value }

    getEstimatedDate() { return this.estimated_date }
    setEstimatedDate(value) { this.estimated_date = value }
    getEstimatedDateInSqlFormat() {
        const year = this.estimated_date.getFullYear()
        const month = ((this.estimated_date.getMonth() + 1) >= 10) ? `${this.estimated_date.getMonth() + 1}` : `0${this.estimated_date.getMonth() + 1}`
        const date = (this.estimated_date.getDate() >= 10) ? `${this.estimated_date.getDate()}` : `0${this.estimated_date.getDate()}`
        const hours = (this.estimated_date.getHours() >= 10) ? `${this.estimated_date.getHours()}` : `0${this.estimated_date.getHours()}`
        const minutes = (this.estimated_date.getMinutes() >= 10) ? `${this.estimated_date.getMinutes()}` : `0${this.estimated_date.getMinutes()}`
        const seconds = (this.estimated_date.getSeconds() >= 10) ? `${this.estimated_date.getSeconds()}` : `0${this.estimated_date.getSeconds()}`
        // Date format that Mysql expects to receive: YYYY-MM-DD HH:MI:SS 
        const res = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
        console.log("getEstimatedDateInSqlFormat: ", res)
        return res
    }
    getStartDate() { return this.start_date }
    setStartDate(value) { this.start_date = value }
    getStartDateInSqlFormat() {
        const year = this.start_date.getFullYear()
        const month = ((this.start_date.getMonth() + 1) >= 10) ? `${this.start_date.getMonth() + 1}` : `0${this.start_date.getMonth() + 1}`
        const date = (this.start_date.getDate() >= 10) ? `${this.start_date.getDate()}` : `0${this.start_date.getDate()}`
        const hours = (this.start_date.getHours() >= 10) ? `${this.start_date.getHours()}` : `0${this.start_date.getHours()}`
        const minutes = (this.start_date.getMinutes() >= 10) ? `${this.start_date.getMinutes()}` : `0${this.start_date.getMinutes()}`
        const seconds = (this.start_date.getSeconds() >= 10) ? `${this.start_date.getSeconds()}` : `0${this.start_date.getSeconds()}`
        // Date format that Mysql expects to receive: YYYY-MM-DD HH:MI:SS 
        const res = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
        console.log("getStartDateInSqlFormat: ", res)
        return res
    }

    getEndDate() { return this.end_date }
    setEndDate(value) { this.end_date = value }
    getEndDateInSqlFormat() {
        if (this.end_date != undefined || this.end_date != null) {
            const year = this.end_date.getFullYear()
            const month = ((this.end_date.getMonth() + 1) >= 10) ? `${this.end_date.getMonth() + 1}` : `0${this.end_date.getMonth() + 1}`
            const date = (this.end_date.getDate() >= 10) ? `${this.end_date.getDate()}` : `0${this.end_date.getDate()}`
            const hours = (this.end_date.getHours() >= 10) ? `${this.end_date.getHours()}` : `0${this.end_date.getHours()}`
            const minutes = (this.end_date.getMinutes() >= 10) ? `${this.end_date.getMinutes()}` : `0${this.end_date.getMinutes()}`
            const seconds = (this.end_date.getSeconds() >= 10) ? `${this.end_date.getSeconds()}` : `0${this.end_date.getSeconds()}`
            // Date format that Mysql expects to receive: YYYY-MM-DD HH:MI:SS 
            const res = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
            console.log("getEndDateInSqlFormat: ", res)
            return res
        } else {
            return null
        }
    }

    getUID() { return this.uid }
    setUID(value) { this.uid = value }

    equals(delivery = new Delivery) {
        console.log("delivery: ", delivery);
        console.log("delivery.getIdDeliveries(): ", delivery.getIdDeliveries());

        const isEqual = delivery.getIdDeliveries() == this.iddeliveries &&
            delivery.getPackageId() == this.packages_idpackages &&
            delivery.getPriority() == this.priority &&
            delivery.getPaymentId() == this.payment_idpayment &&
            delivery.getInternational() == this.international &&
            delivery.getStartLocation() == this.start_location &&
            delivery.getEndLocation() == this.end_location &&
            delivery.getMessage() == this.message &&
            delivery.getEstimatedDate() == this.estimated_date &&
            delivery.getStartDate() == this.start_date &&
            (delivery.getEndDate() != undefined || delivery.getEndDate() != null ? delivery.getEndDate().toString() : null) ==
            (this.end_date != undefined || this.end_date != null ? this.end_date.toString() : null) &&
            delivery.getUID() == this.uid

        console.log("Delivery > isEqual: ", isEqual);
        return isEqual
    }

    toString() {
        return `iddeliveries= ${this.iddeliveries}, packages_idpackages= ${this.packages_idpackages}, ` +
            `priority= ${this.priority}, start_date= ${this.start_date}, end_date= ${this.end_date}, ` +
            `uid= ${this.uid}, payment_idpayment= ${this.payment_idpayment}, international= ${this.international}, ` +
            `message= ${this.message}, estimated_date= ${this.estimated_date}, ` +
            `end_location=${this.end_location}, start_location= ${this.start_location}`
    }

    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Delivery
    */
    /**
     * Gets an array, every item in the array is an instance of delivery class
     * 
     */
    static async getAllDeliveries() {
        try {
            const response = await execute("SELECT * FROM deliveries", []);
            return response.map(v => new Delivery(
                v.iddeliveries,
                v.packages_idpackages,
                v.priority,
                v.payment_idpayment,
                v.international,
                v.start_location,
                v.end_location,
                v.message,
                v.estimated_date,
                v.start_date,
                v.end_date,
                v.uid));
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     * The function get a 1 delivery from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getDelivery(id = Number) {
        try {
            const response = await execute("SELECT * FROM deliveries WHERE iddeliveries=?", [`${id}`])
            return new Delivery(
                response[0].iddeliveries,
                response[0].packages_idpackages,
                response[0].priority,
                response[0].payment_idpayment,
                response[0].international,
                response[0].start_location,
                response[0].end_location,
                response[0].message,
                response[0].estimated_date,
                response[0].start_date,
                response[0].end_date,
                response[0].uid)
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     *  Compares the new Delivery to the existing one and if there are changes updates the database with the new delivery.
     * @param {Delivery} updatedDelivery provide the new delivery with which to update the database
     * @returns the updated delivery objecct
     */
    static async updateDelivery(updatedDelivery = Delivery) {
        try {
            const deliveryFromDB = await execute("SELECT * FROM deliveries WHERE uid=?;", [`${updatedDelivery.getUID()}`])
            console.log("updateDelivery > deliveryFromDB[0]: ", deliveryFromDB[0])
            const receivedDelivery = new Delivery(
                deliveryFromDB[0].iddeliveries,
                deliveryFromDB[0].packages_idpackages,
                deliveryFromDB[0].priority,
                deliveryFromDB[0].payment_idpayment,
                deliveryFromDB[0].international,
                deliveryFromDB[0].start_location,
                deliveryFromDB[0].end_location,
                deliveryFromDB[0].message,
                deliveryFromDB[0].estimated_date,
                deliveryFromDB[0].start_date,
                deliveryFromDB[0].end_date,
                deliveryFromDB[0].uid)
            console.log("updateDelivery > receivedDelivery: ", receivedDelivery)
            if (!updatedDelivery.equals(receivedDelivery)) {
                const response = await execute(
                    "UPDATE deliveries "
                    + "SET packages_idpackages=?,priority=?,payment_idpayment=?,international=?,start_location=?,end_location=?,message=?,estimated_date=?,start_date=?,end_date=?,uid=? WHERE iddeliveries=?;"
                    , [updatedDelivery.getPackageId(),
                    updatedDelivery.getPriority(),
                    updatedDelivery.getPaymentId(),
                    updatedDelivery.getInternational(),
                    updatedDelivery.getStartLocation(),
                    updatedDelivery.getEndLocation(),
                    updatedDelivery.getMessage(),
                    updatedDelivery.getEstimatedDateInSqlFormat(),
                    updatedDelivery.getStartDateInSqlFormat(),
                    updatedDelivery.getEndDateInSqlFormat(),
                    updatedDelivery.getUID(),
                    updatedDelivery.getIdDeliveries()])
                console.log("Inside Delivery Model > updateDelivery > response: ", response);
                if (response.changedRows > 0) {
                    return { deliveryInfoIsSame: false, updatedDelivery }
                } else {
                    return { deliveryInfoIsSame: false, updatedDelivery: undefined };
                }
            } else {
                return { deliveryInfoIsSame: true, updatedDelivery }
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
     * @param {number} id provide the id with which to delete a delivery from the database with
     * @returns the deleted delivery item and if it was successful
     */
    static async deleteDelivery(id = Number) {
        try {
            const getDeletedDelivery = await execute("SELECT from deliveries Where iddeliveries=?", [`${id}`]);
            const response = await execute("DELETE from deliveries Where iddeliveries=", [`${id}`]);
            return new Delivery(
                getDeletedDelivery[0].iddeliveries,
                getDeletedDelivery[0].packages_idpackages,
                getDeletedDelivery[0].priority,
                getDeletedDelivery[0].payment_idpayment,
                getDeletedDelivery[0].international,
                getDeletedDelivery[0].start_location,
                getDeletedDelivery[0].end_location,
                getDeletedDelivery[0].message,
                getDeletedDelivery[0].estimated_date,
                getDeletedDelivery[0].start_date,
                getDeletedDelivery[0].end_date,
                getDeletedDelivery[0].uid)
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     * Creates a new Delivery entry in the database
     * @param {Delivery} newDelivery Provide the new delivery to create in the database 
     * @returns  Return the newly created delivery
     */
    static async createDelivery(
        newDelivery = Delivery
    ) {
        try {
            const response = await execute("INSERT INTO deliveries(packages_idpackages,priority,payment_idpayment,international,start_location,end_location,message,estimated_date,start_date,end_date,uid) "
                + "VALUES (?,?,?,?,?,?,?,?,?,?,?);",
                [newDelivery.getPackageId(),
                newDelivery.getPriority(),
                newDelivery.getPaymentId(),
                newDelivery.getInternational(),
                newDelivery.getStartLocation(),
                newDelivery.getEndLocation(),
                newDelivery.getMessage(),
                newDelivery.getEstimatedDate(),
                newDelivery.getStartDate(),
                newDelivery.getEndDate(),
                generateUUID()])
            console.log("createDelivery response: ", response)
            if (response.affectedRows > 0) {
                newDelivery.setIdDeliveries(response.insertId);
                return { deliveryCreated: true, createdDelivery: newDelivery }
            } else {
                return { deliveryCreated: false };
            }
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

        // example of what createDelivery() should return 
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
    }
    /**
     * Generates a unique string identifier with the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
     * The `x` can be a character or number from `[a-z],[A-Z],[0-9]`
     * @returns {String}  Returns a 36 character long semi-unique identifier
     */
    generateUUID() {
        let uid = "";
        while (uid.length < 36) {
            console.log(uid.length)
            switch (uid.length) {
                case 8:
                    console.log(uid);
                    uid = uid + "-";
                    console.log(uid);
                    break;
                case 13:
                    console.log(uid);
                    uid = uid + "-";
                    console.log(uid);
                    break;
                case 18:
                    uid = uid + "-";
                    break;
                case 23:
                    uid = uid + "-";
                    break;
                default:
                    console.log(uid);
                    uid = uid + "" + characterGenerator(4);
                case 36:
                    break;
            }
        }
        return uid;
    }
}
module.exports = {
    Delivery
};