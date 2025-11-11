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

    /**
     * 
     * @param {'daily' | 'weekly' | 'monthly'} mode 
     * @returns The current and the previous.
     */
    const createTimeframe = function (mode) {
        const currentVal = cardObj.timeframes[mode].current;
        const current = document.createElement('span');
        current.classList.add('current', mode, 'rubik-300');
        current.textContent = `${currentVal}hr${currentVal <= 1 ? '' : 's'}`;
        
        const dict = {
            daily: 'Yesterday',
            weekly: 'Last Week',
            monthly: 'Last Month',
        }
        const previousVal = cardObj.timeframes[mode].previous;
        const previous = document.createElement('span');
        previous.classList.add('previous', mode, 'rubik-400');
        previous.textContent = `${dict[mode]} - ${previousVal}hr${previousVal <= 1 ? '' : 's'}`;

        console.log(current, previous);
        return {current, previous};
    };
    
    const {current: currentDaily, previous: previousDaily} = createTimeframe('daily');
    const {current: currentWeekly, previous: previousWeekly} = createTimeframe('weekly');
    const {current: currentMonthly, previous: previousMonthly} = createTimeframe('monthly');

    console.log(currentDaily, previousDaily);
    
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
