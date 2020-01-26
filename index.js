const SlackBot = require('slackbots');
const axios = require('axios');
const { token } = require('./secrets');

let trivia = '';
let slackBotName = '@random-animal-trivia';

const bot = new SlackBot({
    token: token,
    name: 'animal-trivia'
});

// Start handler

bot.on('start', () => {
    // code to run when slack bot goes online...
});

bot.on('error', err => {console.log(err);});

bot.on('message', data => {

    console.log("data: ", data);

    if (data.type === 'message') {
        let answer;
        answer = data.text.trim().toLowerCase();
        console.log("answer: ", answer);
        if (answer === 'true' || answer === 'false') {
            checkAnswer(answer);
        }

    }

    if (!data.content) {
        return;
    }

    if (data.content && data.content.includes(` ${slackBotName}`)) {
        askQuestion();
    }
         
});

function askQuestion() {
    axios.get('https://opentdb.com/api.php?amount=20&category=27&type=boolean').then(result => {
        trivia = result.data.results[Math.floor(Math.random() * 20) + 1];
        if (!result.data.results) {
            return;
        }
        console.log("asking question...", trivia.question);
        const params = {
            icon_emoji : ':question:'
        };
    
        bot.postMessageToChannel('general', `True or False? -> ${trivia.question}`, params);
    });
}

function checkAnswer(answer) {
    console.log("trivia: ", trivia.correct_answer.toLowerCase());
    console.log("answer: ", answer);
    if (answer === trivia.correct_answer.toLowerCase()) {
        bot.postMessageToChannel('general', `Congrats! You got it right`, {
            icon_emoji : ':mortar_board:'
        });
    } else {
        bot.postMessageToChannel('general', `Sorry, but that is the wrong answer`, {
            icon_emoji : ':face_with_rolling_eyes:'
        });
    }
}











