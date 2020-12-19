//clicks READ MORE

const buttonArtOfCoding = document.getElementsByClassName('feature-element-button-art-of-codding');
const buttonCleanDesign = document.getElementsByClassName('feature-element-button-clean-design');
const buttonAmazingSupport = document.getElementsByClassName('feature-element-button-amazing-support');

const textAreaArtOfCodding = document.getElementsByClassName('feature-element-content-art-of-codding');
const textAreaCleanDesign = document.getElementsByClassName('feature-element-content-clean-design');
const textAreaAmazingSupport = document.getElementsByClassName('feature-element-content-amazing-support');

[].forEach.call(buttonArtOfCoding, function (button) {
    button.addEventListener('click', function (e) {
        [].forEach.call(textAreaArtOfCodding, function (text) {
            text.innerHTML = '<div><span class="span-button">-</span> Враховує споживання енергоресурсів, шляхом збору даних з приладу обліку з фіксованим періодом контролю</div> <div><span class="span-button">-</span> Має можливість зберігати всі розрахункові параметри в базі даних</div> <div><span class="span-button">-</span> Дозволяє контролювати ліміти енергоспоживання</div> <div><span class="span-button">-</span> Забезпечує щоденний контроль працездатності приладів обліку</div>'
        })
    })
});

[].forEach.call(buttonCleanDesign, function (button) {
    button.addEventListener('click', function (e) {
        [].forEach.call(textAreaCleanDesign, function (text) {
            text.innerHTML = '<div><span class="span-button">-</span> Збір даних</div> <div><span class="span-button">-</span> Накопичення даних</div> <div><span class="span-button">-</span> Зберігання даних</div> <div><span class="span-button">-</span> Обробка даних</div> <div><span class="span-button">-</span> Відображення у вигляді  діаграм та графіків</div>'
        })
    })
});

[].forEach.call(buttonAmazingSupport, function (button) {
    button.addEventListener('click', function (e) {
        [].forEach.call(textAreaAmazingSupport, function (text) {
            text.innerHTML = '<div><span class="span-button">-</span> Можливість роботи з системою через веб-браузер</div> <div><span class="span-button">-</span> Візуалізація результатів вимірювань у вигляді графіків і  діаграм</div> <div><span class="span-button">-</span> Аналітична обробка результатів вимірювань у вигляді тимчасових і статистичних залежностей параметрів</div>'
        })
    })
});