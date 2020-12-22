var router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const StudentController = require("../controllers/StudentController");
const SubjectController = require("../controllers/SubjectController");
const ScheduleController = require("../controllers/ScheduleController");
const PicketController = require("../controllers/PicketController");
const ArticleController = require("../controllers/ArticleController");
const { uploadStudent, uploadArticle } = require("../middleware/Multer");
const auth = require("../middleware/Auth");

router.get("/", function (req, res, next) {
  res.redirect("/admin/signin");
});

// router auth
router.get("/admin/signup", AuthController.signup);
router.post("/admin/register", AuthController.register);
router.get("/admin/signin", AuthController.signin);
router.post("/admin/login", AuthController.login);
router.use(auth);
router.get("/admin/logout", AuthController.logout);

// router dashboard
router.get("/admin/dashboard", HomeController.index);

// router user
router.get("/admin/user", UserController.index);
router.post("/admin/user", UserController.create);
router.put("/admin/user", UserController.update);
router.delete("/admin/user/:id", UserController.delete);

// router student
router.get("/admin/student", StudentController.index);
router.post("/admin/student", uploadStudent, StudentController.create);
router.put("/admin/student", uploadStudent, StudentController.update);
router.delete("/admin/student/:id", StudentController.delete);

// router subject
router.get("/admin/subject", SubjectController.index);
router.post("/admin/subject", SubjectController.create);
router.put("/admin/subject", SubjectController.update);
router.delete("/admin/subject/:id", SubjectController.delete);

// router schedule
router.get("/admin/schedule", ScheduleController.index);
router.post("/admin/schedule", ScheduleController.create);
router.get("/admin/schedule/:id", ScheduleController.edit);
router.put("/admin/schedule", ScheduleController.update);
router.delete("/admin/schedule/:id", ScheduleController.delete);

// router picket
router.get("/admin/picket", PicketController.index);
router.post("/admin/picket", PicketController.create);
router.get("/admin/picket/:id", PicketController.edit);
router.put("/admin/picket", PicketController.update);
router.delete("/admin/picket/:id", PicketController.delete);

// router article
router.get("/admin/article", ArticleController.index);
router.post("/admin/article", uploadArticle, ArticleController.create);
router.put("/admin/article", uploadArticle, ArticleController.update);
router.delete("/admin/article/:id", ArticleController.delete);

module.exports = router;
