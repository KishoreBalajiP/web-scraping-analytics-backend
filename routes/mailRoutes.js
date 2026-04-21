const express = require("express");

const router = express.Router();

const {
  fetchAndStoreEmails,
  searchEmailsByKeyword
} = require("../controllers/mailController");

/*
Fetch Gmail emails and store in MongoDB
*/
router.get("/fetch", fetchAndStoreEmails);

/*
Keyword analytics search
*/
router.get("/search/:keyword?", (req, res, next) => {
  if (!req.params.keyword) {
    return res.json({
      keyword: "",
      results: 0,
      emails: []
    });
  }

  next();
}, searchEmailsByKeyword);

module.exports = router;