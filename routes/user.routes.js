const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator")
const { execute } = require("../database/mysql.connector")
const { User } = require("../model/user.model");
router.post("/createUser",
    [
        check("typeOfUser").exists({ checkFalsy: true }).withMessage("Type of user not provided").trim().toInt()
            .isInt({ min: 1, max: 2 }).withMessage("Wrong value provided"),
        check("firstName").exists({ checkFalsy: true }).withMessage("First name not provided").trim()
            .isAlpha().withMessage("First name should contain only characters")
            .isLength({ max: 45 }).withMessage("First name should be no more than 45 characters long"),
        check("secondName").exists({ checkFalsy: true }).withMessage("Second name not provided").trim()
            .isAlpha().withMessage("Second name should contain only characters")
            .isLength({ max: 45 }).withMessage("Second name should be no more than 45 characters long"),
        check("companyName").exists().withMessage("Company not provided").trim()
            .isAlphanumeric().withMessage("Company name can have only characters and/or numbers provided")
            .isLength({ max: 45 }).withMessage("Company name should be no more than 45 characters long"),
        check("email").exists({ checkFalsy: true }).withMessage("Email not provided").trim()
            .normalizeEmail().isEmail().withMessage("Wrong email format")
            .isLength({ max: 45 }).withMessage("Email should be no more than 45 characters long"),
        check("phone").exists({ checkFalsy: true }).withMessage("Phone not provided").trim()
            .isMobilePhone().withMessage("Wrong phone format")
            .isLength({ max: 16 }).withMessage("Phone should be no more than 16 characters long"),
        check("address").exists({ checkFalsy: true }).withMessage("Address not provided").trim()
            .isLength({ max: 70 }).withMessage("Address should be no more than 70 characters long"),
        check("duns").exists({ checkFalsy: true }).withMessage("DUNS not provided").trim()
            .isNumeric().withMessage("DUNS should contain only numeric values")
            .isLength({ min: 9, max: 9 }).withMessage("DUNS should be 9 characters long (format: XXXXXXXXX)"),
        check("zipcode").exists({ checkFalsy: true }).withMessage("Zip code not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("city").exists({ checkFalsy: true }).withMessage("City not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided")
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a user",
                });
            }
            const { typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city } = req.body;
            const user = new User(null, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city);
            console.log(user)
            const { userCreated, createdUser } = await User.createUser(user)
            if (userCreated) {
                return res.status(200).json({ response: { createdUser } });
            } else {
                return res.status(500).json({ response: { message: "Internal Server Error" } });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Invalid data",
                errors: [
                    { value: error, msg: error.message },
                ],
            });
        }
    })
router.post("/updateUser",
    [
        check("idCustomer").exists({ checkFalsy: true }).withMessage("Customer not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("typeOfUser").exists({ checkFalsy: true }).withMessage("Type of user not provided").trim().toInt()
            .isInt({ min: 1, max: 2 }).withMessage("Wrong value provided"),
        check("firstName").exists({ checkFalsy: true }).withMessage("First name not provided").trim()
            .isAlpha().withMessage("First name should contain only characters")
            .isLength({ max: 45 }).withMessage("First name should be no more than 45 characters long"),
        check("secondName").exists({ checkFalsy: true }).withMessage("Second name not provided").trim()
            .isAlpha().withMessage("Second name should contain only characters")
            .isLength({ max: 45 }).withMessage("Second name should be no more than 45 characters long"),
        check("companyName").exists().withMessage("Company not provided").trim()
            .isAlphanumeric().withMessage("Company name can have only characters and/or numbers provided")
            .isLength({ max: 45 }).withMessage("Company name should be no more than 45 characters long"),
        check("email").exists({ checkFalsy: true }).withMessage("Email not provided").trim()
            .normalizeEmail().isEmail().withMessage("Wrong email format")
            .isLength({ max: 45 }).withMessage("Email should be no more than 45 characters long"),
        check("phone").exists({ checkFalsy: true }).withMessage("Phone not provided").trim()
            .isMobilePhone().withMessage("Wrong phone format")
            .isLength({ max: 16 }).withMessage("Phone should be no more than 16 characters long"),
        check("address").exists({ checkFalsy: true }).withMessage("Address not provided").trim()
            .isLength({ max: 70 }).withMessage("Address should be no more than 70 characters long"),
        check("duns").exists({ checkFalsy: true }).withMessage("DUNS not provided").trim()
            .isNumeric().withMessage("DUNS should contain only numeric values")
            .isLength({ min: 9, max: 9 }).withMessage("DUNS should be 9 characters long (format: XXXXXXXXX)"),
        check("zipcode").exists({ checkFalsy: true }).withMessage("Zip code not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("city").exists({ checkFalsy: true }).withMessage("City not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided")
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a user",
                });
            }
            const { idCustomer, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city } = req.body;
            const user = new User(idCustomer, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city);
            console.log(user);
            const { userInfoIsSame, updatedUser } = await User.updateUser(user)
            if (userInfoIsSame) {
                return res.status(200).json({ response: user });
            } else if (!userInfoIsSame && updatedUser === undefined) {
                return res.status(500).json({ response: { message: "Internal Server Error" } });
            } else if (userInfoIsSame) {
                return res.status(400).json({ response: updatedUser, message: "User was not updated, because the user info is the same" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Invalid data",
                errors: [
                    { value: error, msg: error.message },
                ],
            });
        }

    })

router.post("/getUser", async (req, res) => {

    const user = await User.getUser(43);
    console.log(user);
    const users = await User.getAllUsers();
    console.log(users);
    return res.status(200).json({ user });
})
router.get("/getUsers", async (req, res) => {

    const users = await User.getAllUsers();
    console.log(users);
    return res.status(200).json({ users });
})

// router.delete("/deleteUser",[
//   check("Id","User id not provided").exists(),
// ], 
// async(req, res)=>{
//   try {
//       const errors =validationResult(req);
//       if (!errors.isEmpty()) {
//           return res.status(400).json({
//             errors: errors.array(),
//             message: "Invalid data while deleting a user",
//           });
//        }

//        var {id} = req.body
//        const response = await User.deleteUser(id)
//        return res.status(200).json({response})
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//       message: "Invalid data",
//       errors: [
//           { value: error, msg: error.message },
//       ],
//   });
//   }

// })

module.exports = router;



