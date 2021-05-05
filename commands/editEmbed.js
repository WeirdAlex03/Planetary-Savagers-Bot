
const Discord = require("discord.js");

module.exports = {
	name: "editEmbed",
	description: 'Replaces the embed in the specified message with a new one. Turn on developer mode in Discord > App Settings > Advanced and right click a message to see the message ID and use an embed generator like [this one](https://embedbuilder.nadekobot.me) for the new embed.',
	usage: "editEmbed [channel=current_channel] <message_id> <json>",
	execute: async (bot, message, args, db) => {  /* lgtm [js/unused-local-variable] */ // jshint ignore:line
		var channels = message.mentions.channels.array();
		var targetChannel, msgArgIndex;
		if (channels.length === 1) {
			targetChannel = channels[0];
			msgArgIndex = 1;
		} else {
			targetChannel = message.channel;
			msgArgIndex = 0;
		}
		
		var json = message.content.slice(message.content.indexOf("{"), message.content.lastIndexOf("}")+1);
		var embed = new Discord.MessageEmbed(JSON.parse(json));

		targetChannel.messages.fetch(args[msgArgIndex]).then(msg => {
			msg.edit(embed).then(message.channel.send("Done!"));
		});
	},
};
