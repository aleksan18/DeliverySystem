exports = async function (changeEvent) {

    const routesCollection = context.services.get("Cluster0").db("Delivery_sistem").collection("Routes");
    const deliveriesCollection = context.services.get("Cluster0").db("Delivery_sistem").collection("Deliveries");

    // console.log(JSON.stringify(changeEvent.fullDocument))
    const route = changeEvent.fullDocument;
    const delivery_id = changeEvent.fullDocument.delivery
    const deliveryArray = await deliveriesCollection.find({ _id: delivery_id }).toArray();
    const delivery = deliveryArray[0]
    // console.log(JSON.stringify(delivery_id))
    // console.log(JSON.stringify(route))

    // console.log(JSON.stringify(typeof delivery.end_location.country_id.toString()))
    //   console.log(JSON.stringify(typeof route.end_location.country_id))
    const isCountrySame = delivery.end_location.country_id.toString() == route.end_location.country_id.toString()
    const isCitySame = delivery.end_location.city_id.toString() == route.end_location.city_id.toString()
    const isZipcodeSame = delivery.end_location.zip_code.toString() == route.end_location.zip_code.toString()
    const isAddressSame = delivery.end_location.address.toString() == route.end_location.address.toString()
    // console.log("isCountrySame", isCountrySame);
    // console.log("isCitySame", isCitySame);
    //   console.log(delivery.end_location.country_id.toString())
    //       console.log(route.end_location.country_id.toString())
    if (isCountrySame && isCitySame && isZipcodeSame && isAddressSame) {

         console.log("all good")
        // console.log(route.end_date)
        // console.log(new Date(route.end_date))
        deliveriesCollection.updateOne({ _id: delivery_id }, {
            "$set": {
                "date_frame": {
                    "estimated_date": new Date(delivery.date_frame.estimated_date),
                    "start_date": new Date(delivery.date_frame.start_date),
                    "end_date": new Date(route.end_date)
                }
            }
        })
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                     console.log(`Successfully added.`)
                }
            }).catch(err => console.error(`Failed to update delivery end_date: ${err}`))
    } else {
         console.log("bad")
    }
    // console.log("changeEvent.fullDocument._id: ", typeof changeEvent["fullDocument"]["_id"])

    // console.log("delivery", (JSON.stringify(delivery, null, 4)))

};


