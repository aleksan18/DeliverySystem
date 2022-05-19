const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../database/mysql.connector.js");

class Payment {
    idpayment;
    typeofpayment_idtypeofpayment;
    amount;
    payed;
    prepaid;
    transactionid;
    billing_address;

    constructor(
        idpayment = Number,
        typeofpayment_idtypeofpayment = Number,
        amount = Number,
        payed = Boolean,
        prepaid = Boolean,
        transactionid = null,
        billing_address = Boolean,

    ) {
        this.idpayment = idpayment;
        this.typeofpayment_idtypeofpayment = typeofpayment_idtypeofpayment;
        this.amount = amount;
        this.payed = payed;
        this.prepaid = prepaid;
        this.transactionid = transactionid;
        this.billing_address = billing_address;
    }
    /**
    * Getters and Setters for the private fields
    */
    getIdPayment() { return this.idpayment }
    setIdPayment(value) { this.idpayment = value; }

    getTpeOfPaymentId() { return this.typeofpayment_idtypeofpayment }
    setTpeOfPaymentId(value) { this.typeofpayment_idtypeofpayment = value }

    getAmount() { return this.amount }
    setWeight(value) { this.amount = value }

    getPayed() { return this.payed }
    setPayed(value) { this.payed = value }

    getPrepaid() { return this.prepaid }
    setPrepaid(value) { this.prepaid = value }

    getTransactionid() { return this.transactionid }
    setTransactionid(value) { this.transactionid = value }

    getBillingAddress() { return this.billing_address }
    setBillingAddress(value) { this.billing_address = value }

    equals(receivedPayment = new Payment) {
        const isEqual = receivedPayment.getIdPayment() == this.idpayment &&
            receivedPayment.getTpeOfPaymentId() == this.typeofpayment_idtypeofpayment &&
            receivedPayment.getTransactionid() == this.transactionid &&
            receivedPayment.getPayed() == this.payed &&
            receivedPayment.getPrepaid() == this.prepaid &&
            receivedPayment.getAmount() == this.amount &&
            receivedPayment.getBillingAddress() == this.billing_address
        return isEqual
    }

    toString() {
        return `idpayment= ${this.idpayment}, typeofpayment_idtypeofpayment= ${this.typeofpayment_idtypeofpayment}, ` +
            `transactionid= ${this.transactionid}, payed= ${this.payed}, prepaid= ${this.prepaid}, ` +
            `amount= ${this.amount}, billing_address= ${this.billing_address}`
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
        const response = await execute("SELECT * FROM payment;", []);
        return response.map(v => new Payment(
            v.idpayment,
            v.typeofpayment_idtypeofpayment,
            v.amount,
            v.payed,
            v.prepaid,
            v.transactionid,
            v.billing_address));
    }
    /**
     * The function get a 1 Payment from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getPayment(id = Number) {

        const response = await execute("SELECT * FROM payment WHERE idpayment=?;", [`${id}`])
        return new Payment(
            response[0].idpayment,
            response[0].typeofpayment_idtypeofpayment,
            response[0].amount,
            response[0].payed,
            response[0].prepaid,
            response[0].transactionid,
            response[0].billing_address,
        )

    }

    /**
     * 
     * @returns 
     */
    static async updatePayment(
        updatedPayment = new Payment
    ) {
        const paymentFromDB = await execute("SELECT * FROM payment WHERE idpayment=?;", [`${updatedPayment.getIdPayment()}`])
        const receivedPayment = new Payment(
            paymentFromDB[0].idpayment,
            paymentFromDB[0].typeofpayment_idtypeofpayment,
            paymentFromDB[0].amount,
            paymentFromDB[0].payed,
            paymentFromDB[0].prepaid,
            paymentFromDB[0].transactionid,
            paymentFromDB[0].billing_address
        )
        console.log("updatedPayment: ", updatedPayment);
        console.log("receivedPayment: ", receivedPayment);
        if (!updatedPayment.equals(receivedPayment)) {
            const response = await execute(
                "UPDATE payment "
                + "SET typeofpayment_idtypeofpayment=?,amount=?,payed=?,prepaid=?,transactionid=?,billing_address=? WHERE idpayment=?;"
                , [
                    updatedPayment.getTpeOfPaymentId(),
                    updatedPayment.getAmount(),
                    updatedPayment.getPayed(),
                    updatedPayment.getPrepaid(),
                    updatedPayment.getTransactionid(),
                    updatedPayment.getBillingAddress(),
                    updatedPayment.getIdPayment(),])
            console.log("Inside Payment Model > updatePayment > response: ", response);
            if (response.changedRows > 0) {
                // console.log("here > response.changedRows > 0")
                return { paymentInfoIsSame: false, updatedPayment }
            } else {
                // console.log("here > response.changedRows > 0 > else")
                return { paymentInfoIsSame: false, updatedPayment: undefined };
            }
        } else {
            return { paymentInfoIsSame: true, updatedPayment }
        }
    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Payment from the database with
     * @returns the deleted Payment item and if it was successful
     */
    // static async deletePayment(id = Number) {
    //     const getDeletedPayment = await execute("SELECT FROM payment WHERE idpayment=", [`${id}`]);
    //     const response = await execute("DELETE FROM payment WHERE idpayment=", [`${id}`]);
    //     return Object.assign(new Payment(), getDeletedPayment[0])
    // }
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
        if (response.affectedRows > 0) {
            newPayment.setIdPayment(response.insertId);
            return { paymentCreated: true, createdPayment: newPayment }    
        } else {
            return { paymentCreated: false };
        }
    }
}
module.exports = {
    Payment
};