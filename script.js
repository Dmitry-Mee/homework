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
    }
};

// 5. ЗАПУСК ПРИ ЗАГРУЗКЕ
renderTasks();
