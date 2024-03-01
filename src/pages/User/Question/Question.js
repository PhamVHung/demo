const question_file = "../../../assets/demo.json"

document.addEventListener("DOMContentLoaded", function () {
  fetch(question_file)
    .then((response) => response.json())
    .then((data) => {
      // Shuffle the array of questions
      const shuffledQuestions = shuffleArray(data);
      // Select the first 50 questions
      const selectedQuestions = shuffledQuestions.slice(0, 50);

      const quizContainer = document.getElementById("quiz-container");

      selectedQuestions.forEach((questionData, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionHeader = document.createElement("h2");
        questionHeader.textContent = `Question ${index + 1}: ${
          questionData.question
        }`;
        questionDiv.appendChild(questionHeader);

        const answerDiv = document.createElement("div");
        answerDiv.classList.add("question-choice");

        for (const key in questionData.choice[0]) {
            const optionA = document.createElement("div");
            optionA.textContent = `${key}. ${questionData.choice[0][key]}`;

            answerDiv.appendChild(optionA);
        }

        questionDiv.appendChild(answerDiv);
        quizContainer.appendChild(questionDiv);
      });
    })
    .catch((error) => console.error("Error fetching questions:", error));
});

// Function to shuffle array elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// fetch(question_file)
//   .then((responses) => responses.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.error("Error fetching responses:", error));
