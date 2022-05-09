import asyncio,discord,os,time
from discord.ext import commands
from discord.utils import get


#토큰
token_path = os.path.dirname( os.path.abspath( __file__ ) )+"/token.txt"
t = open(token_path,"r",encoding="utf-8")
token = t.read().split()[0]
print("Token_key : ",token)

app = commands.client(command_prefix='!')

async def on_ready():
    print("다음으로 로그인합니다 : ")
    print(app.user.name)
    print(app.user.id)
    print("---------------------------")
    
    # 상태메시지 ~ 하는중 설정
    game = discord.Game("GGM봇 개발")
    
    #~ 하는중을 "" 으로 설정
    #[Status : online, offline, idle, dnd, invisible]
    #[activity : Game, Streaming, Activity]
    await app.change_presence(status=discord.Status.online, activity=game)

@client.event

async def on_message(message):
    
        #채널 은 "아이디" 이다
    channel = "727818836434223125"
    #유저는(임시) "이름#태그" 이다 ( 봇 이름과 태그로 적어주세요. )
    user = ["GGM#9656"]

    if message.content.startswith(''):
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
                await app.get_channel(int(channel)).send(embed=embed)

app.run(token)
