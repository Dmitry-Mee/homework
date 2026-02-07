const btn = document.getElementById('main-button');
const textElement = document.getElementById('dynamic-text');
const input = document.getElementById('user-input'); // Находим поле ввода
const list = document.getElementById('todo-list');

const savedName = localStorage.getItem('lastUser');

if (savedName) {
    textElement.textContent = "С возвращением, " + savedName + "!";
}
// 1. Пытаемся загрузить старые задачи или создаем пустой массив, если их нет
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
function renderTasks() {
    list.innerHTML = ""; // Сначала очищаем весь список на экране
    tasks.forEach((task, index) => {
        const newEntry = document.createElement('li');
        newEntry.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Удалить";

        deleteBtn.onclick = function () {
            tasks.splice(index, 1); // Удаляем из массива по индексу
            saveAndRender(); // Пересохраняем и перерисовываем
        };

        newEntry.appendChild(deleteBtn);
        list.appendChild(newEntry);
    });
}
// 3. Функция для сохранения в память и обновления экрана
function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}
btn.onclick = function () {


    const userName = input.value; // Забираем текст из поля
    console.log("Кнопка нажата! Введено имя: ", userName);
    if (userName === "") {
        textElement.textContent = "Пожалуйста, введи имя!";
        textElement.style.color = "red";
        textElement.style.fontFamily = "";
        textElement.style.fontWeight = "";
        textElement.style.fontSize = "";

    }
    else if (userName === "Admin") {
        textElement.textContent = "Hi, Admin!";
        textElement.style.fontFamily = "cursive";
        textElement.style.fontWeight = "bold";
        textElement.style.fontSize = "24px";
        textElement.style.color = "gold";
    }
    else {
        textElement.textContent = "Привет, " + userName + "! Ты делаешь успехи в JS!";
        textElement.style.color = "black";
        textElement.style.fontFamily = "";
        textElement.style.fontWeight = "";
        textElement.style.fontSize = "";

        // Меняем цвет кнопки, как и раньше
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        btn.style.backgroundColor = randomColor;

        tasks.push("Пользователь: " + userName);
        localStorage.setItem('lastUser', userName);
        saveAndRender();

        input.value = ""; // Очищаем поле

    }
}

renderTasks();