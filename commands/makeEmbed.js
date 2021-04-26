
const Discord = require("discord.js");

module.exports = {
	name: "makeEmbed",
	description: 'Sends a new embed to the specified channel. The embed is generated from JSON, c which you can get from an embed generator like [this one](https://embedbuilder.nadekobot.me).',
	usage: "makeEmbed <channel> <json>",
	execute: async (bot, message, args, db) => {  /* lgtm [js/unused-local-variable] */ // jshint ignore:line
		var channels = message.mentions.array();
		if (channels.length !== 1) {
				message.channel.send("ERROR: Please provide one channel to send the embed to", { code: "fix", });
		}
		var json = message.content.slice(message.content.indexOf("{"), message.content.lastIndexOf("}"));
		var embed = new Discord.MessageEmbed(JSON.parse(json));
		message.channel.send(embed);
		channels[0].send(embed).then(message.channel.send("Done!"));
	},
};
