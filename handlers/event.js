const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = (client, message, msg) => {
  const load = dirs => {
    const events = readdirSync(join(__dirname, "..", `events/${dirs}/`)).filter(d => d.endsWith('.js'));
    for (let file of events) {
      const evt = require(join(__dirname, "..", `events/${dirs}/${file}`));
      let eName = file.split('.')[0];
      client.on(eName, evt.bind(null, client));
    };
  };
  ["client", "guild"].forEach(x => load(x));
};