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
const { register, login, GoogleLogin } = require("../controllers/UserController");
const errorHandling = require("../helper/errorHanler");
const authentication = require("../middleWare/Authentication");
const { Admin, Member } = require("../middleWare/Authorization");

const router = require("express").Router();
const gemini = require("../helper/geminiAi");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/give-me-answer", async (req, res, next) =>{
  try {
    const { post1, post2 } = req.body
    let data = await gemini(post1, post2)
    
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: "ISE"
    })
  }
})
router.post("/user/login", login);
router.post("/login/google", GoogleLogin)
router.post("/user/register", register);

router.get("/public/allArts/:id", details);
router.get("/public/allArts", HomePublic);

router.use(authentication);
// router.post("/register", Admin, register);
router.get("/user/get/private/home", HomePrivate);
router.post("/user/post/private/arts", PostArt);
router.get("/user/get/private/arts/:id", DetailsArt);
router.put("/user/update/private/arts/:id", Member, UpdateArtById);
router.delete("/user/delete/private/arts/:id", Admin, DeleteArt);
router.patch("/user/patch/private/arts/:id/image-url", Member,);

router.get("/user/get/private/origins", OriginAll);
router.post("/user/post/private/by/origins", OriginCreate);
router.put("/user/put/private/origins/by/:id", Admin, OriginUpdate);



router.use(errorHandling);

module.exports = router;
