const btn = document.getElementById('main-button');
const textElement = document.getElementById('dynamic-text');
const input = document.getElementById('user-input');
const list = document.getElementById('todo-list');
const themeBtn = document.getElementById('theme-toggle');

// 1. ТЕМНАЯ ТЕМА (Логика)
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeBtn.onclick = function () {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
};

// 2. ЗАГРУЗКА ИМЕНИ И СПИСКА
const savedName = localStorage.getItem('lastUser');
if (savedName) {
    textElement.textContent = "С возвращением, " + savedName + "!";
}

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 3. ФУНКЦИИ ОТРИСОВКИ И СОХРАНЕНИЯ (Важно: они стоят отдельно)
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const newEntry = document.createElement('li');
        newEntry.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Удалить";

        deleteBtn.onclick = function () {
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

// 4. ГЛАВНАЯ КНОПКА (Добавление)
btn.onclick = function () {
    const userName = input.value;
    if (userName === "") {
        textElement.textContent = "Пожалуйста, введи имя!";
        textElement.style.color = "red";
    } else if (userName === "Admin") {
        textElement.textContent = "Hi, Admin!";
        textElement.style.color = "gold";
    } else {
        textElement.textContent = "Привет, " + userName + "! Ты делаешь успехи в JS!";
        textElement.style.color = ""; // Сброс к переменным CSS

        tasks.push("Пользователь: " + userName);
        localStorage.setItem('lastUser', userName);
        saveAndRender();
        input.value = "";
        getFact();
    }
};

// 5. ЗАПУСК ПРИ ЗАГРУЗКЕ
renderTasks();

async function getFact() {
    const quoteElement = document.getElementById('quote-text');
    try {
        // Запрашиваем случайный факт на английском
        const response = await fetch('https://uselessfacts.jsph.pl');
        const data = await response.json();

        // Выводим факт на страницу
        quoteElement.textContent = "Интересный факт: " + data.text;
        quoteElement.style.fontStyle = "italic";
        quoteElement.style.fontSize = "0.9em";
        quoteElement.style.marginTop = "10px";
    } catch (error) {
        quoteElement.textContent = "Не удалось загрузить факт :(";
        console.error("Ошибка API:", error);
    }
}

async function updateWeather() {
    try {
        // Запрос к API (Екб: 56.84, 60.61)
        const response = await fetch('https://api.open-meteo.com');
        const data = await response.json();

        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode; // Код погоды (ясно, снег и т.д.)

        const tempElement = document.getElementById('temp-value');
        tempElement.textContent = temp + "°C";

        // ЛОГИКА: Меняем стиль в зависимости от температуры
        if (temp < -10) {
            tempElement.style.color = "#00d4ff"; // Холодно — голубой
        } else if (temp > 0) {
            tempElement.style.color = "#ff8c00"; // Тепло — оранжевый
        }

        console.log("Данные о погоде получены успешно!");
    } catch (error) {
        console.error("Ошибка получения погоды:", error);
    }
}

updateWeather();
