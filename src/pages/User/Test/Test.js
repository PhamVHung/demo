const question_path = "../../../assets/demo.json";

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");
const questionData = getQuestion();

// console.log(questionData.size)

let score = 0;
let currentIndex = 0;
let testLength;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  homeButton.innerHTML = "Home";
  showQuestion();
}

function showQuestion() {
  resetState();
  questionData.then((data) => {
    let shuffledQuestion = shuffle(data).splice(0, 1);
    testLength = shuffledQuestion.length;
    let currentQuestion = shuffledQuestion[currentIndex];
    let questionNumber = currentIndex + 1;
    questionElement.innerText =
      questionNumber + ". " + currentQuestion.question;

    const shuffledAnswers = shuffle(currentQuestion.answers);

    shuffledAnswers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.answer;
      button.classList.add("btn");
      answerButton.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  });
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score += 1;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentIndex < testLength) handleNextButton();
  else startQuiz();
});

function handleNextButton() {
  currentIndex += 1;
  if (currentIndex < testLength) showQuestion();
  else showScore();
}

homeButton.addEventListener("click", ()=> {
  window.location.href = "../Home/Home.html";
})

function showScore() {
  resetState();
    questionElement.innerHTML = `You got ${score} out of ${testLength} questions`;
    nextButton.innerHTML = "Try again";
    homeButton.innerHTML = "Home";
    nextButton.style.display = "block";
    homeButton.style.display = "block";
}

function resetState() {
  nextButton.style.display = "none";
  homeButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function getQuestion() {
  return fetch(question_path).then((response) => {
    if (!response.ok) throw new Error();
    return response.json();
  });
}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

startQuiz();

// fetch(question_path)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Log the JSON data to the console
//     let currentQuestion = data[0];
//     console.log(currentQuestion);

//     currentQuestion.answers.forEach(answer => {
//       console.log(answer.answer);
//     });
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });
