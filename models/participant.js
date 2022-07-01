const mongoose = require("mongoose");
const Joi = require("joi");

const participantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  organisation: { type: String, required: true },
});

const Participant = mongoose.model("Participant", participantSchema);

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  organisation: Joi.string().required(),
});

function validateParticipant(participant) {
  return schema.validate(participant, { abortEarly: false });
}

module.exports.Participant = Participant;
module.exports.validateParticipant = validateParticipant;
