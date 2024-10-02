const { HomePublic, details } = require("../controllers/ArtPublicController");
const {
  HomePrivate,
  PostArt,
  DetailsArt,
  UpdateArtById,
  DeleteArt,
} = require("../controllers/ArtPrivateController");
const {
  OriginAll,
  OriginCreate,
  OriginUpdate,
} = require("../controllers/OriginController");
const { register, login } = require("../controllers/UserController");
const errorHandling = require("../helper/errorHanler");
const authentication = require("../middleWare/Authentication");
const { Admin, Member } = require("../middleWare/Authorization");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/login", login);
router.post("/register", register);

router.get("/public/allArts", HomePublic);
router.get("/public/detailsArts/:id", details);

router.use(authentication);
// router.post("/register", Admin, register);
router.get("/private/home", HomePrivate);
router.post("/private/arts", PostArt);
router.get("/private/arts/:id", DetailsArt);
router.put("/private/arts/:id", Member, UpdateArtById);
router.delete("/private/arts/:id", Admin, DeleteArt);
router.patch("/private/arts/:id/image-url", Member,);

router.get("/private/origins", OriginAll);
router.post("/private/origins", OriginCreate);
router.put("/private/origins/:id", Admin, OriginUpdate);

router.use(errorHandling);

module.exports = router;
