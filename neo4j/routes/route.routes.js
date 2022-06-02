const { Router } = require("express");
const session = require("../neo4jdatabase.driver");

const router = Router();
//all routes here are starting with /route

// !!  REF TO THE JSON OBJECTS AS droute instead of route !!

//READ
router.get('/', function (req, res) {
    session
        .run('USE postnord MATCH (r:Route) RETURN r')
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

//CREATE
router.post('/', function (req, res) {
    const { droute } = req.body;
    console.log(droute);
    session
        .run(`use postnord CREATE (r:Route {identifier: "${droute.identifier}", type: "${droute.type}"}) RETURN r`)
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

//UPDATE
router.put('/', function (req, res) {
    const { droute } = req.body;
    console.log(droute);
    session
        .run(`use postnord MATCH (r:Route {identifier: "${droute.identifier}"}) SET r.type = "${droute.type}" RETURN r`)
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

//DELETE
router.delete('/', function (req, res) {
    const { identifier } = req.body;
    console.log(`Deleting Route with identifier ${identifier}`)
    session.run(
        `use postnord MATCH (r:Route{identifier: "${identifier}"}) DELETE r`
    )
        .then(function () {
            console.log(`Route ${identifier} Deleted`)
            res.sendStatus(200)
        })
        .catch(function (err) {
            console.log(err)
        })
})

module.exports = router;