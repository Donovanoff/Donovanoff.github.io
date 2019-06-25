'use-strict';

let sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main');
const wrapper = document.querySelector('.wrapper');

const setupSidebar = () => {
    if(window.innerWidth <= 1400){
        const height = main.offsetHeight;
        sidebar.style.height = `${height}px`;
        wrapper.style.height = `${height}px`;
    }
} 

setupSidebar();

window.addEventListener('resize',() => {
    setupSidebar();
});

let power = document.querySelector('#power');
let cost = document.querySelector('#cost');

const PRICE = 3.3;

const calculateCost = () => {
    
    powerValue = Number(power.value);
    
    if(isNaN(powerValue)){
        cost.value = 'Неверное значение';
        return;
    }


    if(powerValue < 0 || powerValue > 9999){
        cost.value = 'Неверное значение';
        return false;
    }

    cost.value = powerValue * PRICE;
}

power.addEventListener('change',calculateCost);
power.addEventListener('input',calculateCost);

const slider = document.querySelector('#slider');

const setPowerValue = () => {
    const sliderValue = slider.value;

    powerValue = Number(power.value);

    power.value = sliderValue;

    cost.value = powerValue * PRICE;
}

slider.addEventListener('change',setPowerValue);
slider.addEventListener('input',setPowerValue);