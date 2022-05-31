import express from "express";
import session from "../database.driver.js"

const router = express.Router(); //Initialize the Router

//all routes here are starting with /users


router.get('/', function(req,res){
    session
        .run('USE postnord MATCH (n:User) RETURN n')
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


router.post('/', function(req,res){
    const {user} = req.body;
    console.log(user);
    session
    .run(`use postnord CREATE (u:User {email: "${user.email}", last_name: "${user.last_name}", first_name: "${user.first_name}", phone: "${user.phone}"}) RETURN u`)
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

router.put('/', function(req,res){
    const {user} = req.body;
    console.log(user);
    session
    .run(`use postnord MATCH (u:User {email: "${user.email}"}) SET u.last_name = "${user.last_name}", u.first_name = "${user.first_name}", u.phone = "${user.phone}" RETURN u`)
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

router.delete('/', function(req,res){
    const {email} = req.body;
    console.log(`Deleting user with email ${email}`)
    session.run(
        `use postnord MATCH (u:User{email: "${email}"}) DELETE u`
    )
    .then(function(){
        console.log(`User ${email} Deleted`)
        res.sendStatus(200)
    })
    .catch(function(err){
        console.log(err)
    })
})


export default router;