const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Rome", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Saturn", "Neptune"],
        answer: "Mars"
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");
const resultElement = document.getElementById("result");

let currentQuestion = 0;
let score = 0;
let userAnswer = null;

loadQuiz();

function loadQuiz() {
    // Remove inline display styles
    questionElement.style.removeProperty('display');
    optionsElement.style.removeProperty('display');

    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => {
            // Store the user's answer
            userAnswer = option;
            // Enable submit button
            submitButton.style.display = "block";
            // Remove 'selected' class from all option buttons
            document.querySelectorAll('.option').forEach(btn => {
                btn.classList.remove("selected");
            });
            // Add 'selected' class to the clicked button
            button.classList.add("selected");
        });
        optionsElement.appendChild(button);
    });
    // Hide submit button initially
    submitButton.style.display = "none";
    restartButton.style.display = "none";
    resultElement.innerText = ""; // Clear result paragraph
}


function selectOption() {
    const currentQuizData = quizData[currentQuestion];
    if (userAnswer === currentQuizData.answer) {
        score++;
    }
    // Clear the user's answer
    userAnswer = null;
}

function showResult() {
    resultElement.innerText = `You scored ${score}/${quizData.length}`;

    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    quizData.forEach((quizItem, index) => {
        const question = document.createElement("p");
        question.textContent = `${index + 1}. ${quizItem.question}`;
        const answer = document.createElement("p");
        answer.textContent = `${quizItem.answer}`;
        resultElement.appendChild(question);
        resultElement.appendChild(answer);
        resultElement.appendChild(document.createElement("hr")); // Add a horizontal line between questions
    });

    submitButton.style.display = "none";
    restartButton.style.display = "block";
}



submitButton.addEventListener("click", () => {
    selectOption(); // Evaluate the user's answer
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    loadQuiz();
});

