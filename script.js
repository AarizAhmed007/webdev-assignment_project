// Add a new question dynamically
document.getElementById("add-question").addEventListener("click", function () {
    const questionsContainer = document.getElementById("questions-container");

    // Get the current number of questions
    const questionCount = questionsContainer.getElementsByClassName("form").length;
    const nextQuestionNumber = questionCount + 1;

    // Create a new question form
    const newQuestionForm = document.createElement("div");
    newQuestionForm.classList.add("form");

    newQuestionForm.innerHTML = `
        <label for="question${nextQuestionNumber}">Question ${nextQuestionNumber}:</label>
        <textarea id="question${nextQuestionNumber}" placeholder="Enter question" required></textarea><br>

        <label for="option${nextQuestionNumber}-1">Option 1</label>
        <input type="text" id="option${nextQuestionNumber}-1" placeholder="Enter option" required><br>

        <label for="option${nextQuestionNumber}-2">Option 2</label>
        <input type="text" id="option${nextQuestionNumber}-2" placeholder="Enter option" required><br>

        <label for="option${nextQuestionNumber}-3">Option 3</label>
        <input type="text" id="option${nextQuestionNumber}-3" placeholder="Enter option" required><br>

        <label for="option${nextQuestionNumber}-4">Option 4</label>
        <input type="text" id="option${nextQuestionNumber}-4" placeholder="Enter option" required><br>
    `;

    // Append the new question form to the container
    questionsContainer.appendChild(newQuestionForm);
});

// Submit the quiz
document.getElementById("submit-quiz").addEventListener("click", function () {
    // Collect quiz data
    const quizTitle = document.getElementById("quiz-title").value.trim();
    const quizDescription = document.getElementById("desc").value.trim();

    if (!quizTitle || !quizDescription) {
        alert("Please fill out the quiz title and description.");
        return;
    }

    const questionsContainer = document.getElementById("questions-container");
    const questionForms = questionsContainer.getElementsByClassName("form");

    const questions = [];
    for (let form of questionForms) {
        const questionText = form.querySelector("textarea").value.trim();
        const options = Array.from(form.querySelectorAll("input[type='text']")).map(input => input.value.trim());

        if (!questionText || options.some(option => !option)) {
            alert("Please fill out all questions and options.");
            return;
        }

        questions.push({
            question: questionText,
            options: options
        });
    }

    // Save quiz data to localStorage
    const quizData = {
        title: quizTitle,
        description: quizDescription,
        questions: questions
    };

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(quizData);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    // Redirect to homepage
    alert("Quiz successfully created!");
    window.location.href = "homepage.html";
});