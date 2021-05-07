/*
ALL COPYRIGHT ©️ GO'S TO : @ニロ#٣٨٩٢
OUR YOUTUBE CHANNEL : https://youtube.com/channel/UC7QtAaqlUhBmMojJISSLJkg
*/

const express = require("express");
const app = express();

app.listen(() => console.log("💕💕💕💕"));

app.use("/ping", (req, res) => {
  res.send(new Date());
});

const Discord = require("discord.js");
const dark = new Discord.Client();
const x73db = require("x73db");
const ms1 = require("ms");
const db = new x73db("niro_coolshare");
const dba = new x73db("niro_cooldown");
const moment = require("moment");
const { pre1, activity, token } = require("./configuration");
process.on("unhandledRejection", error => {
  console.error(error);
});
dark.on("message", async message => {
  let timeout = 10000;
  let time = dba.get(`cool_${message.author.id}`);
  if (!time) time = 0;
  let r = ms1(timeout - (Date.now() - time), { long: true });
  let messagecool = `**Sorry please try again yet \`${r.replace(
    `seconds`,
    `Seconds`
  )}\`**`;
  if (message.author.bot) return;
  let args = message.content.split(" ");
  let sharebot = ["share", "", "", "post", "", "", "نشر"];
  let setshareroom = ["set-room", "set-share-room", `sr`];
  let help = ["help", "commands", "", "Commands"];
  let prefix = db.get(`prefix_${message.guild.id}`);
  let em = new Discord.MessageEmbed().setDescription(
    `**[ADD Bot](https://discord.com/api/oauth2/authorize?client_id=826163104067878963&permissions=8&scope=bot)\n[Bot Developer Support Server](https://discord.gg/KvVvnbVuVW)**`
  );
  if (!prefix) prefix = pre1;
  let cmd = args[0];
  if (cmd == "<@!776494689703559208>") {
    message.channel.send(`${prefix}`);
  } else if (cmd == prefix + "info") {
    if (time !== null && timeout - (Date.now() - time) > 0) {
      message.channel.send(`> ${messagecool}`);
    } else {
      if (!args[1]) {
        em.setTitle(`Info Prefix`);
        em.addField(`Prefix Here Is `, `${prefix}`);
        message.channel.send(em);
      } else {
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.channel.send(
            '```json\n{\n"Require Permission": "ADMINISTRATOR",\n"YouHaveIt":"False"\n}```'
          );
        em.setTitle(`Done Changed Prefix`);
        em.addField(`OldPrefix`, `**${prefix}**`);
        em.addField(`NewPrefix`, `**${args[1]}**`);
        message.channel.send(em);
        db.set(`prefix_${message.guild.id}`, args[1]);
      }
      dba.set(`cool_${message.author.id}`, Date.now());
    }
  } else if (sharebot.some(cmd => message.content.startsWith(prefix + cmd))) {
    if (time !== null && timeout - (Date.now() - time) > 0) {
      message.channel.send(`> ${messagecool}`);
    } else {
      let timeshare = 86400000;
      let times = db.get(`coolshare_${message.guild.id}`);
      if (times !== null && timeshare - (Date.now() - times) > 0) {
        let s = ms1(timeshare - (Date.now() - times), { long: true });
        message.channel.send(`You can not publish until after ${s}`);
      } else {
        var invite = await message.channel.createInvite();
        dark.guilds.cache.forEach(c => {
          let rooms = db.get(`shareroom_${c.id}`);
          let room = c.channels.cache.get(rooms);
          if (!room) return;

          room.send(
            `**NEW SERVER 🌟**
**Join Right Now ↓
${invite} 
**`
          );
        });
        let share_niro = new Discord.MessageEmbed()
          .setTitle("**Suscsuss**")
          .setDescription(`You Server Has Ben Shared !`);
        message.channel.send(share_niro);
        db.set(`coolshare_${message.guild.id}`, Date.now());
      }
      dba.set(`cool_${message.author.id}`, Date.now());
    }
  } else if (
    setshareroom.some(cmd => message.content.startsWith(prefix + cmd))
  ) {
    if (time !== null && timeout - (Date.now() - time) > 0) {
      message.channel.send(`> ${messagecool}`);
    } else {
      let room = message.mentions.channels.first();
      if (!room) return message.reply(`**I Can't Find ${args[1]}**`);
      message.channel.send(
        `**Done Set ${room} Share Room ID ROOM : \`${room.id}\`**`
      );
      db.set(`shareroom_${message.guild.id}`, room.id);
      dba.set(`cool_${message.author.id}`, Date.now());
    }
  } else if (help.some(cmd => message.content.startsWith(prefix + cmd))) {
    if (time !== null && timeout - (Date.now() - time) > 0) {
      message.channel.send(`> ${messagecool}`);
    } else {
      let embed = new Discord.MessageEmbed()
        .setTitle(`Bot Order`)
        .setAuthor(dark.user.username)
        .setColor(`RANDOM`)
        .setFooter("Developer : [@Dark Noah 🍭#0001]")
        .setThumbnail(dark.user.avatarURL())
        .addField(`> ${prefix}info`, `\`\`\`To view the bot information\`\`\``)
        .addField(`> ${prefix}share`, `\`\`\`To publish your server\`\`\``)
        .addField(`> ${prefix}set-share-room`, `\`\`\`To determine the publishing rom\`\`\``);
      message.channel.send(embed);
      dba.set(`cool_${message.author.id}`, Date.now());
    }
  } else if (args[0] == `<@!${dark.user.id}>`) {
    message.channel.send(prefix);
  }
});

dark.on("ready", () => {
  dark.user.setActivity(`${activity}`);
  console.log(dark.user.username);
});

const { Client } = require('discord.js');
const prefix = '!';

dark.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'stats') {
		return message.channel.send(`Server count: ${dark.guilds.cache.size}`);
	}
});


dark.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'stats') {
		return message.channel.send(`Server count: ${dark.guilds.cache.size}`);
	}
});
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('niro_share.js', { token: 'TOKEN' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();


dark.login("TOKEN");
