const axios = require("axios");
const cheerio = require("cheerio");

const Message = require("../models/Message");
const Telemetry = require("../models/Telemetry");
const categorize = require("../utils/categorize");

exports.runScraper = async (req, res) => {

  try {

    const url = "https://news.ycombinator.com/";

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    let inserted = 0;
    let skipped = 0;

    const titles = [];

    $(".titleline a").each((i, el) => {
      titles.push($(el).text());
    });

    for (const title of titles) {

      // Check if message already exists
      const exists = await Message.findOne({ subject: title });

      if (exists) {
        skipped++;
        continue;
      }

      const msg = new Message({
        sender: "news@ycombinator.com",
        subject: title,
        category: categorize(title),
        timestamp: new Date()
      });

      await msg.save();
      inserted++;
    }

    let telemetry = await Telemetry.findOne();

    if (!telemetry) {

      telemetry = new Telemetry({
        numberOfScrapes: 1,
        totalMessagesStored: inserted,
        recordsInsertedLastRun: inserted,
        lastScrapeTime: new Date()
      });

    } else {

      telemetry.numberOfScrapes += 1;
      telemetry.totalMessagesStored += inserted;
      telemetry.recordsInsertedLastRun = inserted;
      telemetry.lastScrapeTime = new Date();

    }

    await telemetry.save();

    res.json({
      message: "Scraping completed",
      inserted,
      skippedDuplicates: skipped
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};