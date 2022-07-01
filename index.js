const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const participants = require("./routes/participants");

const app = express();
const db = config.get("db");
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect", err));

require("./prod")(app);
app.use(express.json());
app.use(cors());

app.use("/api/participants", participants);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
