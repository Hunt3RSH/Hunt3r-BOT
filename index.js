const express = require("express");
const tmi = require("tmi.js");
const app = express();

// Glitch expects a web server so we're starting express to take care of that.
// The page shows the same information as the readme and includes the remix button.
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

let listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

let options = {
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

// Set up our new TMI client and connect to the server.
let client = new tmi.client(options);
client.connect();

// We have debug enabled now but if not we want some sort of confirmation
// we've connected to the server.
client.on("connected", (address, port) => {
  console.log(`Connected to ${address}:${port}`);
});
// Масив із періодичними повідомленнями
const periodicMessages = [
    "💡 Не забувайте пити воду під час перегляду стріму!",
    "🔥 Підписуйтесь на канал, щоб не пропустити нові стріми!",
    "💬 Ставте свої запитання в чаті — стрімер готовий відповісти!",
    "🎮 Підтримайте стрімерa, використовуючи команду !підтримка",
    "📢 Приєднуйтесь до нашого Discord: https://discord.gg/CSMdbPCHXf",
    "🎥 Запросіть друзів на стрім, чим нас більше — тим цікавіше!",
    "😊 Залишайте ваші коментарі та думки у чаті — це допомагає стрімеру!",
  ];
  
  // Початковий індекс повідомлення
  let messageIndex = 0;
  
  // Інтервал для відправки повідомлень (наприклад, кожні 10 хвилин)
  setInterval(() => {
    const message = periodicMessages[messageIndex];
  
    // Відправляємо повідомлення в чат
    client.say("hunt3r_wtf", message);
  
    // Змінюємо індекс для наступного повідомлення
    messageIndex = (messageIndex + 1) % periodicMessages.length;
  }, 10 * 60 * 1000); // Інтервал у мілісекундах (10 хвилин)
  

const commands = {
  "!github": "https://github.com/Hunt3RSH",
  "!дс": "посилання на мій діскорд сервер https://discord.gg/CSMdbPCHXf",
  "!інста": "свіжі фотки, мого не свіжого інстаграму https://www.instagram.com/hunt3r_npc",
  "!ланки": "виробничі ланки ферми https://clan.cloudflare.steamstatic.com/images//45074709/c62569da04ae0daaaecbd810dec8255186bf39b1.jpg",
  "!підртимка": "'MONAпідримка': - це дуже легкий і гарний спосіб підтримати стрімера ось цим посиланням https://send.monobank.ua/jar/8GgAujGTyF",
  "!стім": "посилання на мій стім https://steamcommunity.com/id/Hunt3R_wise/",
  "!трейд": "https://steamcommunity.com/tradeoffer/new/?partner=144581493&token=vfpzrhJzn",
  "!dpi": "DPI: 800",
  "!github": "You can find it at github.com/shindakun",
  "!x": "тут я пишу інколи якісь пости https://x.com/Hunt3R__DEV",
};

client.on("chat", async (channel, user, message, self) => {
    console.log(client);
  if (self) return; // Ігноруємо повідомлення від самого бота
  // Перевіряємо
  if (message.includes("Ы") || message.includes("ы")) {
    const warningMessage = `@${user["display-name"]}, ви використали заборонений символ 'Ы'! Будь ласка, утримуйтесь від таких символів.`;

    try {
      // Відправляємо попередження в чат
      client.say(channel, warningMessage);
    } catch (err) {
      // Лог помилки (можна прибрати після тестування)
      console.error("Помилка при обробці повідомлення:", err);

      // Відправляємо сповіщення про помилку в чат (опціонально)
      client.say(channel, `Не вдалося надіслати попередження для @${user["display-name"]}.`);
    }
  }

  // Перевірка на використання саме слова "да"
  const words = message.toLowerCase().split(/\s+/); // Розбиваємо повідомлення на окремі слова

  if (words.includes("да")) { // Перевіряємо, чи є "да" в масиві слів
    try {
      // Відправляємо попередження в чат
      client.say(channel, `@${user["display-name"]}, використання слова "да" заборонено! Будь ласка, будьте уважні.`);
    } catch (err) {
      // Лог помилки
      console.error("Помилка при відправці попередження:", err);
    }
  }

  if (message.startsWith("!любов")) {
    // Отримуємо ім'я користувача, вказане після команди
    const args = message.split(" ");
    const targetUser = args[1];

    if (!targetUser || targetUser === `@${user["username"]}`) {
      // Якщо немає іншого користувача, або обрано самого себе
      client.say(
        channel,
        `@${user["display-name"]}, вкажіть ім'я іншого користувача! Наприклад: !любов @Streamer`
      );
    } else {
      // Генеруємо випадковий відсоток сумісності
      const compatibility = Math.floor(Math.random() * 100) + 1;
      client.say(
        channel,
        `@${user["display-name"]} та ${targetUser} підходять на ${compatibility}% 💕`
      );
    }
  }
  if (message.startsWith("!розмір")) {
    // Генеруємо випадкове число від 1 до 50
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

    // Відправляємо відповідь у чат
    client.say(channel, response);
  }
  if (message.startsWith("!розумник")) {
    const username = user['display-name'];

    // Категорії повідомлень
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

    // Випадковий вибір категорії
    const category = ['wise', 'funny'][Math.floor(Math.random() * 2)];
    // Випадковий вибір повідомлення
    const response = categories[category][Math.floor(Math.random() * categories[category].length)];

    // Відправка повідомлення в чат
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

    // Відправка повідомлення у чат
    client.say(channel, `@${user["display-name"]}, ось ваш випадковий напій: ${randomDrink}`);
}
   else if (commands[message]) {
    // Обробка інших команд
    client.say(channel, `${user["display-name"]}, ${commands[message]}`);
  }
});