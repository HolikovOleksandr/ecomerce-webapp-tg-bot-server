const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привіт! Як тебе звати?").then(() => {
    bot.once("message", (msg) => {
      const chatId = msg.chat.id;
      const userName = msg.text.replace("/start", ""); // Вилучення команди /start з повідомлення
      bot.sendMessage(
        chatId,
        `Приємно познайомитися, ${userName.trim()}! Вітаю тебе!`
      );
    });
  });
});
