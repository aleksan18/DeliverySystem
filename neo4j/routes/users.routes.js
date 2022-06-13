const { Router } = require("express");
const session = require("../neo4jdatabase.driver");

const router = Router();
//all routes here are starting with /users


router.get('/', function (req, res) {
    session
        .run('MATCH (n:User) RETURN n')
        .then(function (result) {
            const responsemap = result.records.map(function (record) {
                console.log(record._fields[0].properties);
                return record._fields[0].properties;
            })
            res.send(responsemap)
        })
        .catch(function (err) {
            console.log(err)
        })

});


router.post('/', function (req, res) {
    const { user } = req.body;
    console.log(user);
    session
        .run(`CREATE (u:User {email: "${user.email}", last_name: "${user.last_name}", first_name: "${user.first_name}", phone: "${user.phone}"}) RETURN u`)
        .then(function (result) {
            const responsemap = result.records.map(function (record) {
                console.log(record._fields[0].properties);
                return record._fields[0].properties;
            })
            res.send(responsemap)
        })
        .catch(function (err) {
            console.log(err)

        })

});

router.put('/', function (req, res) {
    const { user } = req.body;
    console.log(user);
    session
        .run(`MATCH (u:User {email: "${user.email}"}) SET u.last_name = "${user.last_name}", u.first_name = "${user.first_name}", u.phone = "${user.phone}" RETURN u`)
        .then(function (result) {
            const responsemap = result.records.map(function (record) {
                console.log(record._fields[0].properties);
                return record._fields[0].properties;
            })
            res.send(responsemap)
        })
        .catch(function (err) {
            console.log(err)
        })


})

router.delete('/', function (req, res) {
    const { email } = req.body;
    console.log(`Deleting user with email ${email}`)
    session.run(
        `MATCH (u:User{email: "${email}"}) DELETE u`
    )
        .then(function () {
            console.log(`User ${email} Deleted`)
            res.sendStatus(200)
        })
        .catch(function (err) {
            console.log(err)
        })
})

module.exports = router;