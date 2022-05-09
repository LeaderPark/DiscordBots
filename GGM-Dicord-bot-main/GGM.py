#기본 모듈
import discord
import time
import openpyxl
import sys
import os

DISCORD_BOT_TOKEN = os.environ["BOT_TOKEN"]

client = discord.Client()

@client.event
#봇이 로딩이 끝나면 
async def on_ready():
    print('로딩 완료!')
    print(client.user.name)
    print(client.user.id)
    print('---------------------------------')
    
    # 상태메시지 ~ 하는중 설정
    game = discord.Game("GGM봇 개발중")
    
    #~ 하는중을 "" 으로 설정
    #[Status : online, offline, idle, dnd, invisible]
    #[activity : Game, Streaming, Activity]
    await client.change_presence(status=discord.Status.online, activity=game)

@client.event

async def on_message(message):
    #"  " 라는 메시지가 보이면
    if message.content.startswith("도움말"):
        #메시지를 1개 지우고
        await message.channel.purge(limit=1)
        #embed 색 지정 
        embed = discord.Embed(color=0x7289DA)
        #embed 글 지정
        embed.add_field(name="개인DM을 확인해 주세요", value="이 메세지는 3초뒤 자동으로 사라집니다.",inline=False)
        #채널에 embed 전송
        await message.channel.send(embed=embed)
        #embed 색 지정 
        embed = discord.Embed(color=0x7289DA)
        #embed 글 지정
        embed.add_field(name="GGM Bot", value="!명령어 ",inline=False)
        #"  " 를 친 사람에게 디엠으로  embed 전송
        await message.author.send(embed=embed)
        #3초 대기
        time.sleep(3)
        #메시지 삭제
        await message.channel.purge(limit=1)

    #채널 은 "아이디" 이다
    channel = "727818836434223125"
    #유저는(임시) "이름#태그" 이다 ( 봇 이름과 태그로 적어주세요. )
    user = ["GGM#9656"]

    #만약 메시지를 적은 사람이 user 부분에 있다면
    if str(message.author) in user:
        #패스
        pass
    #아니라면 
    else:   
        #메시지 스타트 스위치 는 "" 이다.
        if message.content.startswith(""): 
            #embed 설정
            embed = discord.Embed(colour=discord.Colour(0x7289DA))
            embed.add_field(name="유저", value=f"<@{message.author.id}>")
            embed.add_field(name="채널", value=f"<#{message.channel.id}>")
            embed.add_field(name="내용", value=f"{message.content}", inline=False)
            #channel 부분에 아이디로 embed 를 전송
            await client.get_channel(int(channel)).send(embed=embed)

        if message.content.startswith('!상태'): 
            #work 는 !gmae(띄워쓰기)뒤에 텍스트 이다 ~
            work = message.content.split(" ")[1]
            #ram 은 discord.Game(work) 이다 .
            ram = discord.Game(work)
            #상태 메시지를 work 의 텍스트로 변경 한다 .
            await client.change_presence(status=discord.Status.online, activity=ram)
            await message.channel.purge(limit=1)
            # 그 후 메시지를 보낸다 .
            await message.channel.send('적용 완료!')
            #3초 대기
            time.sleep(2)
            #메시지 삭제
            await message.channel.purge(limit=1)

        #봇 학습
    #     if message.content.startswith('!GGM'):
    #     file = load_workbook('log.xlsx')
    #     work = message.content.split(' ')
    #     sheet = file.active
    #     for i in range(1,51):
    #         if sheet['A' + str(i)].value =='-' or sheet['A'+str(i)].value == work[1]:
    #             sheet['A' + str(i)].value = work[1]
    #             sheet['B' + str(i)].value = work[2]
    #             sheet['C' + str(i)].value = message.author.name
    #             embed = discord.Embed(colour=discord.Colour(0xFFFFFF))
    #             embed.set_author(name=f'이제 {work[1]} 이라고 말하면 {work[2]} 라고 말할게요.')
    #             await message.channel.send(embed=embed)
    #             break
    #     file.save('log.xlsx')

    # if message.content.startswith(''):
    #     file = openpyxl.load_workbook('log.xlsx')
    #     work = message.content
    #     sheet = file.active
    #     for i in range(1,51):
    #         if sheet['A'+str(i)].value == work:
    #             await message.channel.send(sheet['B' + str(i)].value + "\n" + sheet["C" + str(i)].value + "님이 알려 주셨어요 !")
    #             break





client.run(DISCORD_BOT_TOKEN)
