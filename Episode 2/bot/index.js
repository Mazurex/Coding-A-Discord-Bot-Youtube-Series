const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const eventsDir = path.join(__dirname, "events");
const eventFolders = fs.readdirSync(eventsDir);

for (const folder of eventFolders) {
  const eventDir = path.join(eventsDir, folder);
  if (fs.lstatSync(eventDir).isDirectory()) {
    const eventFiles = fs
      .readdirSync(eventDir)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      try {
        const handler = require(path.join(eventDir, file));

        client.on(folder, (...args) => {
          handler(client, ...args);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}

client.login(process.env.token);
