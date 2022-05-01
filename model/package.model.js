const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const {execute} = require("../database/mysql.connector.js");
const {checker} = require("../utility/argumentChecker");

class Package {
    #idpackages;
    #user_iduser ;
    #weight ;
    #height ;
    #width ;
    #depth ;
    #fragile;
    #electronics ;
    #oddsized ;
    #receiver_iduser;
    
    constructor(
        idpackages=Number,
        user_iduser=Number,
        weight=Number,
        height=Number,
        width=Number,
        depth=Number,
        fragile=Boolean,
        electronics=Boolean,
        oddsized=Boolean,
        receiver_iduser=Number,
   ){
       this.#idpackages = idpackages;
       this.#user_iduser = user_iduser;
       this.#weight = weight;
       this.#height = height;
       this.#width =width;
       this.#depth = depth;
       this.#fragile=fragile;
       this.#electronics = electronics;
       this.#oddsized = oddsized;
       this.#receiver_iduser = receiver_iduser;
       
   }
    /**
    * Getters and Setters for the private fields
    */
    getIdPackages () { return this.#idpackages}
    setIdPackages (value) { this.#idpackages=value; }
    
    getUserId () { return this.#user_iduser}
    setUserId(value){ this.#user_iduser=value}
    
    getWeight () { return this.#weight}
    setWeight(value) { this.#weight=value}

    getHeight () { return this.#height}
    setHeight(value){ this.#height=value}
    
    getWidth () { return this.#width}
    setWidth(value) { this.#width=value}

    getDepth () { return this.#depth}
    setDepth(value) { this.#depth=value}

    getFragile() { return this.#fragile}
    setFragile(value){ this.#fragile=value}

    getElectronics(){return this.#electronics}
    setElectronics(value){ this.#electronics=value}

    getOddSized(){return this.#oddsized}
    setOddSized(value){this.#oddsized=value}

    getReceiverId(){return this.#receiver_iduser}
    setReceiverId(value){this.#receiver_iduser=value}
    equals(package=new Package){
        return package.getIdPackages === this.#idpackages &&
                package.getUserId === this.#user_iduser &&
                package.getDepth === this.#depth &&
                package.getHeight === this.#height &&
                package.getWidth === this.#width &&
                package.getWeight === this.#weight &&
                package.getFragile === this.#fragile &&
                package.getOddSized === this.#oddsized &&
                package.getElectronics === this.#electronics &&
                package.getReceiverId === this.#receiver_iduser
    }
    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of Package
    */
    /**
     * Gets an array, every item in the array is an instance of Package class
     * 
     */
    static async getAllPackages (){
    const response = await execute("SELECT * FROM Packages",[]);
    return response.map(v => Object.assign(new Package(), v));
    }
    /**
     * The function get a 1 Package from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getPackage(id=Number) {
        
        const response= await execute("SELECT * FROM Packages WHERE idpackages=?",[`${id}`])
        
        return Object.assign(new Package(),response[0])
    
    }
    /**
     * 
     * @returns 
     */
    static async updatePackage (
        newPackage=new Package
    ) {
        const getUpdatedPackage = await execute("SELECT * FROM Packages WHERE idpackages=?",[`${newPackage.getIdPackages()}`])
        if (newPackage.equals(getUpdatedPackage[0])) {
            const response = await execute(
                "UPDATE Packages"
                +"SET(user_iduser=?,weight=?,height=?,width=?,depth=?,fragile=?,electronics=?,oddsized=?,receiver_iduser=?) WHERE idpackages=?"
                ,[`${newPackage.getUserId()}`
                ,`${newPackage.getWeight()}`,
                `${newPackage.getHeight()}`,
                `${newPackage.getWidth()}`,
                `${newPackage.getDepth()}`,
                `${newPackage.getFragile()}`,
                `${newPackage.getElectronics()}`,
                `${newPackage.getOddSized()}`,
                `${newPackage.getReceiverId()}`,
                `${newPackage.getIdPackages}`,])
            return Object.assign(new Package(),getUpdatedPackage[0])
        }
       
    }
    /**
     * 
     * @param {number} id provide the id with which to delete a Package from the database with
     * @returns the deleted Package item and if it was successful
     */
    static async deletePackage  (id=Number) {
        const getDeletedPackage = await execute("SELECT from Packages Where idpackages=",[`${id}`]);
        const response = await execute("DELETE from Packages Where idpackages=",[`${id}`]);
        return Object.assign(new Package(),getDeletedPackage[0])
    }
   /**
     * Creates a new Package entry in the database
     * @param {Package} newPackage Provide the new Package to create in the database 
     * @returns  Return the newly created Package
     */
    static async createPackages (
        newPackage=new Package
    ) {
        const response = await execute("INSERT INTO Packages(idpackages,weight,height,width,depth,fragile,electronics,oddsize,receiver_iduser)"
        +"VALUES(?,?,?,?,?,?,?,?,?,)",
        [`${newPackage.getUserId()}`,
        `${newPackage.getWeight()}`,
        `${newPackage.getHeight()}`,
        `${newPackage.getWidth()}`,
        `${newPackage.getDepth()}`,
        `${newPackage.getFragile()}`,
        `${newPackage.getElectronics()}`,
        `${newPackage.getOddSized()}`,
        `${newPackage.getReceiverId()}`,])
        return newPackage;
    }
}
module.exports={
  Package  
};