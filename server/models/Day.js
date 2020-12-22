const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const daySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  scheduleId: [
    {
      type: ObjectId,
      ref: "Schedule",
    },
  ],
  picketId: [
    {
      type: ObjectId,
      ref: "Picket",
    },
  ],
});

module.exports = mongoose.model("Day", daySchema);
