const express = require("express");
const router = express.Router();
const { Participant, validateParticipant } = require("../models/participant");

router.post("/", async (req, res) => {
  const { error } = validateParticipant(req.body);
  if (error && error.details[0].path[0] !== "phone") {
    const ex = { errors: {} };
    for (let item of error.details) {
      ex.errors[item.path[0]] = item.message;
    }
    res.status(400).send(ex);
    return;
  }

  let participant = await Participant.findOne({ email: req.body.email });
  if (participant)
    return res.status(400).send({
      errors: { emailRegistered: "Email already registered" },
    });

  try {
    participant = new Participant({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      organisation: req.body.organisation,
      phone: req.body.phone,
    });
    participant = await participant.save();
    res.send(participant._id);
  } catch (ex) {
    res.status(400).send(ex);
  }
});

router.get("/", async (req, res) => {
  const participants = await Participant.find();
  res.send(participants);
});

router.get("/hello", async (req, res) => {
  res.send("Hello");
});

module.exports = router;
