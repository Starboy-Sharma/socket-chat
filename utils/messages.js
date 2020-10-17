const moment = require("moment");

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}

function sayHello(username) {
  console.log(`Hello ${username} how are you ?`);
}

module.exports = {
  formatMessage,
  sayHello,
};
