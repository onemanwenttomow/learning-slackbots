const SlackBot = require('slackbots');
const axios = require('axios');
const { token } = require('./secrets');

const bot = new SlackBot({
    token: token,
    name: 'animal-trivia'
});

// Start handler

bot.on('start', () => {
    const params = {
        icon_emoji : ':question:'
    };

    bot.postMessageToChannel('general', 'Get random animal trivia', params);
});

bot.on('error', err => {console.log(err);});

bot.on('message', data => {
    if(data.type !== 'message') {
        return;
    }
    console.log(data);
    
});

//https://opentdb.com/api.php?amount=10&category=27&type=boolean