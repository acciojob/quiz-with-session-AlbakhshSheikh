//your JS code here.
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved answers from sessionStorage or initialize empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

// Load previous score from localStorage if exists
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5`;
}

// Modified renderQuestions to handle radio button changes
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;
      choiceElement.id = `q${i}-choice${j}`;
      
      // Check if this choice was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }
      
      // Add event listener to save selection
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });
      
      const choiceLabel = document.createElement("label");
      choiceLabel.htmlFor = `q${i}-choice${j}`;
      choiceLabel.textContent = choice;
      
      questionElement.appendChild(document.createElement("br"));
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Calculate and display score on submit
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Handle submit button click
submitButton.addEventListener("click", () => {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of 5`;
  localStorage.setItem("score", score);
  // Clear session storage after submission
  sessionStorage.removeItem("progress");
  userAnswers = new Array(questions.length).fill(null);
  renderQuestions();
});

// Initial render
renderQuestions();
// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
