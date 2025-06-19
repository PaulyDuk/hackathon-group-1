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

let currentCategory = '';
let currentQuestions = [];
let currentIndex = 0;
let selectedOption = null;
let score = 0;

function showScore() {
  scoreDiv.textContent = `Score: ${score} / ${currentQuestions.length}`;
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
      nextBtn.classList.remove('hidden');
    };
    optionsDiv.appendChild(btn);
  });
  nextBtn.classList.add('hidden');
  selectedOption = null;
  showScore();
}

function startCategory(category) {
  currentCategory = category;
  currentQuestions = questions[category];
  shuffle(currentQuestions);
  currentIndex = 0;
  score = 0;
  quizArea.classList.remove('hidden');
  quizArea.classList.remove('fade-in');
  void quizArea.offsetWidth;
  quizArea.classList.add('fade-in');
  showQuestion();
}

nextBtn.onclick = () => {
  if (selectedOption === null) return;
  if (selectedOption === currentQuestions[currentIndex].answer) {
    score++;
  }
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    questionDiv.textContent = "Quiz complete!";
    optionsDiv.innerHTML = '';
    nextBtn.classList.add('hidden');
    showScore();
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
  const mainContent = document.querySelector('#main-content'); // Replace with your main quiz container's selector

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
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
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