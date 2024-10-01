const { HomePublic, details } = require("../controllers/ArtController");
const { HomePrivate, PostArt, DetailsArt, UpdateArtById } = require("../controllers/ArtPrivateController");
const { OriginAll, OriginCreate, OriginUpdate } = require("../controllers/OriginController");
const { register, login } = require("../controllers/UserController");
const errorHandling = require("../helper/errorHanler");
const authentication = require("../middleWare/Authentication");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/register", register);
router.post("/login", login);

router.get("/public/allArts", HomePublic)
router.get("/public/detailsArts/:id", details)

router.use(authentication)
router.get("/private/home", HomePrivate)
router.post("/private/arts", PostArt)
router.get("/private/arts/:id", DetailsArt)
router.post("/private/arts/:id", UpdateArtById)
router.get("/private/origins", OriginAll)
router.post("/private/origins", OriginCreate)

router.put("/private/origins/:id", OriginUpdate)

router.use(errorHandling);

module.exports = router;

// npx sequelize-cli model:generate --name Art --attributes title:string,description:text,price:integer,artis:string,imageUrl:string,UserId:integer,OriginId:integer

// npx sequelize-cli model:generate --name Origin --attributes name:string

// npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string