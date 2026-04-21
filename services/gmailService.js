const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const gmail = google.gmail({
  version: "v1",
  auth: oAuth2Client
});


const fetchEmailsFromInbox = async () => {

  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults: 20
  });

  return response.data.messages;
};

module.exports = {
  gmail,
  fetchEmailsFromInbox
};