require("dotenv").config();
const express = require("express");
const path = require("path");

const { init } = require("./database/mysql.connector");
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
app.use("/users",require("./routes/user.routes"));
app.use("/general",require("./routes/general.routes"));
app.use("/deliveries",require("./routes/deliveries.routes"));
app.use("/packages",require("./routes/packages.routes"));
app.use("/payment",require("./routes/payment.routes"));
app.use("/locations",require("./routes/locations.routes"));
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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