const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const picketSchema = new mongoose.Schema({
  dayId: {
    type: ObjectId,
    ref: "Day",
  },
  studentId: {
    type: ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("Picket", picketSchema);
