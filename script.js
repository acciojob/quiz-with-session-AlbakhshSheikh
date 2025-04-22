const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Load saved answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear before rendering
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Check if this was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save selection on change
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));

      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Calculate score and save to localStorage
function submitQuiz() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const correctAnswer = questions[i].answer;
    if (userAnswers[i] === correctAnswer) {
      score++;
    }
  }

  const resultText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = resultText;
  localStorage.setItem("score", score);
}

// Load score if already submitted
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
}

// Event listener for submit button
submitButton.addEventListener("click", submitQuiz);

// Initial rendering
renderQuestions();
