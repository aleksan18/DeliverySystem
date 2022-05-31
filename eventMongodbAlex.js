exports = async function() {
  
    const usersCollection = context.services.get("Cluster0").db("Delivery_sistem").collection("Users");
     const deliveriesCollection = context.services.get("Cluster0").db("Delivery_sistem").collection("Deliveries");
 
     // console.log(JSON.stringify(changeEvent.fullDocument))
 
     const deliveriesArray = await deliveriesCollection.find().toArray();
     const usersArray = await usersCollection.find().toArray();
     usersArray.forEach((user) => {
       const sentDeliveriesByUser = deliveriesArray.filter((delivery) => {
         // console.log(JSON.stringify(user._id.toString()))
         // console.log(JSON.stringify(delivery.sender.toString()))
         return user._id.toString() == delivery.sender.toString() //compare user_id with delivery_sender_id and if they match, gather all the deliveries and save into user
       })
       user.sentDeliveriesByUser = [...sentDeliveriesByUser]
       // console.log(JSON.stringify(user.sentDeliveriesByUser.length))
     })
     
     usersArray.forEach((user) => {
       // sorting deliveries ascending
       user.sentDeliveriesByUser.sort((delivery_a, delivery_b) => new Date(delivery_a.date_frame.start_date.toString()) - new Date(delivery_b.date_frame.start_date.toString()))
      
     // console.log("start")
     // user.sentDeliveriesByUser.forEach(delivery => {
     //   console.log(JSON.stringify(delivery.date_frame))
        
     //   })
     })
     
     usersArray.forEach((user) => {
       const totalNumberOfDeliveries = user.sentDeliveriesByUser.length
       if (totalNumberOfDeliveries > 0){
         const latestDelivery = user.sentDeliveriesByUser[totalNumberOfDeliveries - 1]
         const latestDeliveryStartDate = new Date(latestDelivery.date_frame.start_date.toString())
        // console.log("latestDeliveryStartDate ", JSON.stringify(latestDeliveryStartDate))
         const todaysDay3YearsAgo = new Date() // get today's date
         todaysDay3YearsAgo.setFullYear(todaysDay3YearsAgo.getFullYear() - 3); // roll back today's date to 3 years
        // console.log("todaysDay3YearsAgo ", JSON.stringify(todaysDay3YearsAgo))
         if (latestDeliveryStartDate < todaysDay3YearsAgo) { // check if user's last delivery was sent more than 3 years ago, meaning user was't active for more than 3 years  
           console.log("here")
           //remove all users deliveires and then remove usersCollection
            user.sentDeliveriesByUser.forEach((delivery) => {
           
              deliveriesCollection.deleteOne({ _id: BSON.ObjectId(delivery._id.toString()) })
            })
            usersCollection.deleteOne({ _id: BSON.ObjectId(user._id.toString()) })
           
         }
         
       }
     })
     const resp = await usersCollection.deleteOne({_id: BSON.ObjectId("628ccd5f2b0ceb917576a46f")}) // if it didnt delete anything, then returns: {"deletedCount":0}
    // console.log(JSON.stringify(resp))
    // usersCollection.remove({ _id: BSON.ObjectId("628ccd5f2b0ceb917576a46f") }) // -- to test if users get deleted

   // console.log(JSON.stringify(deliveriesArray))
   //   console.log(JSON.stringify(usersArray)) 
   
   // console.log("usersArray", JSON.stringify(usersArray[0]._id))
   // console.log("usersArray", JSON.stringify(typeof usersArray[0]._id))
   // console.log("usersArray", JSON.stringify(usersArray[0]._id.toString()))
   // console.log("usersArray",JSON.stringify( typeof usersArray[0]._id.toString()))
   
   // console.log("delivery", JSON.stringify(deliveriesArray[0].sender))
   // console.log("delivery",JSON.stringify( typeof deliveriesArray[0].sender))
   // console.log("delivery", JSON.stringify(deliveriesArray[0].sender.toString()))
   // console.log("delivery", JSON.stringify(typeof deliveriesArray[0].sender.toString()))
   
   /*
     A Scheduled Trigger will always call a function without arguments.
     Documentation on Triggers: https://docs.mongodb.com/realm/triggers/overview/
 
     Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.
 
     Access a mongodb service:
     const collection = context.services.get(<SERVICE_NAME>).db("db_name").collection("coll_name");
     const doc = collection.findOne({ name: "mongodb" });
 
     Note: In Atlas Triggers, the service name is defaulted to the cluster name.
 
     Call other named functions if they are defined in your application:
     const result = context.functions.execute("function_name", arg1, arg2);
 
     Access the default http client and execute a GET request:
     const response = context.http.get({ url: <URL> })
 
     Learn more about http client here: https://docs.mongodb.com/realm/functions/context/#context-http
   */
 };
 