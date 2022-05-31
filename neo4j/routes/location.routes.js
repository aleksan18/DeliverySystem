import express from "express";
import session from "../database.driver.js"

const router = express.Router(); //Initialize the Router

//all routes here are starting with /location

//READ
router.get('/', function(req,res){
    session
        .run('USE postnord MATCH (l:Location) RETURN l')
        .then(function(result){
            const responsemap = result.records.map(function(record){
                console.log(record._fields[0].properties);
                return record._fields[0].properties;
            })
            res.send(responsemap)
        })
        .catch(function(err){
            console.log(err)
        })

});

//CREATE
router.post('/', function(req,res){
    const {location} = req.body;
    console.log(location);
    session
    .run(`use postnord CREATE (l:Location {address: "${location.address}", city: "${location.city}",
            country: "${location.country}", note: "${location.note}", zip: "${location.zip}" }) RETURN l;`)
    .then(function(result){
        const responsemap = result.records.map(function(record){
            console.log(record._fields[0].properties);
            return record._fields[0].properties;
        })
        res.send(responsemap)
    })
    .catch(function(err){
        console.log(err)
        
    })

});

//UPDATE
router.put('/', function(req,res){
    const {location} = req.body;
    console.log(location);
    session
    .run(`use postnord MATCH (l:Location {city: "${location.city}", country: "${location.country}"}) SET l.address = "${location.address}",
        l.city = "${location.city}", l.country = "${location.country}",
        l.note = "${location.note}", l.zip = "${location.zip}" RETURN l`)
    .then(function(result){
        const responsemap = result.records.map(function(record){
            console.log(record._fields[0].properties);
            return record._fields[0].properties;
        })
        res.send(responsemap)
    })
    .catch(function(err){
        console.log(err)
    })


})

//DELETE
// REQUIRES city and address
router.delete('/', function(req,res){
    const {cityaddress} = req.body;
    console.log(`Deleting Address with Address ${cityaddress.address} in ${cityaddress.city}`)
    session.run(
        `use postnord MATCH (l:Location{address: "${cityaddress.address}", city: "${cityaddress.city}"}) DELETE l`
    )
    .then(function(){
        console.log(`Address ${cityaddress.address} Deleted`)
        res.sendStatus(200)
    })
    .catch(function(err){
        console.log(err)
    })
})

export default router;