const { DATETIME, DATETIME2 } = require("mysql/lib/protocol/constants/types");
const { execute } = require("../database/mysql.connector.js");

class User {
    idcustomer;
    type_of_user;
    firstname;
    secondname;
    companyname;
    email;
    phone;
    address;
    duns;
    zip_city_zipcode_idzipcode;
    zip_city_city_idcity;
    password
    constructor(
        idcustomer = Number || null, // CHANGE IT TO JUST NULL
        type_of_user = Number,
        firstname = String,
        secondname = String,
        companyname = String,
        email = String,
        phone = String,
        address = String,
        duns = String || null,
        zip_city_zipcode_idzipcode = Number,
        zip_city_city_idcity = Number,
        password = String
    ) {
        this.idcustomer = idcustomer;
        this.type_of_user = type_of_user;
        this.firstname = firstname;
        this.secondname = secondname;
        this.companyname = companyname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.duns = duns;
        this.zip_city_zipcode_idzipcode = zip_city_zipcode_idzipcode;
        this.zip_city_city_idcity = zip_city_city_idcity;
        this.password = password;
    }

    /**
    * Getters and Setters for the private fields
    */
    getIdCustomer() { return this.idcustomer }
    setIdCustomer(value) { this.idcustomer = value; }

    getTypeOfUser() { return this.type_of_user }
    setTypeOfUser(value) { this.type_of_user = value }

    getFirstName() { return this.firstname }
    setFirstName(value) { this.firstname = value }

    getSecondName() { return this.secondname }
    setSecondName(value) { this.secondname = value }

    getCompanyName() { return this.companyname }
    setCompanyName(value) { this.companyname = value }

    getEmail() { return this.email }
    setEmail(value) { this.email = value }

    getPhone() { return this.phone }
    setPhone(value) { this.phone = value }

    getAddress() { return this.address }
    setAddress(value) { this.address = value }

    getDuns() { return this.duns }
    setDuns(value) { this.duns = value }

    getZipCode() { return this.zip_city_zipcode_idzipcode }
    setZipCode(value) { this.zip_city_zipcode_idzipcode = value }

    getCity() { return this.zip_city_city_idcity }
    setCity(value) { this.zip_city_city_idcity = value }

    getPassword() { return this.password }
    setPassword(value) { this.password = value }
    equals(user = new User) {
        return user.getIdCustomer() == this.idcustomer &&
            user.getTypeOfUser() == this.type_of_user &&
            user.getFirstName() == this.firstname &&
            user.getSecondName() == this.secondname &&
            user.getCompanyName() == this.companyname &&
            user.getEmail() == this.email &&
            user.getPhone() == this.phone &&
            user.getAddress() == this.address &&
            user.getDuns() == this.duns &&
            user.getZipCode() == this.zip_city_zipcode_idzipcode &&
            user.getCity() == this.zip_city_city_idcity &&
            user.getPassword() == this.password
    }

    toString() {
        return `idcustomer= ${this.idcustomer}, type_of_user= ${this.type_of_user}, ` +
            `firstname= ${this.firstname}, secondname= ${this.secondname}, ` +
            `companyname= ${this.companyname}, email= ${this.email}, phone= ${this.phone}, ` +
            `address= ${this.address}, duns= ${this.duns}, ` +
            `zip_city_zipcode_idzipcode= ${this.zip_city_zipcode_idzipcode}, ` +
            `zip_city_city_idcity=${this.zip_city_city_idcity}`
    }

    /*
    Static functions used to call the database without needing to initialize the class
    they return instance of User
    */
    /**
     * Gets an array, every item in the array is an instance of user class
      * 
      */
    static async getAllUsers() {
        try {
            const response = await execute("SELECT * FROM user", []);
            return response.map(v => new User(
                v.idcustomer,
                v.type_of_user,
                v.firstname,
                v.secondname,
                v.companyname,
                v.email,
                v.phone,
                v.address,
                v.duns,
                v.zip_city_zipcode_idzipcode,
                v.zip_city_city_idcity,
                v.password))
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
     * The function get a 1 User from the database with the provided id 
     * 
     * @param {Number} id - provide an id with which to query the database
     */
    static async getUser(id = Number) {
        try {
            const response = await execute("SELECT * FROM user WHERE idcustomer=?", [`${id}`])

            return new User(response[0].idcustomer,
                response[0].type_of_user,
                response[0].firstname,
                response[0].secondname,
                response[0].companyname,
                response[0].email,
                response[0].phone,
                response[0].address,
                response[0].duns,
                response[0].zip_city_zipcode_idzipcode,
                response[0].zip_city_city_idcity,
                response[0].password)
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }


    }
    /**
     * Function that gets a user from the database with the provided email
     * @param {String} email Email of the user to search the database
     * @returns Returns a user object
     */
    static async getUserByEmail(email) {
        try {
            const response = await execute("SELECT * FROM user WHERE email=?", [`${email}`])
            return new User(response[0].idcustomer,
                response[0].type_of_user,
                response[0].firstname,
                response[0].secondname,
                response[0].companyname,
                response[0].email,
                response[0].phone,
                response[0].address,
                response[0].duns,
                response[0].zip_city_zipcode_idzipcode,
                response[0].zip_city_city_idcity,
                response[0].password)
        } catch (error) {
            //console.log(error);
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }


    }
    /**
     * Updates a user from the database
     * @param {User} newUser Provide a new user object with which to update the database with
     * @returns  Returns the new user object that has been added to the database
     */
    static async updateUser(
        updatedUser = User
    ) {
        try {
            const userFromDB = await execute("SELECT * FROM user WHERE idcustomer=?;", [`${updatedUser.getIdCustomer()}`])
            const receivedUser = new User(
                userFromDB[0].idcustomer,
                userFromDB[0].type_of_user,
                userFromDB[0].firstname,
                userFromDB[0].secondname,
                userFromDB[0].companyname,
                userFromDB[0].email,
                userFromDB[0].phone,
                userFromDB[0].address,
                userFromDB[0].duns,
                userFromDB[0].zip_city_zipcode_idzipcode,
                userFromDB[0].zip_city_city_idcity)
            if (!updatedUser.equals(receivedUser)) {
                const response = await execute(
                    "UPDATE user "
                    + "SET type_of_user=?,firstname=?,secondname=?,companyname=?,email=?,phone=?,address=?,duns=?,zip_city_zipcode_idzipcode=?,zip_city_city_idcity=? WHERE idcustomer=?;"
                    , [newUser.getTypeOfUser(),
                    newUser.getFirstName(),
                    newUser.getSecondName(),
                    newUser.getCompanyName(),
                    newUser.getEmail(),
                    newUser.getPhone(),
                    newUser.getAddress(),
                    newUser.getDuns(),
                    newUser.getZipCode(),
                    newUser.getCity(),
                    newUser.getIdCustomer()]);
                if (response.changedRows > 0) {
                    return { userInfoIsSame: false, updatedUser }
                } else {
                    return { userInfoIsSame: false, updatedUser: undefined };
                }
            } else {
                return { userInfoIsSame: true, updatedUser }
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
     * @param {number} id provide the id with which to delete a user from the database with
     * @returns the deleted user item and if it was successful
     */
    static async deleteUser(id = Number) {
        try {
            const getDeletedUser = await execute("SELECT from user Where idcustomer=", [`${id}`]);
            const response = await execute("DELETE from user Where idcustomer=", [`${id}`]);
            console.log(response);
            return new User(getDeletedUser[0].idcustomer,
                getDeletedUser[0].type_of_user,
                getDeletedUser[0].firstname,
                getDeletedUser[0].secondname,
                getDeletedUser[0].companyname,
                getDeletedUser[0].email,
                getDeletedUser[0].phone,
                getDeletedUser[0].address,
                getDeletedUser[0].duns,
                getDeletedUser[0].zip_city_zipcode_idzipcode,
                getDeletedUser[0].zip_city_city_idcity,
                getDeletedUser[0].password)
        } catch (error) {
            console.log("[mysql.connector][execute][Error]: ", error);
            throw {
                value: "Query failed",
                message: error.message,
            }
        }

    }
    /**
    * Creates a new user entry in the database
    * @param {user} newUser Provide the new user to create in the database 
    * @returns  Return the newly created user
    */
    static async createUser(
        newUser = User
    ) {
        try {
            const response = await execute("INSERT INTO user(type_of_user,firstname,secondname,companyname,email,phone,address,duns,zip_city_zipcode_idzipcode,zip_city_city_idcity) "
                + "VALUES (?,?,?,?,?,?,?,?,?,?);",
                [newUser.getTypeOfUser(),
                newUser.getFirstName(),
                newUser.getSecondName(),
                newUser.getCompanyName(),
                newUser.getEmail(),
                newUser.getPhone(),
                newUser.getAddress(),
                newUser.getDuns(),
                newUser.getZipCode(),
                newUser.getCity(),]);
            console.log("createUser > response: ", response);
            if (response.affectedRows > 0) {
                newUser.setIdCustomer(response.insertId);
                return { userCreated: true, createdUser: newUser }
            } else {
                return { userCreated: false };
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
    User
};