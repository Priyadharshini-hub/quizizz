const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'Hyper Text Markup Language',
        choice2: 'Hyperlinks and Text Markup Language',
        choice3: 'Home Tool Markup Language',
        choice4: 'Hyperlink Markup Language',
        answer: 1,
    },
    {
        question: 'What does CSS stand for?',
        choice1: 'Computer Style Sheets',
        choice2: 'Cascading Style Sheets',
        choice3: 'Colorful Style Sheets',
        choice4: 'Creative Style Sheets',
        answer: 2,
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<js>',
        choice2: '<scripting>',
        choice3: '<script>',
        choice4: '<javascript>',
        answer: 3,
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        choice1: 'The <head> section',
        choice2: 'Both the <head> section and the <body> section are correct',
        choice3: 'The <body> section',
        choice4: 'None of the above',
        answer: 2,
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        choice1: '<script href="xxx.js">',
        choice2: '<script src="xxx.js">',
        choice3: '<script name="xxx.js">',
        choice4: '<script file="xxx.js">',
        answer: 2,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'msg("Hello World");',
        choice2: 'alert("Hello World");',
        choice3: 'msgBox("Hello World");',
        choice4: 'alertBox("Hello World");',
        answer: 2,
    },
    {
        question: 'How do you create a function in JavaScript?',
        choice1: 'function = myFunction()',
        choice2: 'function:myFunction()',
        choice3: 'function myFunction()',
        choice4: 'function() myFunction',
        answer: 3,
    },
    {
        question: 'How do you call a function named "myFunction"?',
        choice1: 'myFunction()',
        choice2: 'call myFunction()',
        choice3: 'call function myFunction()',
        choice4: 'function myFunction()',
        answer: 1,
    },
    {
        question: 'How do you write an IF statement in JavaScript?',
        choice1: 'if (i == 5)',
        choice2: 'if i == 5 then',
        choice3: 'if i = 5',
        choice4: 'if i = 5 then',
        answer: 1,
    },
    {
        question: 'How does a WHILE loop start?',
        choice1: 'while (i <= 10)',
        choice2: 'while i = 1 to 10',
        choice3: 'while (i <= 10; i++)',
        choice4: 'while (i++)',
        answer: 1,
    }
	
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()