const { Router } = require("express");
const session = require("../neo4jdatabase.driver");

const router = Router();

//all routes here are starting with /delivery

//READ
router.get('/', function (req, res) {
    session
        .run('MATCH (d:Delivery) RETURN d')
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
    const { delivery } = req.body;
    console.log(delivery);
    session
        .run(`CREATE (d:Delivery {identifier : "${delivery.identifier}", archived : "${delivery.archived}",
     estimated_date: "${delivery.estimated_date}", international: "${delivery.international}", message: "${delivery.message}", start_date: "${delivery.start_date}", priority : "${delivery.priority}"}) RETURN d`)
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
    const { delivery } = req.body;
    console.log(delivery);
    session
        .run(`MATCH (d:Delivery {identifier : "${delivery.identifier}"}) SET d.archived = "${delivery.archived}",
    d.estimated_date = "${delivery.estimated_date}", d.international = "${delivery.international}", d.message = "${delivery.message}", d.start_date = "${delivery.start_date}", d.priority = "${delivery.priority}" RETURN d`)
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
    console.log(`Deleting delivery with identifier ${identifier}`)
    session.run(
        `MATCH (d:Delivery{identifier: "${identifier}"}) DELETE d`
    )
        .then(function () {
            console.log(`Delivery ${identifier} Deleted`)
            res.sendStatus(200)
        })
        .catch(function (err) {
            console.log(err)
        })
})


module.exports = router;
