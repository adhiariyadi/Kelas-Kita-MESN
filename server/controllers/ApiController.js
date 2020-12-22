const Student = require("../models/Student");
const Article = require("../models/Article");
const Day = require("../models/Day");

module.exports = {
  index: async (req, res) => {
    try {
      const student = await Student.find()
        .sort("id")
        .select("_id name description image")
        .limit(4);
      const article = await Article.find()
        .sort({ _id: -1 })
        .select("_id title content image created")
        .limit(3)
        .populate({
          path: "userId",
          select: "_id name",
        });
      res.status(200).json({
        student,
        article,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  siswa: async (req, res) => {
    try {
      const student = await Student.find()
        .sort("id")
        .select("_id name description image");
      res.status(200).json(student);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  siswaDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findOne({ _id: id }).select(
        "_id name description image"
      );
      res.status(200).json(student);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  jadwal: async (req, res) => {
    try {
      const day = await Day.find()
        .sort("id")
        .select("_id name scheduleId")
        .populate({
          path: "scheduleId",
          select: "_id subjectId start end",
          populate: {
            path: "subjectId",
            select: "_id name",
          },
        });
      res.status(200).json(day);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  piket: async (req, res) => {
    try {
      const day = await Day.find()
        .sort("id")
        .select("_id name picketId")
        .populate({
          path: "picketId",
          select: "_id studentId",
          populate: {
            path: "studentId",
            select: "_id name",
          },
        });
      res.status(200).json(day);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  artikel: async (req, res) => {
    try {
      const article = await Article.find()
        .sort("id")
        .select("_id title content image created")
        .populate({
          path: "userId",
          select: "_id name",
        });
      res.status(200).json(article);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  artikelDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findOne({ _id: id })
        .select("_id title content image created")
        .populate({
          path: "userId",
          select: "_id name",
        });
      res.status(200).json(article);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};
