const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')
const arrays = require('./Arrays')
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
client.on('messageCreate', message => {
    if (message.author.id !== client.user.id) {
        if (/(hey|hei|hi|hello|yo|halla|hallo)/.test(message.content.toLowerCase())) {
            message.reply(arrays.greetings[Math.floor(Math.random() * arrays.greetings.length)]);
        }

        // Joakim    
        else if (message.content.toLowerCase() === 'joakim') {
            message.reply(arrays.responsesJoakim[Math.floor(Math.random() * arrays.responsesJoakim.length)]);

            // John-Petter
        }
        else if (/(john petter|john-petter|john)/.test(message.content.toLowerCase())) {
            message.reply(arrays.responseJohn[Math.floor(Math.random() * arrays.responseJohn.length)]);
        }

        // Joke API
        else if (/(vits|si en vits|joke|fortell en vits|tell me a joke|gi meg en vits|)/.test(message.content.toLowerCase())) {
            axios.get('https://jokeapi.dev/joke/Any')
            .then(response => {
              let joke;
              if (response.data.setup) {
                joke = `${response.data.setup}\n${response.data.delivery}`
              } else {
                joke = response.data.joke;
              }
              message.reply(joke);
            })
            .catch(error => {
              console.log(error);
            });          
        }
            
        // Bored API
        else if (message.content.toLowerCase() === 'bored') {
            axios.get('http://www.boredapi.com/api/activity?participants=1').then(response => {
                const activity = response.data.activity;
                message.reply(`${activity}`)
            })
        }
    }
});




client.login(process.env.TOKEN)