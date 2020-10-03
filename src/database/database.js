const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/apijwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("db is connected"));
