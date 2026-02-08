// 1. Находим все элементы (DOM)
const btn = document.getElementById('main-button');
const textElement = document.getElementById('dynamic-text');
const input = document.getElementById('user-input');
const list = document.getElementById('todo-list');
const themeBtn = document.getElementById('theme-toggle');
const tempElement = document.getElementById('temp-value'); // Для погоды

// 2. Логика темной темы
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeBtn.onclick = function () {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
};

// 3. Работа со списком задач (Массив + LocalStorage)
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const newEntry = document.createElement('li');
        newEntry.textContent = task;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Удалить";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveAndRender();
        };
        newEntry.appendChild(deleteBtn);
        list.appendChild(newEntry);
    });
}

function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

// 4. Логика добавления пользователя
btn.onclick = function () {
    const userName = input.value;
    if (userName === "") {
        textElement.textContent = "Пожалуйста, введи имя!";
        textElement.style.color = "red";
    } else {
        textElement.textContent = "Привет, " + userName + "!";
        textElement.style.color = "";
        tasks.push("Пользователь: " + userName);
        saveAndRender();
        input.value = "";
    }
};


let userScore = 0;
let compScore = 0;
let userHistory = [];
// Веса стратегий: какая чаще выигрывает, ту бот и слушает
let strategyWeights = { repeat: 1, frequent: 1, sequence: 1 };

const beats = { 'камень': 'ножницы', 'ножницы': 'бумага', 'бумага': 'камень' };
const losesTo = { 'ножницы': 'камень', 'бумага': 'ножницы', 'камень': 'бумага' };
const choices = ['камень', 'ножницы', 'бумага'];

function playGame(userChoice) {
    // 1. Прогнозы разных стратегий
    const predicts = {
        repeat: userHistory.length > 0 ? losesTo[userHistory[userHistory.length - 1]] : choices[Math.floor(Math.random() * 3)],
        frequent: (() => {
            if (userHistory.length === 0) return choices[Math.floor(Math.random() * 3)];
            const counts = userHistory.reduce((acc, m) => { acc[m]++; return acc; }, { 'камень': 0, 'ножницы': 0, 'бумага': 0 });
            const mostFreq = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            return losesTo[mostFreq];
        })(),
        sequence: (() => {
            if (userHistory.length < 2) return choices[Math.floor(Math.random() * 3)];
            const last = userHistory[userHistory.length - 1];
            for (let i = userHistory.length - 2; i >= 0; i--) {
                if (userHistory[i] === last && i + 1 < userHistory.length) return losesTo[userHistory[i + 1]];
            }
            return choices[Math.floor(Math.random() * 3)];
        })()
    };

    // 2. Выбор лучшей стратегии на основе весов
    const bestStrat = Object.keys(strategyWeights).reduce((a, b) => strategyWeights[a] > strategyWeights[b] ? a : b);
    let compChoice = predicts[bestStrat];

    // 3. Логика победы
    let resultText = "";
    let currentRoundResult = ""; // для весов

    if (userChoice === compChoice) {
        resultText = "Ничья! 🤝";
        currentRoundResult = "tie";
    } else if (beats[userChoice] === compChoice) {
        resultText = "Вы победили! 🎉";
        userScore++;
        currentRoundResult = "user";
        strategyWeights[bestStrat] -= 0.5; // Стратегия ошиблась — понижаем доверие
    } else {
        resultText = "Вы проиграли! 🤖";
        compScore++;
        currentRoundResult = "comp";
        strategyWeights[bestStrat] += 1; // Стратегия сработала — повышаем вес
    }

    userHistory.push(userChoice);

    // 4. Обновление интерфейса
    document.getElementById('game-text').innerHTML = `Вы: ${userChoice} | Сайт: ${compChoice}<br><b>${resultText}</b>`;
    document.getElementById('score').textContent = `Вы: ${userScore} | Сайт: ${compScore}`;
}




renderTasks();
