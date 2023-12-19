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

  if (msg.web_app_data?.data) {
    try {
      const data = JSON.parse(msg.web_app_data?.data);

      await bot.sendMessage(chatId, "Your country is " + data?.country);
      await bot.sendMessage(chatId, "Your city is " + data?.city);

      setTimeout(async () => {
        await bot.sendMessage(chatId, "TY!");
      }, 3500);
    } catch (error) {
      console.log(error);
    }
  }
});

app.post("/web-data", async (req, res) => {
  const { queryId, products, totalProce } = req.body;

  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Congratulations!",
      input_message_content: {
        message_text: `You have successfully purchased a product for the ${totalProce}`,
      },
    });

    return res.status(200).json({});
  } catch (error) {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Something went wrong!",
      input_message_content: {
        message_text: error,
      },
    });

    return res.status(500).json({});
  }
});

const PORT = 3500;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
