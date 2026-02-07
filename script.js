const btn = document.getElementById('main-button');
const text = document.getElementById('dynamic-text');

const phrases = [
    "Я уже умею работать с GitHub Pages!",
    "Я победил кодировку UTF-8!",
    "JavaScript — это сила.",
    "Мой код становится лучше с каждым коммитом."
];

btn.onclick = function () {
    // 1. Меняем текст
    const randomIndex = Math.floor(Math.random() * phrases.length);
    text.textContent = phrases[randomIndex];

    // 2. Меняем цвет кнопки на случайный
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    btn.style.backgroundColor = randomColor;
};
