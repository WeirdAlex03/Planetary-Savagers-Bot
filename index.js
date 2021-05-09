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
client.once("ready", () => {
	console.log(`${client.user.tag} is online and ready for action!\n`);

	client.user.setPresence({
			activity: { 
				type: "WATCHING", 
				name: `for ${prefix}help | Now with embedding!`, 
			}, 
			status: "online",
		},
	);

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

	if (command === "help") {
		try {
			return showHelp(message, args);
		} catch (error) {
			console.error(error);
			message.reply(`there was an error trying to execute that command:\n\`\`\`diff\n+> ${message.cleanContent}\n-> ${error.name}: ${error.message.split('\n')}\`\`\``);
		}
	}

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

function showHelp(message, args) {

	const COMMANDS_TO_INCLUDE = ["help", "about", "makeEmbed", "getEmbed", "editEmbed", "deleteEmbed", ];

	var embed = new Discord.MessageEmbed()
		.setTitle("Commands")
		.setDescription("Syntax: `<required_param>` | `[optional_param=default_value]`\nNote: Do not literally type out `<>` or `[]`. Replace them with your parameters")
		.setThumbnail("https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/2754.png")
		.setFooter("Requested by " + message.author.username, message.author.displayAvatarURL())
		.setTimestamp()
		.setColor("PURPLE")
	;

	if (args.length === 0 || !client.commands.has(args[0])) {
		//No argument given
		for (var commandName of COMMANDS_TO_INCLUDE) {
			var command = client.commands.get(commandName);
			embed.addField(command.name.charAt(0).toUpperCase() + command.name.substr(1).toLowerCase(), `Usage: \`${prefix}${command.usage}\`
			*${command.description}*`);
		}
	} else {
		//Given argument
		var command = client.commands.get(args[0]);	// jshint ignore:line
		embed.addField(command.name.charAt(0).toUpperCase() + command.name.substr(1).toLowerCase(), `Usage: \`${prefix}${command.usage}\`
		*${command.description}*`);
	}
	
	message.channel.send(embed);
}

client.once("invalidated", () => {
	console.error("Client session invalidated, terminating program.")
	process.exit(1);
});

//This line should always be the last one in the code
client.login(token);
