const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const {execute} = require("../database/mysql.connector.js");
const {checker} = require("../utility/argumentChecker");

class Delivery {
    #iddeliveries;
    #packages_idpackages ;
    #priority ;
    #payment_idpayment ;
    #international ;
    #start_location ;
    #end_location;
    #message ;
    #estimated_date ;
    #start_date;
    #end_date;
    #uid;
    constructor(
        iddeliveries=Number,
        packages_idpackages=Number,
        priority=Boolean,
        payment_idpayment=Number,
        international=Boolean,
        start_location=Number,
        end_location=Number,
        message=String,
        estimated_date=DATETIME,
        start_date=DATETIME,
        end_date=DATETIME,
        uid=String,
   ){
       this.#iddeliveries = iddeliveries;
       this.#packages_idpackages = packages_idpackages;
       this.#priority = priority;
       this.#payment_idpayment = payment_idpayment;
       this.#international =international;
       this.#start_location = start_location;
       this.#end_location=end_location;
       this.#message = message;
       this.#estimated_date = estimated_date;
       this.#start_date = start_date;
       this.#end_date = end_date;
       this.#uid= uid;
   }
    /**
    * Getters and Setters for the private fields
    */
    getIdDeliveries () { return this.#iddeliveries}
    setIdDeliveries (value) { this.#iddeliveries=value; }
    
    getPackageId () { return this.#packages_idpackages}
    setPackagesId(value){ this.#packages_idpackages=value}
    
    getPriority () { return this.#priority}
    setPriority(value) { this.#priority=value}

    getPaymentId () { return this.#payment_idpayment}
    setPaymentId(value){ this.#payment_idpayment=value}
    
    getInternational () { return this.#international}
    setInternational(value) { this.#international=value}

    getStartLocation () { return this.#start_location}
    setStartLocation(value) { this.#start_location=value}

    getEndLocation() { return this.#end_location}
    setEndLocation(value){ this.#end_location=value}

    getMessage(){return this.#message}
    setMessage(value){ this.#message=value}

    getEstimatedDate(){return this.#estimated_date}
    setEstimatedDate(value){this.#estimated_date=value}

    getStartDate(){return this.#start_date}
    setStartDate(value){this.#start_date=value}

    getEndDate(){return this.#end_date}
    setEndDate(value){this.#end_date=value}

    getUID(){return this.#uid}
    setUID(value){this.#uid=value}

     equals(delivery= new Delivery){
        return delivery.getIdDeliveries()=== this.#iddeliveries &&
                delivery.getPackageId() === this.#packages_idpackages &&
                delivery.getPriority() === this.#priority &&
                delivery.getStartDate() === this.#start_date &&
                delivery.getEndDate() === this.#end_date &&
                delivery.getUID() === this.#uid &&
                delivery.getPaymentId() === this.#payment_idpayment &&
                delivery.getInternational() === this.#international &&
                delivery.getMessage() === this.#message &&
                delivery.getEstimatedDate()===this.#estimated_date &&
                delivery.getEndLocation() === this.#end_location &&
                delivery.getStartLocation() === this.#start_location
    }
    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Delivery
    */
    /**
     * Gets an array, every item in the array is an instance of delivery class
     * 
     */
    static async getAllDeliveries (){
    const response = await execute("SELECT * FROM deliveries",[]);
    return response.map(v => Object.assign(new Delivery(), v));
    }
    /**
     * The function get a 1 delivery from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getDelivery(id=Number) {
        const response= await execute("SELECT * FROM deliveries WHERE iddeliveries=?",[`${id}`]) 
        return Object.assign(new Delivery(),response[0])
    }
    /**
     *  Compares the new Delivery to the existing one and if there are changes updates the database with the new delivery.
     * @param {Delivery} newDelivery provide the new delivery with which to update the database
     * @returns the updated delivery objecct
     */
    static async updateDeliveries (newDelivery= new Delivery) {
        const getUpdatedDelivery = await execute("SELECT * FROM deliveries WHERE uid=?",[`${newDelivery.getUID()}`])
        if (newDelivery.equals(getUpdatedDelivery[0])) {
            const response = await execute(
                "UPDATE deliveries"
                +"SET(packages_idpackages=?,priority=?,payment_idpayment=?,international=?,start_location=?,end_location=?,message=?,estimated_date=?,start_date=?,end_date=?,uid=?) WHERE iddeliveries=?"
                ,[`${newDelivery.getPackageId()}`
                ,`${newDelivery.getPriority()}`,
                `${newDelivery.getPaymentId()}`,
                `${newDelivery.getInternational()}`,
                `${newDelivery.getStartLocation()}`,
                `${newDelivery.getEndLocation()}`,
                `${newDelivery.getMessage()}`,
                `${newDelivery.getEstimatedDate()}`,
                `${newDelivery.getStartDate()}`,
                `${newDelivery.getEndDate()}`,
                `${newDelivery.getUID()}`,
                `${newDelivery.getIdDeliveries()}`])
            return Object.assign(new Delivery(),getUpdatedDelivery[0])
        }
       
    }
    /**
     * 
     * @param {number} id provide the id with which to delete a delivery from the database with
     * @returns the deleted delivery item and if it was successful
     */
    static async deleteDeliveries  (id=Number) {
        const getDeletedDelivery = await execute("SELECT from deliveries Where iddeliveries=?",[`${id}`]);
        const response = await execute("DELETE from deliveries Where iddeliveries=",[`${id}`]);
        return Object.assign(new Delivery(),getDeletedDelivery[0])
    }
    /**
     * Creates a new Delivery entry in the database
     * @param {Delivery} newDelivery Provide the new delivery to create in the database 
     * @returns  Return the newly created delivery
     */
    static async createDeliveries (
        newDelivery= new Delivery
    ) {
        const response = await execute("INSERT INTO deliveries (packages_idpackages,priority,payment_idpayment,international,start_location,,end_location,message,estimated_date,start_date,end_date,uid)"
        +"VALUES(?,?,?,?,?,?,?,?,?,?,?)",
        [`${newDelivery.getPackageId()}`,
        `${newDelivery.getPriority()}`,
        `${newDelivery.getPaymentId()}`,
        `${newDelivery.getInternational()}`,
        `${newDelivery.getStartLocation()}`,
        `${newDelivery.getEndLocation()}`,
        `${newDelivery.getMessage()}`,
        `${newDelivery.setEstimatedDate()}`,
        `${newDelivery.getStartDate()}`,
        `${newDelivery.getEndDate()}`,
        `${newDelivery.getUID()}`])
        return newDelivery;
    }
}
module.exports={
  Delivery  
};