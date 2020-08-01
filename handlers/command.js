const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = (client) => {


    const load = dirs => {
        const commands = readdirSync(join(__dirname, "..", `commands/${dirs}`)).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(join(__dirname, "..", `commands/${dirs}/${file}`));
            client.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
        };
    };
    ["music", "utilities"].forEach(x => load(x));
};