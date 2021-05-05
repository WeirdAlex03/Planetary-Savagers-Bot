
const Discord = require("discord.js");

module.exports = {
	name: "getEmbed",
	description: 'Gets an embed from the message ID (turn on developer mode in Discord > App Settings > Advanced and right click a message to see it).',
	usage: "getEmbed [channel=current_channel] <message_id>",
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

		targetChannel.messages.fetch(args[msgArgIndex]).then(msg => message.channel.send("Here you go:\n```json\n" + JSON.stringify(msg.embeds[0].toJSON()) + "\n```"));
	},
};
