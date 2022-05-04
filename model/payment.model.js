const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../database/mysql.connector.js");
// const {checker} = require("../utility/argumentChecker");

class Payment {
    #idpayment;
    #typeofpayment_idtypeofpayment;
    #amount;
    #payed;
    #prepaid;
    #transactionid;
    #billing_address;


    constructor(
        idpayment = Number,
        typeofpayment_idtypeofpayment = Number,
        amount = Number,
        payed = Boolean,
        prepaid = Boolean,
        transactionid = String,
        billing_address = Boolean,

    ) {
        this.#idpayment = idpayment;
        this.#typeofpayment_idtypeofpayment = typeofpayment_idtypeofpayment;
        this.#amount = amount;
        this.#payed = payed;
        this.#prepaid = prepaid;
        this.#transactionid = transactionid;
        this.#billing_address = billing_address;


    }
    /**
    * Getters and Setters for the private fields
    */
    getIdPayments() { return this.#idpayment }
    setIdPayments(value) { this.#idpayment = value; }

    getTpeOfPaymentId() { return this.#typeofpayment_idtypeofpayment }
    setTpeOfPaymentId(value) { this.#typeofpayment_idtypeofpayment = value }

    getAmount() { return this.#amount }
    setWeight(value) { this.#amount = value }

    getPayed() { return this.#payed }
    setPayed(value) { this.#payed = value }

    getPrepaid() { return this.#prepaid }
    setPrepaid(value) { this.#prepaid = value }

    getTransactionid() { return this.#transactionid }
    setTransactionid(value) { this.#transactionid = value }

    getBillingAddress() { return this.#billing_address }
    setBillingAddress(value) { this.#billing_address = value }

    equals(receivedPayment = new Payment) {
        return receivedPayment.getIdPayments === this.#idpayment &&
            receivedPayment.getTpeOfPaymentId === this.#typeofpayment_idtypeofpayment &&
            receivedPayment.getTransactionid === this.#transactionid &&
            receivedPayment.getPayed === this.#payed &&
            receivedPayment.getPrepaid === this.#prepaid &&
            receivedPayment.getAmount === this.#amount &&
            receivedPayment.getBillingAddress === this.#billing_address
    }

    toString() {
        return `idpayment= ${this.#idpayment}, typeofpayment_idtypeofpayment= ${this.#typeofpayment_idtypeofpayment}, ` +
            `transactionid= ${this.#transactionid}, payed= ${this.#payed}, prepaid= ${this.#prepaid}, ` +
            `amount= ${this.#amount}, billing_address= ${this.#billing_address}`
    }

    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Payment
    */
    /**
     * Gets an array, every item in the array is an instance of Payment class
     * 
     */
    static async getAllPayments() {
        const response = await execute("SELECT * FROM payment", []);
        return response.map(v => Object.assign(new Payment(), v));
    }
    /**
     * The function get a 1 Payment from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getPayment(id = Number) {

        const response = await execute("SELECT * FROM payment WHERE idpayment=?", [`${id}`])

        return Object.assign(new Payment(), response[0])

    }
    /**
     * 
     * @returns 
     */
    static async updatePayment(
        newPayment = new Payment
    ) {
        const getUpdatedPayment = await execute("SELECT * FROM payment WHERE idpayment=?", [`${newPayment.getIdPayments()}`])
        if (newPayment.equals(getUpdatedPayment[0])) {
            const response = await execute(
                "UPDATE payment"
                + "SET(typeofpayment_idtypeofpayment=?,amount=?,payed=?,prepaid=?,transactionid=?,billing_address=?) WHERE idpayment=?"
                , [`${newPayment.getTpeOfPaymentId()}`
                    , `${newPayment.getAmount()}`,
                `${newPayment.getPayed()}`,
                `${newPayment.getPrepaid()}`,
                `${newPayment.getTransactionid()}`,
                `${newPayment.getBillingAddress()}`,
                `${newPayment.getIdPayments}`,])
            return Object.assign(new Payment(), getUpdatedPayment[0])
        }

    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Payment from the database with
     * @returns the deleted Payment item and if it was successful
     */
    static async deletePayment(id = Number) {
        const getDeletedPayment = await execute("SELECT FROM payment WHERE idpayment=", [`${id}`]);
        const response = await execute("DELETE FROM payment WHERE idpayment=", [`${id}`]);
        return Object.assign(new Payment(), getDeletedPayment[0])
    }
    /**
      * Creates a new Payment entry in the database
      * @param {Payment} newPayment Provide the new Payment to create in the database 
      * @returns  Return the newly created Payment
      */
    static async createPayment(
        newPayment = new Payment
    ) {
        const response = await execute("INSERT INTO payment(typeofpayment_idtypeofpayment,amount,payed,prepaid,transactionid,billing_address) "
            + "VALUES (?,?,?,?,?,?);",
            [newPayment.getTpeOfPaymentId(),
            newPayment.getAmount(),
            newPayment.getPayed(),
            newPayment.getPrepaid(),
            newPayment.getTransactionid(),
            newPayment.getBillingAddress()])
        console.log("createPayment response: ", response)
        return response;
    }
}
module.exports = {
    Payment
};