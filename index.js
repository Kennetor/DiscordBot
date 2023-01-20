const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')
const apiKeyCat = process.env.API_KEY_CAT;
const apiKeyDog = process.env.API_KEY_DOG;
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
        }      else if (/(john petter|john-petter|john)/.test(message.content.toLowerCase())) {
            message.reply(arrays.responseJohn[Math.floor(Math.random() * arrays.responseJohn.length)]);
        }       
        // Joakim
        else if (message.content.toLowerCase() === 'joakim') {
            message.reply(arrays.responsesJoakim[Math.floor(Math.random() * arrays.responsesJoakim.length)]);


        }
        // The Cat API
        else if (/(katt|cat|pus|vis meg en katt)/.test(message.content.toLowerCase())) {
            axios.get('https://api.thecatapi.com/v1/images/search', { headers: { 'x-api-key': (apiKeyCat) } })
                .then(response => {
                    const imageUrl = response.data[0].url;
                    message.reply({ files: [imageUrl] });
                })
                .catch(error => {
                    console.log(error);
                });
            // The Dog API
        } else if (/(dog|hund|vis meg en hund| show me a dog)/.test(message.content.toLowerCase())) {
            axios.get('https://api.thedogapi.com/v1/images/search', { headers: { 'x-api-key': (apiKeyDog) } })
                .then(response => {
                    const imageUrl = response.data[0].url;
                    message.reply({ files: [imageUrl] });
                })
                .catch(error => {
                    console.log(error);
                });

        }           // Joke API
        else if (/(vits|si en vits|joke|fortell en vits|tell me a joke|gi meg en vits)/.test(message.content.toLowerCase())) {
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
        }   else if (message.content.toLowerCase() === 'bored') {
            axios.get('http://www.boredapi.com/api/activity?participants=1').then(response => {
                const activity = response.data.activity;
                message.reply(`${activity}`)
                })
            }
  





  
    }
});




client.login(process.env.TOKEN)