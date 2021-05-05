
const Discord = require("discord.js");

module.exports = {
	name: "makeEmbed",
	description: 'Sends a new embed to the specified channel. The embed is generated from JSON, which you can get from an embed generator like [this one](https://embedbuilder.nadekobot.me).',
	usage: "makeEmbed <channel> <json>",
	execute: async (bot, message, args, db) => {  /* lgtm [js/unused-local-variable] */ // jshint ignore:line
		var channels = message.mentions.channels.array();
		if (channels.length !== 1) {
				message.channel.send("ERROR: Please provide one channel to send the embed to", { code: "fix", });
		}
		
		var json = message.content.slice(message.content.indexOf("{"), message.content.lastIndexOf("}")+1);
		var embed = new Discord.MessageEmbed(JSON.parse(json));
		channels[0].send(embed).then(message.channel.send("Done!"));
	},
};
