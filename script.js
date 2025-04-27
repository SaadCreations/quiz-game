// Quiz questions and answers
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correct: 1
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
        correct: 1
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correct: 2
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Liver", "Brain", "Skin"],
        correct: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Won", "Yen", "Ringgit"],
        correct: 2
    }
];

// DOM elements
const quizElement = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestion = 0;
let score = 0;
let answered = false;

// Initialize quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    showQuestion();
    scoreContainer.classList.add('hide');
    quizElement.classList.remove('hide');
}

// Display current question
function showQuestion() {
    resetState();
    let current = quizData[currentQuestion];
    let questionNo = currentQuestion + 1;
    questionElement.innerHTML = `${questionNo}. ${current.question}`;

    current.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.innerHTML = option;
        optionButton.classList.add('option');
        optionsElement.appendChild(optionButton);
        
        optionButton.addEventListener('click', () => selectAnswer(index));
    });
}

// Reset the state for next question
function resetState() {
    answered = false;
    nextButton.disabled = true;
    resultElement.innerHTML = "";
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(index) {
    if (answered) return;
    
    answered = true;
    const options = optionsElement.children;
    const current = quizData[currentQuestion];
    
    if (index === current.correct) {
        options[index].classList.add('correct');
        score++;
        resultElement.innerHTML = "Correct!";
    } else {
        options[index].classList.add('incorrect');
        options[current.correct].classList.add('correct');
        resultElement.innerHTML = "Wrong!";
    }
    
    Array.from(options).forEach(option => {
        option.classList.add('disabled');
    });
    
    nextButton.disabled = false;
}

// Show final score
function showScore() {
    resetState();
    quizElement.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

// Event listeners
nextButton.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showScore();
    }
});

restartButton.addEventListener('click', startQuiz);

// Start the quiz when page loads
startQuiz();