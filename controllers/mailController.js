const Mail = require("../models/Mail");

const {
  gmail,
  fetchEmailsFromInbox
} = require("../services/gmailService");


// Fetch emails from Gmail and store into MongoDB

exports.fetchAndStoreEmails = async (req, res) => {

  try {

    const messages = await fetchEmailsFromInbox();

    let savedEmails = [];

    for (let msg of messages) {

      const email = await gmail.users.messages.get({
        userId: "me",
        id: msg.id
      });

      const headers = email.data.payload.headers;

      const subject =
        headers.find(h => h.name === "Subject")?.value || "No Subject";

      const from =
        headers.find(h => h.name === "From")?.value || "Unknown Sender";


      const storedMail = await Mail.create({

        subject,
        from,
        snippet: email.data.snippet,
        date: new Date(parseInt(email.data.internalDate))

      });

      savedEmails.push(storedMail);
    }

    res.json({
      message: "Emails fetched and stored successfully",
      count: savedEmails.length,
      data: savedEmails
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};



// Keyword search analytics

exports.searchEmailsByKeyword = async (req, res) => {

  try {

    const keyword = req.params.keyword;

    const emails = await Mail.find({

      $or: [

        { subject: { $regex: keyword, $options: "i" } },

        { snippet: { $regex: keyword, $options: "i" } },

        { from: { $regex: keyword, $options: "i" } }

      ]

    });

    res.json({

      keyword,
      results: emails.length,
      emails

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};