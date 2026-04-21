const express = require("express");

const router = express.Router();

const {

  fetchAndStoreEmails,
  searchEmailsByKeyword

} = require("../controllers/mailController");


router.get("/fetch", fetchAndStoreEmails);

router.get("/search/:keyword", searchEmailsByKeyword);


module.exports = router;