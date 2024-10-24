const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");
const prefix = "!";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.username}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply("pong!");
  } else if (command === "hello") {
    message.channel.send("hello");
  }
});

client.login(config.token);
