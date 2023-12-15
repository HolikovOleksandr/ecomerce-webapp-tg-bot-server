const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const client = process.env.CLIENT;
const helloImg = process.env.HELLO_IMG;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendPhoto(chatId, helloImg, {
      caption: "Welcome to secret shop!",
      reply_markup: {
        keyboard: [[{ text: "Get started!", web_app: { url: client } }]],
      },
    });
  }
});
