import { questions } from '../data/questions.js'; // No change needed if folder structure remains

const tvBtn = document.getElementById('tv-btn');
const filmBtn = document.getElementById('film-btn');
const sportBtn = document.getElementById('sport-btn');
const musicBtn = document.getElementById('music-btn');
const foodBtn = document.getElementById('food-btn');
const quizArea = document.getElementById('quiz-area');
const scoreDiv = document.getElementById('score');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultsTableContainer = document.getElementById('results-table-container');
const resultsTableBody = document.querySelector('#results-table tbody');
const container = document.querySelector('.container');

let categoryScores = {};
let currentCategory = '';
let currentQuestions = [];
let currentIndex = 0;
let selectedOption = null;
let score = 0;
var myBarWidth = 0;
var questionsNumber = 10;
var numberQuestions = questions.length;

function animateContainerHeight() {
  // 1. Measure the current height
  const startHeight = container.offsetHeight;

  // 2. Set the height explicitly to start value
  container.style.height = startHeight + 'px';

  // 3. Wait for the next frame, then:
  requestAnimationFrame(() => {
    // 4. Change the content (already done before calling this function)
    // 5. Measure the new height
    container.style.height = 'auto';
    const endHeight = container.offsetHeight;

    // 6. Set back to start height, force reflow, then set to end height
    container.style.height = startHeight + 'px';
    void container.offsetWidth; // Force reflow

    // 7. Now set to the new height for transition
    container.style.height = endHeight + 'px';

    // 8. After transition, remove the inline height
    const cleanup = (e) => {
      if (e.propertyName === 'height') {
        container.style.height = '';
        container.removeEventListener('transitionend', cleanup);
      }
    };
    container.addEventListener('transitionend', cleanup);
  });
}

function addProgress() {
    myBarWidth += 100 / currentQuestions.length;
    if (myBarWidth > 100) {
        myBarWidth = 100;
    }
    document.getElementById("myBar").style.width = myBarWidth + "%";
}

function showScore() {
  scoreDiv.textContent = `SCORE: ${score} / ${currentQuestions.length}`;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion() {
  const q = currentQuestions[currentIndex];
  questionDiv.textContent = q.question;
  optionsDiv.innerHTML = '';
  shuffle(q.options);
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      Array.from(optionsDiv.children).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOption = option;
        animateContainerHeight();
      nextBtn.classList.remove('hidden');
      animateContainerHeight();
    };
    optionsDiv.appendChild(btn);
  });
    animateContainerHeight();
  nextBtn.classList.add('hidden');
  animateContainerHeight();
  selectedOption = null;
  showScore();
}

function startCategory(category) {
  currentCategory = category;
  currentQuestions = questions[category];
  shuffle(currentQuestions);
  currentIndex = 0;
  score = 0;
  myBarWidth = 0;
  document.getElementById("myBar").style.width = "0%";
  quizArea.classList.remove('hidden');
  quizArea.classList.remove('fade-in');
  void quizArea.offsetWidth;
  quizArea.classList.add('fade-in');
  hideResultsTable(); // Hide table when starting a new quiz
  showQuestion();
}

function showResultsTable() {
  resultsTableBody.innerHTML = '';
  for (const [cat, scoreObj] of Object.entries(categoryScores)) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${cat}</td><td>${scoreObj.score} / ${scoreObj.total}</td>`;
    resultsTableBody.appendChild(tr);
  }
  resultsTableContainer.classList.remove('hidden');
}

function hideResultsTable() {
  resultsTableContainer.classList.add('hidden');
}

nextBtn.onclick = () => {
  if (selectedOption === null) return;
  if (selectedOption === currentQuestions[currentIndex].answer) {
    score++;
  }
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
    addProgress();    
  } else {
    // Only update if new score is higher than previous
    const prev = categoryScores[currentCategory];
    if (!prev || score > prev.score) {
      categoryScores[currentCategory] = {
        score: score,
        total: currentQuestions.length
      };
    }
      animateContainerHeight();
    questionDiv.textContent = "Quiz complete!";
    optionsDiv.innerHTML = '';
    nextBtn.classList.add('hidden');
    animateContainerHeight();
    showScore();
    addProgress();
    showResultsTable(); // Show table at the end
  }
};

tvBtn.onclick = () => startCategory('TV');
filmBtn.onclick = () => startCategory('Film');
sportBtn.onclick = () => startCategory('Sport');
musicBtn.onclick = () => startCategory('Music');
foodBtn.onclick = () => startCategory('Food and Drink');

document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('intro-overlay');
  const startBtn = document.getElementById('start-quiz-btn');
  const instructionsBtn = document.getElementById('instructions-btn');
  const modal = document.getElementById('instructions-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const mainContent = document.querySelector('#main-content');

  // Hide main content initially
  if (mainContent) mainContent.style.display = 'none';

  startBtn.addEventListener('click', function() {
    overlay.classList.add('fade-out');
    if (mainContent) {
      mainContent.style.display = '';
      mainContent.classList.remove('fade-in');
      void mainContent.offsetWidth;
      mainContent.classList.add('fade-in');
    }
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.classList.remove('fade-out');
    }, 700);
  });

  instructionsBtn.addEventListener('click', function() {
    modal.classList.remove('fade-out');
    modal.style.display = 'flex';
    // Force reflow to restart animation if needed
    void modal.offsetWidth;
    modal.classList.add('fade-in');
  });

  closeModalBtn.addEventListener('click', function() {
    modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('fade-out');
    }, 700); // Match the animation duration in your CSS
  });
});

const faders = document.getElementsByClassName('fader');
const faderbtns = document.getElementsByClassName('faderbtn');



Array.from(faderbtns).forEach(btn => {
  btn.addEventListener('click', () => {
    Array.from(faders).forEach(fader => {
      fader.classList.remove('fade-in');
      void fader.offsetWidth;
      fader.classList.add('fade-in');
    });
  });
});