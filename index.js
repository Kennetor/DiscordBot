const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

// Library
const axios = require('axios')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    // console.log(client.user.id)
})
// Greetings
client.on('messageCreate', message => {
    const regex = /(hi|hello|hey|hei|hallo|halla|heisann)/;
    if (regex.test(message.content.toLowerCase()) && message.author.id !== client.user.id) {
        const greetingArr = ["Hello there!", "Hi there!", "What's up?", "Yo!", "Heya", "Greetings!", "Hallo - hva kan jeg hjelpe deg med idag?"];
        const svar = greetingArr[Math.floor(Math.random() * greetingArr.length)];
        message.reply(`${svar}`)
    }
// Joakim   
     else if (message.content.toLowerCase() === 'joakim') {
        const responses =
            ["What about him?", "Who is that? Sounds like a cheater", "I dont like him", "Ahh, Joakim, thats the guy who steals other people's code, right?"]
        const response = responses[Math.floor(Math.random() * responses.length)]
        message.reply(`${client.user} ${response} `);
// API
    } else if (message.content === 'joke') {
        axios.get('https://jokeapi.dev/joke/Any')
        .then(response => {
        //   const category = response.data.category;
          const joke = response.data.joke;
        //   const type = response.data.type;
          message.reply(`${joke}`);
        })
        .catch(error => {
          console.log(error);
        });
    }
});




client.login(process.env.TOKEN)