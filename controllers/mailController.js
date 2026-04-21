const Mail = require("../models/Mail");

const {
  gmail,
  fetchEmailsFromInbox
} = require("../services/gmailService");


/*
Fetch emails from Gmail and store into MongoDB
(Serverless-safe version)
*/

exports.fetchAndStoreEmails = async (req, res) => {
  try {

    const messages = await fetchEmailsFromInbox();

    if (!messages || messages.length === 0) {
      return res.json({
        message: "No emails found in inbox",
        count: 0,
        data: []
      });
    }

    let savedEmails = [];

    for (let msg of messages) {

      try {

        const email = await gmail.users.messages.get({
          userId: "me",
          id: msg.id
        });

        const headers = email.data.payload.headers || [];

        const subject =
          headers.find(h => h.name === "Subject")?.value ||
          "No Subject";

        const from =
          headers.find(h => h.name === "From")?.value ||
          "Unknown Sender";

        const snippet = email.data.snippet || "";

        const date = new Date(
          parseInt(email.data.internalDate)
        );


        /*
        Prevent duplicate inserts
        (important for repeated fetch calls)
        */

        const storedMail = await Mail.findOneAndUpdate(
          { snippet },
          {
            subject,
            from,
            snippet,
            date
          },
          {
            upsert: true,
            new: true
          }
        );

        savedEmails.push(storedMail);

      } catch (innerError) {

        console.error(
          "Error processing single email:",
          innerError.message
        );

        continue;
      }
    }

    res.json({
      message: "Emails fetched and stored successfully",
      count: savedEmails.length,
      data: savedEmails
    });

  } catch (error) {

    console.error("Fetch emails error:", error);

    res.status(500).json({
      error: "Failed to fetch emails",
      details: error.message
    });
  }
};



/*
Keyword search analytics
(Serverless-safe + frontend-friendly response)
*/

exports.searchEmailsByKeyword = async (req, res) => {

  try {

    const keyword = req.params.keyword;

    if (!keyword) {
      return res.json({
        keyword: "",
        results: 0,
        emails: []
      });
    }

    const emails = await Mail.find({

      $or: [

        {
          subject: {
            $regex: keyword,
            $options: "i"
          }
        },

        {
          snippet: {
            $regex: keyword,
            $options: "i"
          }
        },

        {
          from: {
            $regex: keyword,
            $options: "i"
          }
        }

      ]

    }).limit(50); // prevent heavy queries on serverless

    res.json({

      keyword,
      results: emails.length,
      emails

    });

  } catch (error) {

    console.error("Search emails error:", error);

    res.status(500).json({
      error: "Search failed",
      details: error.message
    });
  }
};