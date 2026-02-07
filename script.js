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

// 5. НОВАЯ ЛОГИКА: Погода (Екатеринбург)
async function updateWeather() {
    try {
        // Добавили параметр &current=temperature_2m — это современный стандарт этого API
        const response = await fetch('https://api.open-meteo.com');
        const data = await response.json();

        console.log("Ответ от сервера:", data); // Посмотри в консоль, увидишь структуру

        // Новая структура данных: данные теперь лежат в data.current.temperature_2m
        const temp = Math.round(data.current.temperature_2m);

        if (tempElement) {
            tempElement.textContent = temp + "°C";
            // Если холодно — голубой, если тепло — оранжевый
            tempElement.style.color = temp < 0 ? "#00d4ff" : "#ff8c00";
        }
    } catch (e) {
        console.error("Ошибка получения погоды:", e);
        if (tempElement) tempElement.textContent = "Ошибка";
    }
}

// 6. Запуск всего при старте
renderTasks();
updateWeather();
