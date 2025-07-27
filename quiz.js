const urlParams = new URLSearchParams(window.location.search);// Get the quiz index from the URL
const quizIndex = urlParams.get('quizIndex');

const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];// Retrieve quizzes from localStorage


// Check if the quiz exists
if (!quizIndex || !quizzes[quizIndex]) {
    alert('Quiz not found!');
    window.location.href = 'homepage.html';
}

// Load the quiz data
const quiz = quizzes[quizIndex];

// Display the quiz title and description
document.getElementById('quiz-title').textContent = quiz.title;
document.getElementById('quiz-description').textContent = quiz.description;

// Display the quiz questions
const quizQuestionsContainer = document.getElementById('quiz-questions');
quiz.questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
        <h3>Question ${index + 1}: ${question.question}</h3>
        ${question.options
            .map(
                (option, optionIndex) => `
            <label>
                <input type="radio" name="question${index}" value="${option}">
                ${option}
            </label><br>
        `
            )
            .join('')}
    `;
    quizQuestionsContainer.appendChild(questionDiv);
});

// Handle quiz submission
document.getElementById('submit-quiz').addEventListener('click', function () {
    const answers = [];
    let allAnswered = true;

    quiz.questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            answers.push(selectedOption.value);
        } else {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        alert('Please answer all questions before submitting.');
        return;
    }

    alert('Quiz submitted! Thank you for participating.');
    window.location.href = 'homepage.html';
});