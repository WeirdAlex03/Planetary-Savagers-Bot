
const Discord = require("discord.js");

module.exports = {
	name: "deleteEmbed",
	description: 'Deletes an embed from the message ID (turn on developer mode in Discord > App Settings > Advanced and right click a message to see it).',
	usage: "deleteEmbed [channel=current_channel] <message_id>",
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

		targetChannel.messages.fetch(args[msgArgIndex]).then(msg => {
			if (bot.equals(msg.author)) {
				msg.delete().then(message.channel.send("Done!"));
			} else {
				message.channel.send("That's not one of my messages. I will only delete my own messages.");
			}
		});
	},
};
