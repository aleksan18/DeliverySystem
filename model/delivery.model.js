const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const {execute} = require("../database/mysql.connector.js");
//const {checker} = require("../utility/argumentChecker");
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
    }
    /**
     * The function get a 1 delivery from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getDelivery(id=Number) {
        const response= await execute("SELECT * FROM deliveries WHERE iddeliveries=?",[`${id}`]) 
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
    }
    /**
     *  Compares the new Delivery to the existing one and if there are changes updates the database with the new delivery.
     * @param {Delivery} newDelivery provide the new delivery with which to update the database
     * @returns the updated delivery objecct
     */
    static async updateDeliveries (newDelivery=  Delivery) {
        const getUpdatedDelivery = await execute("SELECT * FROM deliveries WHERE uid=?",[`${newDelivery.getUID()}`])
        if (!newDelivery.equals(getUpdatedDelivery[0])) {
            const response = await execute(
                "UPDATE deliveries"
                +" SET packages_idpackages=?,priority=?,payment_idpayment=?,international=?,start_location=?,end_location=?,message=?,estimated_date=?,start_date=?,end_date=?,uid=? WHERE iddeliveries=?"
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
            return new Delivery(
                getUpdatedDelivery[0].iddeliveries,
                getUpdatedDelivery[0].packages_idpackages,
                getUpdatedDelivery[0].priority,
                getUpdatedDelivery[0].payment_idpayment,
                getUpdatedDelivery[0].international,
                getUpdatedDelivery[0].start_location,
                getUpdatedDelivery[0].end_location,
                getUpdatedDelivery[0].message,
                getUpdatedDelivery[0].estimated_date,
                getUpdatedDelivery[0].start_date,
                getUpdatedDelivery[0].end_date,
                getUpdatedDelivery[0].uid)

        }else{
            return "Delivery was not updated, because the delivery info is the same"
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
    }
    /**
     * Creates a new Delivery entry in the database
     * @param {Delivery} newDelivery Provide the new delivery to create in the database 
     * @returns  Return the newly created delivery
     */
    static async createDeliveries (
        newDelivery=  Delivery
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
    static async generateUUID(){

        return "DASDA-SDA";
    }
}
module.exports={
  Delivery  
};