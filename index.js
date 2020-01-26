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

bot.on('error', err => { console.log(err); });

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
    axios.get('https://opentdb.com/api.php?amount=20&category=22&type=boolean').then(result => {
        trivia = result.data.results[Math.floor(Math.random() * 20) + 1];
        if (!result.data.results) {
            return;
        }
        console.log("asking question...", trivia.question);
        const params = {
            icon_emoji: ':question:'
        };

        bot.postMessageToChannel('general', `True or False? -> ${trivia.question}`, params);
    }).catch(err => console.log(err));
}

function checkAnswer(answer) {
    console.log("trivia: ", trivia.correct_answer.toLowerCase());
    console.log("answer: ", answer);
    if (answer === trivia.correct_answer.toLowerCase()) {
        bot.postMessageToChannel('general', `Congrats! You got it right`, {
            icon_emoji: ':mortar_board:'
        });
    } else {
        bot.postMessageToChannel('general', `Sorry, but that is the wrong answer`, {
            icon_emoji: ':face_with_rolling_eyes:'
        });
    }
}

const trivia_categories = [
    {
        id: 9,
        name: "General Knowledge"
    },
    {
        id: 10,
        name: "Entertainment: Books"
    },
    {
        id: 11,
        name: "Entertainment: Film"
    },
    {
        id: 12,
        name: "Entertainment: Music"
    },
    {
        id: 13,
        name: "Entertainment: Musicals & Theatres"
    },
    {
        id: 14,
        name: "Entertainment: Television"
    },
    {
        id: 15,
        name: "Entertainment: Video Games"
    },
    {
        id: 16,
        name: "Entertainment: Board Games"
    },
    {
        id: 17,
        name: "Science & Nature"
    },
    {
        id: 18,
        name: "Science: Computers"
    },
    {
        id: 19,
        name: "Science: Mathematics"
    },
    {
        id: 20,
        name: "Mythology"
    },
    {
        id: 21,
        name: "Sports"
    },
    {
        id: 22,
        name: "Geography"
    },
    {
        id: 23,
        name: "History"
    },
    {
        id: 24,
        name: "Politics"
    },
    {
        id: 25,
        name: "Art"
    },
    {
        id: 26,
        name: "Celebrities"
    },
    {
        id: 27,
        name: "Animals"
    },
    {
        id: 28,
        name: "Vehicles"
    },
    {
        id: 29,
        name: "Entertainment: Comics"
    },
    {
        id: 30,
        name: "Science: Gadgets"
    },
    {
        id: 31,
        name: "Entertainment: Japanese Anime & Manga"
    },
    {
        id: 32,
        name: "Entertainment: Cartoon & Animations"
    }
];











