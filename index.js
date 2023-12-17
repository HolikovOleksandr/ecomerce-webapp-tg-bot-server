const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const token = process.env.BOT_TOKEN;
const client = process.env.CLIENT;
const helloImg = process.env.HELLO_IMG;

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendPhoto(chatId, helloImg, {
      caption: "Welcome to secret shop!",
      reply_markup: {
        keyboard: [
          [{ text: "Input data!", web_app: { url: client + "/form" } }],
        ],
      },
    });

    await bot.sendMessage(chatId, "Visit shop", {
      reply_markup: {
        inline_keyboard: [[{ text: "Do order", web_app: { url: client } }]],
      },
    });
  }
});
