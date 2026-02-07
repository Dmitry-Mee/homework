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

function playGame(userChoice) {
    const choices = ['камень', 'ножницы', 'бумага'];
    // Рандомный выбор сайта
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let result = "";

    if (userChoice === compChoice) {
        result = "Ничья! 🤝";
    } else if (
        (userChoice === 'камень' && compChoice === 'ножницы') ||
        (userChoice === 'ножницы' && compChoice === 'бумага') ||
        (userChoice === 'бумага' && compChoice === 'камень')
    ) {
        result = "Вы победили! 🎉";
        userScore++;
    } else {
        result = "Вы проиграли! 🤖";
        compScore++;
    }

    // Выводим результат на страницу
    document.getElementById('game-text').innerHTML = 
        `Вы выбрали: <b>${userChoice}</b><br>Сайт выбрал: <b>${compChoice}</b><br>${result}`;
    
    document.getElementById('score').textContent = `Вы: ${userScore} | Сайт: ${compScore}`;
}

renderTasks();
