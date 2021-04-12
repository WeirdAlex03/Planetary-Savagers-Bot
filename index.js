//Setup:
console.log("Starting bot");
//Imports the discord.js API to interact with Discord
const Discord = require("discord.js");
const client = new Discord.Client();
//Start a web server so Replit keeps the bot running
const keep_alive = require('./keep_alive.js');
//Brings in the token from the .env file
const token = process.env.BOT_TOKEN;
//Using a variable for the prefix makes it easy to change later
const prefix = "s!";
//Replit Database
const Database = require("@replit/database");
const db = new Database();


//Command handling
const fs = require("fs");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();
for (var file of commandFiles) {
	var command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Confirm that the bot has logged in
client.on("ready", () => {
	console.log(`${client.user.tag} is online and ready for action!\n`);

});

//Commands
client.on("message", (message) => {

});

//This line should always be the last one in the code
client.login(token);
