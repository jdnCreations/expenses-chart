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
        // set today's bar:hover to cyan

        const bar = document.querySelector(`.${day.day}-bar`);
        const tooltip = document.querySelector(`#${day.day} .tooltiptext`);
        tooltip.innerHTML = `$${day.amount}`;
        bar.style.height = calculateBarHeight(day.amount);

        console.log(day.day);
        console.log(currentDay);
        if (day.day === currentDay) {
            console.log('today is ' + day.day);
            theCurrentDay = day.day;
            bar.classList.add('currentDay');
        }
    })
    const todaysBar = document.querySelector(`.${theCurrentDay}-bar`);

    todaysBar.onmouseover = () => {
        console.log("MOUSE WENT OVER RIGHT BAR");
        todaysBar.style.backgroundColor = "hsla(186, 34%, 60%, .5)";
    }

    todaysBar.onmouseleave = () => {
        console.log("mouse left")
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
