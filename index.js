const SlackBot = require("slackbots");
const axios = require("axios");
require('dotenv/config');

const bot = new SlackBot({
  token: process.env.token,
  name: "krisjokebot"
});

// Start
bot.on("start", () => {
  const params = {
    icon_emoji: ":gentlemanparrot:"
  };

  bot.postMessageToChannel(
    "techtrends",
    "LETS GET READY TO RUMBLE...with jokes",
    params
  );
});

//Error handling
bot.on("error", err => console.log(err));

//Message Handling
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }

  handleMessage(data.text);
});

// Responds to message data

function handleMessage(message) {
  if (message.includes(" chucknorris" || "")) {
    chuckJoke();
  } else if(message.includes( 'yomama')) {
    yoMamaJoke();
  }
}

//Chuck Norris joke

function chuckJoke() {
  axios.get("http://api.icndb.com/jokes/random").then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("techtrends", `Chuck Norris: ${joke}`, params);
  });
}

function yoMamaJoke() {
  axios.get("http://api.yomomma.info").then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("techtrends", `${joke}`, params);
  });
}