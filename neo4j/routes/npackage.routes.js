import express from "express";
import session from "../database.driver.js"

const router = express.Router(); //Initialize the Router

//all routes here are starting with /package

//READ
router.get('/', function(req,res){
    session
        .run('USE postnord MATCH (p:Package) RETURN p')
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
    const {npackage} = req.body;
    console.log(npackage);
    session
    .run(`use postnord CREATE (p:Package {identifier : "${npackage.identifier}", batteries : "${npackage.batteries}",
     depth: "${npackage.depth}", fragile: "${npackage.fragile}", height: "${npackage.height}", message: "${npackage.message}", weight : "${npackage.weight}", width : "${npackage.width}"}) RETURN p`)
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
    const {npackage} = req.body;
    console.log(npackage);
    session
    .run(`use postnord MATCH (p:Package {identifier : "${npackage.identifier}"}) SET p.batteries = "${npackage.batteries}",
    p.depth = "${npackage.depth}", p.fragile = "${npackage.fragile}",
    p.height = "${npackage.height}", p.message = "${npackage.message}",
    p.weight = "${npackage.weight}", p.width = "${npackage.width}" RETURN p`)
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
router.delete('/', function(req,res){
    const {identifier} = req.body;
    console.log(`Deleting package with identifier ${identifier}`)
    session.run(
        `use postnord MATCH (p:Package{identifier: "${identifier}"}) DELETE p`
    )
    .then(function(){
        console.log(`Package ${identifier} Deleted`)
        res.sendStatus(200)
    })
    .catch(function(err){
        console.log(err)
    })
})


export default router;