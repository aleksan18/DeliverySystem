exports = async function () {

  const usersCollection = context.services.get("Cluster0").db("Delivery_sistem").collection("Users");
  const deliveriesCollection = context.services.get("Cluster0").db("Delivery_sistem").collection("Deliveries");


  const deliveriesArray = await deliveriesCollection.find().toArray();
  const usersArray = await usersCollection.find().toArray();
  usersArray.forEach((user) => {
    const sentDeliveriesByUser = deliveriesArray.filter((delivery) => {

      return user._id.toString() == delivery.sender.toString() //compare user_id with delivery_sender_id and if they match, gather all the deliveries and save into user
    })
    user.sentDeliveriesByUser = [...sentDeliveriesByUser]
    // console.log(JSON.stringify(user.sentDeliveriesByUser.length))
  })

  usersArray.forEach((user) => {
    // sorting deliveries ascending
    user.sentDeliveriesByUser.sort((delivery_a, delivery_b) => new Date(delivery_a.date_frame.start_date.toString()) - new Date(delivery_b.date_frame.start_date.toString()))

  })

  usersArray.forEach((user) => {
    const totalNumberOfDeliveries = user.sentDeliveriesByUser.length
    if (totalNumberOfDeliveries > 0) {
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

};
