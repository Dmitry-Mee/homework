const btn = document.getElementById('main-button');
const textElement = document.getElementById('dynamic-text');
const input = document.getElementById('user-input'); // Находим поле ввода

btn.onclick = function () {
    const userName = input.value; // Забираем текст из поля

    if (userName === "") {
        textElement.textContent = "Пожалуйста, введи имя!";
        textElement.style.color = "red";
    } else {
        textElement.textContent = "Привет, " + userName + "! Ты делаешь успехи в JS!";
        textElement.style.color = "black";

        // Меняем цвет кнопки, как и раньше
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        btn.style.backgroundColor = randomColor;
    }
};
