// let viewMode = 'daily';

/**
 * @typedef {Object} Timeframe
 * @property {String} current
 * @property {String} previous
 */

/**
 * @typedef {Object} Card
 * @property {String} title
 * @property {Object} timeframes
 * @property {Timeframe} timeframes.daily
 * @property {Timeframe} timeframes.weekly
 * @property {Timeframe} timeframes.monthly
 */

/** @type {HTMLElement} */
const cards = document.getElementById('cards');

/** @type {HTMLElement} */
const main = document.getElementById('main');

/** @type {HTMLElement} */
const btnDaily = document.getElementById('btn-daily');

/** @type {HTMLElement} */
const btnWeekly = document.getElementById('btn-weekly');

/** @type {HTMLElement} */
const btnMonthly = document.getElementById('btn-monthly');

btnDaily.addEventListener('click', () => {
    main.dataset.timeframe = 'daily';
});

btnWeekly.addEventListener('click', () => {
    main.dataset.timeframe = 'weekly';
});

btnMonthly.addEventListener('click', () => {
    main.dataset.timeframe = 'monthly';
});

/**
 * 
 * @param {Card} cardObj 
 */
const appendCard = function(cardObj) {
    const convTitle = cardObj.title.toLowerCase().replace(' ', '-');

    const card = document.createElement('div');    
    card.classList.add('card', convTitle);

    const img = document.createElement('img');
    img.src = `./images/icon-${convTitle}.svg`;
    img.alt = '';

    const info = document.createElement('div');
    info.className = 'info';

    const title = document.createElement('span');
    title.classList.add('title', 'rubik-500');
    title.textContent = `${cardObj.title}`;

    const more = document.createElement('div');
    more.className = 'more';

    const currentDaily = document.createElement('span');
    currentDaily.classList.add('current', 'daily', 'rubik-300');
    currentDaily.textContent = `${cardObj.timeframes.daily.current}hrs`;
    
    const previousDaily = document.createElement('span');
    previousDaily.classList.add('previous', 'daily', 'rubik-400');
    previousDaily.textContent = `Previous - ${cardObj.timeframes.daily.previous}hrs`;
    
    const currentWeekly = document.createElement('span');
    currentWeekly.classList.add('current', 'weekly', 'rubik-300');
    currentWeekly.textContent = `${cardObj.timeframes.weekly.current}hrs`;
    
    const previousWeekly = document.createElement('span');
    previousWeekly.classList.add('previous', 'weekly', 'rubik-400');
    previousWeekly.textContent = `Previous - ${cardObj.timeframes.weekly.previous}hrs`;
    
    const currentMonthly = document.createElement('span');
    currentMonthly.classList.add('current', 'monthly', 'rubik-300');
    currentMonthly.textContent = `${cardObj.timeframes.monthly.current}hrs`;
    
    const previousMonthly = document.createElement('span');
    previousMonthly.classList.add('previous', 'monthly', 'rubik-400');
    previousMonthly.textContent = `Previous - ${cardObj.timeframes.monthly.previous}hrs`;

    info.appendChild(title);
    info.appendChild(more);
    info.appendChild(currentDaily);
    info.appendChild(previousDaily);
    info.appendChild(currentWeekly);
    info.appendChild(previousWeekly);
    info.appendChild(currentMonthly);
    info.appendChild(previousMonthly);

    card.appendChild(img);
    card.appendChild(info);

    cards.appendChild(card);
};

(async () => {
    const response = await fetch('./data.json');
    if (!response.ok) {
        console.log('Failed to get data.');
        return;
    } else {
        /** @type {Card[]} */
        const cardObjs = await response.json();

        cardObjs.forEach((value) => {
            appendCard(value);
        });
    }
})()
