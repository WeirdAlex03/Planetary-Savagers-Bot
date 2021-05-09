const Discord = require("discord.js");

module.exports = {
	name: "about",
	description: "See more information about this bot",
	usage: "about",
	execute: async (bot, message, args, db) => {  /* lgtm [js/unused-local-variable] */ // jshint ignore:line

		var embed = new Discord.MessageEmbed()
			.setTitle(`About ${bot.username}`)
			.setDescription("A custom Discord bot for the Planetary Savagers Discord server. Use `s!help` to see all available commands.")
			.setThumbnail("https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/2139.png")
			.addField("Bot", `${bot.username} developed by [WeirdAlex03](https://github.com/WeirdAlex03/) / WeirdAlex03#5049\nCopyright 2021, Alex McHugh under [ISC License](https://github.com/WeirdAlex03/Planetary-Savagers-Bot/blob/master/LICENSE.txt)`)
			.addField("Profile Picture", "Bot profile picture from Planetary Savagers server logo. Contact admins for more info.")
			.addField("Tweemoji", "Some embed images provided by [Tweemoji](https://twemoji.twitter.com/)\nCopyright 2020 Twitter, Inc and other contributors\nGraphics licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)")
			.setFooter("Requested by " + message.author.username, message.author.displayAvatarURL())
			.setTimestamp()
			.setColor("PURPLE")
		;
		message.channel.send(embed);

	},
};
