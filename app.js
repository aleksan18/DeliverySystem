import userRoutes from './neo4j/routes/users.routes.js';
import deliveryRoutes from './neo4j/routes/delivery.routes.js'
import packageRoutes from './neo4j/routes/npackage.routes.js'
import routeRoutes from './neo4j/routes/route.routes.js'
import locationRoutes from './neo4j/routes/location.routes.js'
import driverRouters from './neo4j/routes/driver.routes.js'
import vehicleRoutes from './neo4j/routes/vehicle.routes.js'
require("dotenv").config();
const express = require("express");
const path = require("path");

const { init } = require("./mysql/database/mysql.connector");
const app = express();
const {startMongo} = require("./mongo/database/mongo.connection")
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/mongodb/users",require("./mongo/routes/user.routes"))
app.use("/mongodb/countries",require("./mongo/routes/country.routes"))
app.use("/mongodb/deliveries",require("./mongo/routes/delivery.routes"))
app.use("/mongodb/drivers",require("./mongo/routes/driver.routes"))
app.use("/mongodb/vehicles",require("./mongo/routes/vehicle.routes"))
app.use("/mongodb/routes",require("./mongo/routes/route.routes"))
app.use("/mysql/users",require("./mysql/routes/user.routes"));
app.use("/mysql/general",require("./mysql/routes/general.routes"));
app.use("/mysql/deliveries",require("./mysql/routes/deliveries.routes"));
app.use("/mysql/packages",require("./mysql/routes/packages.routes"));
app.use("/mysql/payments",require("./mysql/routes/payments.routes"));
app.use("/mysql/locations",require("./mysql/routes/locations.routes"));
app.use("/mysql/routes",require("./mysql/routes/routes.routes"));
app.use('/neo4j/users', userRoutes);
app.use('/neo4j/delivery', deliveryRoutes)
app.use('/neo4j/npackage', packageRoutes)
app.use('/neo4j/route', routeRoutes)
app.use('/neo4j/location', locationRoutes)
app.use('/neo4j/driver', driverRouters)
app.use('/neo4j/vehicle', vehicleRoutes)

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)
    );
    init();
    startMongo()
  } catch (e) {
    process.exit(1);
  }


}

start();