const router = require("express").Router()
const homeRoutes = require("./homeRoutes");
const postRoutes = require("./postRoutes");

/* All html page routes would go here */
router.use("/post", postRoutes);
router.use("/", homeRoutes);

module.exports = router