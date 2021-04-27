
const Discord = require("discord.js");

module.exports = {
	name: "getEmbed",
	description: 'Gets an embed from the message ID (turn on developer mode in Discord > App Settings > Advanced and right click a message to see it). This can be from any user',
	usage: "getEmbed <message id>",
	execute: async (bot, message, args, db) => {  /* lgtm [js/unused-local-variable] */ // jshint ignore:line
		var targetChannel = (message.guild.channels.cache.find(channel => channel.name === message.channel.name));
		targetChannel.messages.fetch(args[0]).then(msg => message.reply(JSON.stringify(msg.embeds[0].toJSON()), {"code": "json"}));
	},
};
