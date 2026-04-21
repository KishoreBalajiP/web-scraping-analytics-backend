const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

/*
Set refresh token
*/
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

/*
Initialize Gmail API
*/
const gmail = google.gmail({
  version: "v1",
  auth: oAuth2Client
});


/*
Fetch latest inbox emails
(Serverless-safe version)
*/
const fetchEmailsFromInbox = async () => {

  try {

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 20
    });

    // Prevent crash if inbox empty
    return response.data.messages || [];

  } catch (error) {

    console.error("Gmail fetch error:", error.message);

    throw error;
  }
};


module.exports = {
  gmail,
  fetchEmailsFromInbox
};