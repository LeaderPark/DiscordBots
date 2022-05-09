const Discord = require('discord.js');
const fs = require('fs');
const ChatLog = require("discordjs-chatlog"); //imports the module
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { prefix, token, search } = require('./config.json'); //동일 루트에 있는 config.json을 불러옴

const client = new Discord.Client();

client.on('ready', () => { // 봇이 준비되면 
  
  console.log(`${client.user.tag} 로그인 완료!`);  //메시지 전송  
  client.user.setActivity('GGM 블서봇 개발', { type: 'PLAYING' });

});

client.on('guildMemberAdd', member => { //맴버가 처음 들어왔을 때 
  
  const channel = member.guild.channels.cache.find(ch => ch.name === '환영'); //' '이라는 채널을 찾아서 
  if (!channel) return; //없으면 그냥 return하고 
  const messages = [`어라, 벌써 업무시간이군요? ${member}님`, `${member}님 손해보는 일은... 없을 겁니다.`, `후후... ${member}님 잘 부탁드립니다.`, `${member} 넌 뭐야!`]
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]; //messages값 만큼 랜덤 돌려서 
  channel.send(randomMessage) //특정 하나 출력

});

client.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  let log = new ChatLog(); //constructor
  log.setMessage(message.content); //매세지 설정
  log.setId(`${message.channel}`); //메세지 보낸 채널 
  log.setTag(`${message.author}`); //메세지 보낸 유저
  log.setTimestamp(Date.now()); //시간 설정

    message.guild.channels.cache.find(c => c.name === "chat-log").send(log.generateEmbed()); //sends the embed in a channel called "log"

  if (command === 'test') 
  {
    const attachment = new Discord.MessageAttachment('./img/1.png', '1.png','./img/2.png','2.png');
    const embed = new MessageEmbed()
    .setAuthor('GGM 블서봇')  
    .setColor('#0099ff')
    .setTitle('Test Complete')
    .setThumbnail('attachment://2.png')
    .addField('지연 시간',`${Date.now() - message.createdTimestamp}ms`)
    .addField('API지연 시간',`${Math.round(client.ws.ping)}ms`)
    .setTimestamp() 
    .attachFiles(attachment) //사진받아와서 
    .setFooter('Made by 𝓛𝓮𝓪𝓭𝓮𝓻𝓟𝓪𝓻𝓴', 'attachment://1.png') //여기다 넣어주기
      message.channel.send(embed);
  }
  else if (command === '쇼이치') 
  {
    const buffer = fs.readFileSync('./Shoichi.txt'); //()속 파일을 읽어온다.
    const attachment = new MessageAttachment(buffer, 'Shoichi.txt'); //읽어온 파일을 첨부파일로 보냄
    message.channel.send(`${message.author}, Write by 이민형`, attachment); //첨부파일과 함께 메시지 전송
  }
  else if(command === '초대링크')
  { 
    message.reply('https://discord.gg/P4TKChCS7A');
  }
  else if(command === '정보') 
  {
    const attachment = new Discord.MessageAttachment('./img/1.png', '1.png','./img/2.png','2.png');
    const embed = new MessageEmbed()
      .setAuthor('GGM 블서봇')  
      .setColor('#0099ff')
      .setTitle('명령어 모음')
      //.setURL('')
      .setThumbnail('attachment://2.png')
      .addField('!블서 (캐릭명)', '선택한 캐릭터의 각종 팁을 알 수 있습니다.')
      .addField('!블서 전적 (닉네임)', '해당 유저의 전적을 보여줍니다.')
      .addField('!블서 청원 (내용)', '관리자에게 개인DM을 보냅니다.')
      .addField('!블서 정보', '봇 명령어에 대하여 알 수 있습니다.')
      //.setImage()
      .setTimestamp() 
      .attachFiles(attachment) //사진받아와서 
      .setFooter('Made by 𝓛𝓮𝓪𝓭𝓮𝓻𝓟𝓪𝓻𝓴', 'attachment://1.png') //여기다 넣어주기
    message.channel.send(embed);
  }
  else if (command === '전적')
  {
		if (!args.length) {
			return message.channel.send(`닉네임을 입력해주세요 ${message.author}!`);
		} 
    else{
      const url = search + args[0];
      message.channel.send(url);  
    }
  }
}); 

client.login(token); //config.json안에 있는 token을 불러옴