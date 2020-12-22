const Day = require("../models/Day");
const Subject = require("../models/Subject");
const Schedule = require("../models/Schedule");

module.exports = {
  index: async (req, res) => {
    try {
      const subject = await Subject.find().sort("_id");
      const day = await Day.find().sort("_id");
      const schedule = await Schedule.find()
        .sort("dayId")
        .populate({
          path: "subjectId",
          select: "_id name",
        })
        .populate({
          path: "dayId",
          select: "_id name",
        });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/schedule/index", {
        day,
        subject,
        schedule,
        alert,
        title: "Kelas Kita | Schedule",
        view: "index",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/schedule");
    }
  },

  create: async (req, res) => {
    try {
      const { dayId, subjectId, start, end } = req.body;
      const day = await Day.findOne({ _id: dayId });
      const subject = await Subject.findOne({ _id: subjectId });
      const schedule = await Schedule.create({
        dayId: day._id,
        subjectId: subject._id,
        start,
        end,
      });
      day.scheduleId.push({ _id: schedule._id });
      await day.save();
      req.flash("alertMessage", "Success Add Schedule!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/schedule");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/schedule");
    }
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const subject = await Subject.find().sort("_id");
      const day = await Day.find().sort("_id");
      const schedule = await Schedule.findOne({ _id: id })
        .populate({
          path: "subjectId",
          select: "_id name",
        })
        .populate({
          path: "dayId",
          select: "_id name",
        });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/schedule/index", {
        day,
        subject,
        schedule,
        alert,
        title: "Kelas Kita | Schedule",
        view: "edit",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/schedule");
    }
  },

  update: async (req, res) => {
    const { id } = req.body;
    try {
      const { dayId, subjectId, start, end } = req.body;
      const day = await Day.findOne({ _id: dayId });
      const subject = await Subject.findOne({ _id: subjectId });
      const schedule = await Schedule.findOne({ _id: id });
      const cekDay = await Day.findOne({
        _id: schedule.dayId,
      }).populate("scheduleId");
      for (let i = 0; i < cekDay.scheduleId.length; i++) {
        if (cekDay.scheduleId[i]._id.toString() === schedule._id.toString()) {
          cekDay.scheduleId.pull({ _id: schedule._id });
          await cekDay.save();
        }
      }
      schedule.dayId = day._id;
      schedule.subjectId = subject._id;
      schedule.start = start;
      schedule.end = end;
      await schedule.save();
      day.scheduleId.push({ _id: id });
      await day.save();
      req.flash("alertMessage", "Success Update Schedule!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/schedule");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/schedule/${id}`);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findOne({ _id: id });
      const day = await Day.findOne({
        _id: schedule.dayId,
      }).populate("scheduleId");
      for (let i = 0; i < day.scheduleId.length; i++) {
        if (day.scheduleId[i]._id.toString() === schedule._id.toString()) {
          day.scheduleId.pull({ _id: schedule._id });
          await day.save();
        }
      }
      await schedule.remove();
      req.flash("alertMessage", "Success Delete Schedule!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/schedule");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/schedule");
    }
  },
};
