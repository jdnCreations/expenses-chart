const ctx = document.getElementById('myChart');
let data;
let theCurrentDay;

fetch('./data.json')
    .then((res) => res.json())
    .then(data => {

    const chart = document.querySelector('#days');

    
    const today = new Date();
    const locale = navigator.language;
    let currentDay = today.toLocaleDateString(locale, {weekday: 'short'});
    currentDay = currentDay.toLowerCase();
        
    data.forEach(day => {
        const bar = document.querySelector(`.${day.day}-bar`);
        const tooltip = document.querySelector(`#${day.day} .tooltiptext`);
        tooltip.innerHTML = `$${day.amount}`;
        bar.style.height = calculateBarHeight(day.amount);

        if (day.day === currentDay) {
            theCurrentDay = day.day;
            bar.classList.add('currentDay');
        }
    })
    const todaysBar = document.querySelector(`.${theCurrentDay}-bar`);

    todaysBar.onmouseover = () => {
        todaysBar.style.backgroundColor = "hsla(186, 34%, 60%, .5)";
    }

    todaysBar.onmouseleave = () => {
        todaysBar.style.backgroundColor = "hsla(10, 79%, 65%)";
    }
    
});



function calculateBarHeight(value) {
    let height;
    roundedHeight = Math.round(value);
    height = roundedHeight * 3;
    flooredHeight = Math.floor(height / 10) * 10;
    return `${flooredHeight}px`;
}
