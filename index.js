const express = require("express");
const tmi = require("tmi.js");
const app = express();

// Налаштування сервера
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

let listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// Налаштування TMI клієнта
const options = {
  options: {
    debug: true,
    messagesLogLevel: "info",
    tags: true,
  },
  connection: {
    cluster: "aws",
    reconnect: true,
    secure: true,
  },
  identity: {
    clientId: process.env.CLIENT_ID,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  channels: ["hunt3r_wtf"],
};

const client = new tmi.client(options);
client.connect();

// Лог повідомлень при підключенні
client.on("connected", (address, port) => {
  console.log(`Connected to ${address}:${port}`);
});

// Масив періодичних повідомлень
const periodicMessages = [
  "💡 Не забувайте пити воду під час перегляду стріму!",
  "🔥 Підписуйтесь на канал, щоб не пропустити нові стріми!",
  "💬 Ставте свої запитання в чаті — стрімер готовий відповісти!",
  "🎮 Підтримайте стрімерa, використовуючи команду !підтримка",
  "📢 Приєднуйтесь до нашого Discord: https://discord.gg/CSMdbPCHXf",
  "🎥 Запросіть друзів на стрім, чим нас більше — тим цікавіше!",
  "😊 Залишайте ваші коментарі та думки у чаті — це допомагає стрімеру!",
];

// Інтервал для періодичних повідомлень (10 хвилин)
let messageIndex = 0;
setInterval(() => {
  const message = periodicMessages[messageIndex];
  client.say("hunt3r_wtf", message);
  messageIndex = (messageIndex + 1) % periodicMessages.length;
}, 10 * 60 * 1000); // Інтервал у мілісекундах

// Команди для чату
const commands = {
  "!github": "https://github.com/Hunt3RSH",
  "!дс": "посилання на мій діскорд сервер https://discord.gg/CSMdbPCHXf",
  "!інста": "свіжі фотки, мого не свіжого інстаграму https://www.instagram.com/hunt3r_npc",
  "!ланки": "виробничі ланки ферми https://clan.cloudflare.steamstatic.com/images//45074709/c62569da04ae0daaaecbd810dec8255186bf39b1.jpg",
  "!підртимка": "'MONAпідтримка': - це дуже легкий і гарний спосіб підтримати стрімера ось цим посиланням https://send.monobank.ua/jar/8GgAujGTyF",
  "!стім": "посилання на мій стім https://steamcommunity.com/id/Hunt3R_wise/",
  "!трейд": "https://steamcommunity.com/tradeoffer/new/?partner=144581493&token=vfpzrhJzn",
  "!dpi": "DPI: 800",
  "!github": "You can find it at github.com/shindakun",
  "!x": "тут я пишу інколи якісь пости https://x.com/Hunt3R__DEV",
};

// Обробка чат повідомлень
client.on("chat", async (channel, user, message, self) => {
  if (self) return; // Ігноруємо повідомлення від самого бота

  // Перевірка на використання символу 'Ы'
  if (message.includes("Ы") || message.includes("ы")) {
    const warningMessage = `Привіт, @${user["display-name"]}, що за невідомий символ 'Ы' у твоєму повідомленні? Може, це зашифроване послання? Ти точно хочеш, щоб ми зрозуміли?`;
    client.say(channel, warningMessage);
  }

  // Перевірка на використання слова "да"
  const words = message.toLowerCase().split(/\s+/);
  if (words.includes("да")) {
    const warningMessage = `Попався @${user["display-name"]}, Ого, ти сказав 'да'? Я навіть не знаю, як з цим жити. 😱 Будь ласка, обирай слова мудріше, щоб не впасти в гріх!`;
    client.say(channel, warningMessage);
  }

  // Обробка команд
  if (message.startsWith("!любов")) {
    const args = message.split(" ");
    const targetUser = args[1];

    if (!targetUser || targetUser === `@${user["username"]}`) {
      client.say(channel, `@${user["display-name"]}, вкажіть ім'я іншого користувача! Наприклад: !любов @Streamer`);
    } else {
      const compatibility = Math.floor(Math.random() * 100) + 1;
      client.say(channel, `@${user["display-name"]} та ${targetUser} підходять на ${compatibility}% 💕`);
    }
  }

  if (message.startsWith("!розмір")) {
    const n = Math.floor(Math.random() * 50) + 1;
    const username = user["display-name"];
    let response = "";

    if (n <= 15) {
      response = `😅 Ну що, ${username}, головне не розмір, а харизма! ${n} см`;
    } else if (n <= 35) {
      response = `👌 ${username}, цілком гідний результат! Тримайся впевнено ${n} см`;
    } else {
      response = `🔥 ${username}, ну це вже рекорд! Вражаючі показники ${n} см 💪`;
    }

    client.say(channel, response);
  }

  if (message.startsWith("!розумник")) {
    const username = user["display-name"];
    const categories = {
      wise: [
        `${username}, пий більше води! 💧`,
        `Якщо хочеш змін, почни з себе, ${username}! ✨`,
        `Твій день буде успішним, ${username}, якщо почнеш із посмішки! 😊`,
      ],
      funny: [
        `${username}, не забудь: ти геній, тільки ніхто цього не помітив! 🤔`,
        `${username}, не намагайся бути ідеальним — це вже моє місце 😎`,
      ],
    };

    const category = ['wise', 'funny'][Math.floor(Math.random() * 2)];
    const response = categories[category][Math.floor(Math.random() * categories[category].length)];
    client.say(channel, response);
  }

  if (message.startsWith("!хто")) {
    const users = [
      `Ти сам, @${user["username"]}`,
      "Модератор @justbios",
      "Кіт на клавіатурі",
      "Рандомний незнайомець",
      "Автор стріму",
    ];
    const reasons = [
      "загубив ключі від стріму 🎮",
      "з'їв останній шматок піци 🍕",
      "зламав сервер Twitch 🖥️",
      "заспівав караоке на всю потужність 🎶",
      "почав нову мемну війну у чаті 💥",
      "приніс чаю замість кави ☕",
      "натиснув alt+f4 під час гри",
    ];

    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    const response = `${randomUser} винен у тому, що ${randomReason}!`;
    client.say(channel, response);
  }

  if (message.startsWith("!напій")) {
    const drinks = [
      "Чашка ароматної кави ☕",
      "Охолоджений лимонад 🍋",
      "Чай із бергамотом 🍵",
      "Склянка свіжовичавленого апельсинового соку 🍊",
      "Кубок гарячого шоколаду 🍫",
      "Холодний молочний коктейль 🥛",
      "Енергетичний напій для бадьорості ⚡",
      "Свіжа вода з м'ятою 💧",
      "Піна-колада (безалкогольна версія) 🍹",
      "Домашній узвар 🍎",
      "Холодне пиво 🍺",
    ];

    const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
    client.say(channel, `@${user["display-name"]}, ось ваш випадковий напій: ${randomDrink}`);
  }

  // Обробка інших команд
  if (commands[message]) {
    client.say(channel, `${user["display-name"]}, ${commands[message]}`);
  }
});
