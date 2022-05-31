import express from "express";
import session from "../database.driver.js"

const router = express.Router(); //Initialize the Router

//all routes here are starting with /driver


//READ
router.get('/', function(req,res){
    session
        .run('USE postnord MATCH (d:Driver) RETURN d')
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
    const {driver} = req.body;
    console.log(driver);
    session
    .run(`use postnord CREATE (d:Driver {email: "${driver.email}", first_name: "${driver.first_name}",
                free : "${driver.free}", last_name : "${driver.last_name}", phone : "${driver.phone}"}) 
            RETURN d`)
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
    const {driver} = req.body;
    console.log(driver);
    session
    .run(`use postnord MATCH (d:Driver {email: "${driver.email}"}) SET d.first_name = "${driver.first_name}",
        d.free = "${driver.free}", d.last_name = "${driver.last_name}",
         d.phone = "${driver.phone}"
        RETURN d`)
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

//DELETE
router.delete('/', function(req,res){
    const {email} = req.body;
    console.log(`Deleting Driver with email ${email}`)
    session.run(
        `use postnord MATCH (d:Driver{email: "${email}"}) DELETE d`
    )
    .then(function(){
        res.sendStatus(200)
    })
    .catch(function(err){
        console.log(err)
    })
})

export default router;