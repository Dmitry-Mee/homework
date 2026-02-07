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
    const tempElement = document.getElementById('temp-value');
    const apiKey = '5QTFSE8GZUJ8BLX3ZSFE2YEMG'; // ключ
    const city = 'Yekaterinburg';

    // Формируем запрос: Екатеринбург, метрическая система (Цельсии), язык RU
    const url = `https://weather.visualcrossing.com{city}&aggregateHours=24&unitGroup=metric&shortColumnNames=false&contentType=json&key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        console.log("Данные от Visual Crossing:", data);

        // У этого API данные лежат в массиве locations
        const locationData = Object.values(data.locations)[0];
        const currentTemp = Math.round(locationData.values[0].temp);
        const description = locationData.values[0].conditions;

        if (tempElement) {
            tempElement.textContent = `${currentTemp}°C`;
            tempElement.style.color = currentTemp < 0 ? "#00d4ff" : "#ff8c00";

            // Если у тебя есть элемент для описания, можно добавить и его
            const descElement = document.getElementById('weather-desc');
            if (descElement) descElement.textContent = description;
        }

    } catch (error) {
        console.error("Ошибка Visual Crossing:", error);
        if (tempElement) tempElement.textContent = "Ошибка API";
    }
}


// 6. Запуск всего при старте
renderTasks();
updateWeather();
