const btn = document.getElementById('main-button');
const textElement = document.getElementById('dynamic-text');
const input = document.getElementById('user-input'); // Находим поле ввода
const list = document.getElementById('todo-list');

btn.onclick = function () {
    const userName = input.value; // Забираем текст из поля

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

        // --- РАБОТА СО СПИСКОМ ---

        // 1. Создаем новый тег li
        const newEntry = document.createElement('li');

        // 2. Пишем в него текст (имя пользователя)
        newEntry.textContent = "Пользователь: " + userName;

        // 3. Добавляем этот li внутрь нашего ul (списка)
        list.appendChild(newEntry);

        input.value = "";
    }
    }