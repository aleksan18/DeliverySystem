const { Router } = require("express");
const session = require("../neo4jdatabase.driver");

const router = Router();
//all routes here are starting with /vehicle


//READ
router.get('/', function (req, res) {
    session
        .run('USE postnord MATCH (r:Vehicle) RETURN r')
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
    const { vehicle } = req.body;
    console.log(vehicle);
    session
        .run(`use postnord CREATE (r:Vehicle {identifier: "${vehicle.identifier}", type: "${vehicle.type}", free : "${vehicle.free}", storage : "${vehicle.storage}"}) RETURN r`)
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
    const { vehicle } = req.body;
    console.log(vehicle);
    session
        .run(`use postnord MATCH (r:Vehicle {identifier: "${vehicle.identifier}"}) SET r.type = "${vehicle.type}", r.free = "${vehicle.free}", r.storage = "${vehicle.storage}" RETURN r`)
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
    console.log(`Deleting Vehicle with identifier ${identifier}`)
    session.run(
        `use postnord MATCH (r:Vehicle{identifier: "${identifier}"}) DELETE r`
    )
        .then(function () {
            console.log(`Vehicle ${identifier} Deleted`)
            res.sendStatus(200)
        })
        .catch(function (err) {
            console.log(err)
        })
})

module.exports = router;