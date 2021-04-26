//Setup:
console.log("Starting bot");
//Imports the discord.js API to interact with Discord
const Discord = require("discord.js");
const client = new Discord.Client();
//Start a web server so Replit keeps the bot running
const keep_alive = require('./keep_alive.js'); /* lgtm [js/unused-local-variable] */ // jshint ignore:line 
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

	client.user.setPresence({activity: { type: "PLAYING", name: `Prefix: ${prefix} | Just online, no commands set up yet ` }, status: "dnd"});

});

//Commands
client.on("message", (message) => {
	
	//Disregard if it was sent by a bot
	if(message.author.bot) {
		return;
	}
	//Disregard if it doesn't start with our prefix
	if(!message.content.toLowerCase().startsWith(prefix)) {
		return;
	}

	//Parse out the commands and arguments
	var args = message.content.slice(prefix.length).trim().split(" ");
	var command = args.shift();

	if (!client.commands.has(command)) {
		return message.reply(`I don't have a \`${command}\` command. Are you sure you spelled it right? Capitalization matters. Try using \`${prefix}help\` to see all my commands.`);
	}
	try {
		client.commands.get(command).execute(client.user, message, args, db);
	} catch (error) {
		console.error(error);
		message.reply(`there was an error trying to execute that command:\n\`\`\`diff\n+> ${message.cleanContent}\n-> ${error.name}: ${error.message.split('\n')}\`\`\``);
	}
	
});

//This line should always be the last one in the code
client.login(token);
