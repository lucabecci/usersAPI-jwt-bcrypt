const express = require("express");

const app = express();
//config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes
const authRoutes = require("./routes/user.routes");
app.use(authRoutes);
//exported app
module.exports = app;
