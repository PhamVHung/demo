const question_path = "../../../assets/demo.json";
const container = document.getElementById("container");

let currentIndex = 0;
let testLength = 0;
let score = 0;
let selectedAnswers = [];
let questionData = [];

function startTest() {
  currentIndex = 0;
  score = 0;
  selectedAnswers = [];
  questionData = [];
  showQuestion();
}

function showQuestion() {
  getQuestionData().then((data) => {
    questionData = data.slice(0, 10);
    testLength = questionData.length;
    const currentQuestion = questionData[currentIndex];

    const testContainer = document.createElement("div");
    testContainer.classList.add("test-container");
    testContainer.innerHTML = `
      <h2 class="question-number">Question ${currentIndex + 1}:</h2>
      <p class="question-title">${currentQuestion.question}</p>
      <div class="answer-buttons">
        ${currentQuestion.answers
          .map((answer, index) => {
            const isSelected =
              selectedAnswers[currentIndex] === index ? "selected" : "";
            return `<button type="button" class="btn ${isSelected}" data-index="${index}">${answer.answer}</button>`;
          })
          .join("")}
      </div>
      <div class="function-btn">
        <div class="function-left">
          <div class="countdown-timer">1:00:00</div>
          <input type="checkbox" id="flagCheckbox">
          <label for="flagCheckbox">Flag</label>
        </div>
        <div class="function-right">
          <i class="fa-solid fa-arrow-left next-btn" id="prevBtn"></i>
          <i class="fa-solid fa-ellipsis more-btn"></i>
          <i class="fa-solid fa-arrow-right next-btn" id="nextBtn"></i>
        </div>
      </div>
    `;

    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card_body.innerHTML = `
    <div>
      <div class="table-question">
        ${questionData
          .map((question, index) => {
            return `<div class="cell jumpBtn" data-index="${index}"}">${
              index + 1
            }</div>`;
          })
          .join("")}
      </div>
    </div>
    <button type="submit" id="submitBtn">Nộp bài</button>
    `;

    container.innerHTML = "";
    container.appendChild(testContainer);
    testContainer.appendChild(card_body);

    const answerButtons = testContainer.querySelectorAll(
      ".answer-buttons button"
    );
    answerButtons.forEach((button) => {
      button.addEventListener("click", handleAnswerSelection);
    });

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const jumpBtn = document.querySelector(".table-question");
    const submitBtn = document.getElementById("submitBtn");
    prevBtn.addEventListener("click", () => changeQuestion(-1));
    nextBtn.addEventListener("click", () => changeQuestion(1));
    submitBtn.addEventListener("click", () => showScore())
    jumpBtn.addEventListener("click", (event) => {
      if (event.target.classList.contains("jumpBtn")) {
        const index = parseInt(event.target.dataset.index);
        jumpQuestion(index);
      }
    });
  });
}

function handleAnswerSelection(event) {
  const selectedButton = event.target;
  const selectedIndex = parseInt(selectedButton.getAttribute("data-index"));

  const answerButtons = document.querySelectorAll(".answer-buttons button");
  answerButtons.forEach((button) => {
    if (button !== selectedButton) {
      button.classList.remove("selected");
    }
  });

  // Add "selected" class to the selected button
  selectedButton.classList.add("selected");

  selectedAnswers[currentIndex] = selectedIndex;
  console.log(selectedAnswers);
}

function changeQuestion(direction) {
  currentIndex += direction;
  if (currentIndex >= 0 && currentIndex < testLength) {
    showQuestion();
  } else if (currentIndex === testLength) {
    showScore();
  } else {
    currentIndex -= direction;
  }
}

function jumpQuestion(index) {
  currentIndex = index;
  showQuestion();
}

function showScore() {
  getQuestionData().then((data) => {
    let correctAnswers = 0;
    for (let i = 0; i < testLength; i++) {
      const currentQuestion = data[i];
      const selectedAnswerIndex = selectedAnswers[i];
      if (
        selectedAnswerIndex !== undefined &&
        currentQuestion.answers[selectedAnswerIndex].correct
      ) {
        correctAnswers++;
      }
    }
    const score = (correctAnswers / testLength) * 100;
    const message = "Your score: " + score.toFixed(2) + "%";
    alert(message);
  });
}


function getQuestionData() {
  return fetch(question_path).then((response) => {
    return response.json();
  });
}

startTest();
