const btn = document.getElementById('main-button');
const textElement = document.getElementById('dynamic-text');
const input = document.getElementById('user-input'); // Находим поле ввода
const list = document.getElementById('todo-list');

btn.onclick = function () {
    console.log("Кнопка нажата! Введено имя: ", userName);

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

        // 1. Создаем элемент списка
        const newEntry = document.createElement('li');
        console.log("Добавлен новый элемент списка для пользователя:", userName);
        newEntry.textContent = "Пользователь: " + userName + " "; // Добавим пробел в конце

        // 2. Создаем кнопку удаления внутри этого li
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Удалить";
        deleteBtn.style.marginLeft = "10px"; // Небольшой отступ
        deleteBtn.style.padding = "2px 8px"; // Сделаем её поменьше основной

        // 3. Логика удаления: при клике на ЭТУ кнопку, удаляем ЭТОТ li
        deleteBtn.onclick = function () {
            console.warn("Удаляем пользователя: " + userName); // Выведет желтое предупреждение
            newEntry.remove();
        };


        // 4. Собираем конструктор: кладем кнопку ВНУТРЬ li, а li — ВНУТРЬ списка
        newEntry.appendChild(deleteBtn);
        list.appendChild(newEntry);

        // 5. Очищаем поле ввода
        input.value = "";

    }
    }