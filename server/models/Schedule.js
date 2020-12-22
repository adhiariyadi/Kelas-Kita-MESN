const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const scheduleSchema = new mongoose.Schema({
  dayId: {
    type: ObjectId,
    ref: "Day",
  },
  subjectId: {
    type: ObjectId,
    ref: "Subject",
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
