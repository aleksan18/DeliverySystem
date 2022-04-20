const express = require("express");
const path = require("path");


const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  
  const PORT = process.env.PORT || 5000;
  
  async function start() {
    try {
  
  
    } catch (e) {
      process.exit(1);
    }
    
  
  }
  
  start();