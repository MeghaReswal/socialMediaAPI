const express = require("express");
const dbConnection = require("./libs/mongo.js");
const routes = require("./routes/index.js");

const app = express();
app.use(express.json());

app.use("/api", routes);

app.listen(2000, () => {
  dbConnection();
});
