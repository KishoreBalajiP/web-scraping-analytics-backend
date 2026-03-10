const router = require("express").Router();
const { runScraper } = require("../controllers/scrapeController");

router.get("/", runScraper);

module.exports = router;