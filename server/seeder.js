require("dotenv").config();
const seeder = require("mongoose-seed");
const mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`,
  {
    useNewUrlParser: false,
    useCreateIndex: false,
    useFindAndModify: false,
    useUnifiedTopology: false,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels(["./models/Day", "./models/User"]);

    // Clear specified collections
    seeder.clearModels(["Day", "User"], function () {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
    });
  }
);

var data = [
  // start day
  {
    model: "Day",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        name: "Senin",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        name: "Selasa",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
        name: "Rabu",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901114"),
        name: "Kamis",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901115"),
        name: "Jum'at",
      },
    ],
  },
  // end day

  // start user
  {
    model: "User",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901324"),
        name: "Admin",
        username: "admin",
        password: "admin",
      },
    ],
  },
  // end user
];
