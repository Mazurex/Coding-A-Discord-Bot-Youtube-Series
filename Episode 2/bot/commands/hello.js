module.exports = {
  name: "hello",
  description: "Sends hello to the channel",
  execute(message, args) {
    message.channel.send("hello");
  },
};
