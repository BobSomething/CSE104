"use strict";


let N = 10000;

let possibleValues = [];
let probsDistribution = [];
let withSpecificDistr = 0;

//Random experiment
function rand() {
    if(withSpecificDistr === 1) {
        const r = Math.random();
        let sumProb = 0;
        for(let i=0; i<probsDistribution.length; i++) {
            sumProb += probsDistribution[i];
            if(r < sumProb) {
                return possibleValues[i];
            }
        }
    }

    return possibleValues[Math.floor(Math.random() * (possibleValues.length))];
}


const numdices = document.querySelector('#numdices');
const dots = document.querySelector('#dots');
const iterations = document.querySelector('#iterations');
const inputs = document.querySelector('.inputs');

dots.addEventListener('input',changeSetup);
numdices.addEventListener('input',changeSetup);
iterations.addEventListener('input',changeSetup);


const changeRange = document.querySelector('#changeRange');

changeRange.addEventListener('click',changeR);

let rangeType = 0;

const rangeA = document.querySelector('#a');
const rangeB = document.querySelector('#b');

const listrange = document.querySelector('#listrange');
listrange.addEventListener('input',changeSetup);

//Changing the range type
function changeR() {
    rangeType ^= 1;
    if(rangeType == 1) {
        changeRange.value = 'Custom Range';
        rangeA.style.display = 'none';
        rangeB.style.display = 'inline-block';
    }
    else {
        changeRange.value = 'Simple Range';
        rangeA.style.display = 'inline-block';
        rangeB.style.display = 'none';
    }
    changeSetup();
}


let sumdice = [];
let range = [];

let numdots = 6;
let amountdices = 2;

//Doing the Setup
function changeSetup() {
    N = iterations.value;
    amountdices = numdices.value;
    numdots = dots.value;
    sumdice = [];
    range = [];

    possibleValues = [];

    if(rangeType == 0) {
        for(let i=1; i<=dots.value; i++) {
            possibleValues.push(i);
        }
    }
    else {
        let list = listrange.value.split(',');
        for(let c of list) {
            possibleValues.push(parseInt(c));
        }
    }

    let maxValue = 0;

    for(let x of possibleValues) {
        if(maxValue < x) maxValue = x;
    }

    for(let i=0; i<=maxValue*amountdices + 1; i++) {
        sumdice[i] = 0;
    }

    for(let i=0; i<N; i++) {
        let sum = 0;
        for(let j=0; j<amountdices; j++)
            sum += rand();
        sumdice[sum]++;
    }

    let minIndex = 0, maxIndex = sumdice.length;

    for(let c of sumdice) {
        if(c > 0) break;
        minIndex++;
    }
    for(let i=sumdice.length-1; i>=0; i--) {
        if(sumdice[i] > 0) break;
        maxIndex--;
    }

    sumdice.splice(maxIndex+1,sumdice.length-maxIndex);

    sumdice.splice(0,minIndex-1);

    for(let i=minIndex-1; i<=maxIndex+1; i++) {
        range.push(i);
    }

    //using the API to display the graph
    let display = {
        x:range,
        y:sumdice,
        type: 'bar'
        
    };

    let layout = {
        title: 'Sum of dices',
        //showlegend: true
        bargap :0.01
    };

    Plotly.newPlot('display', [display], layout, {displayModeBar: false});

}

changeSetup();

const probs = document.querySelector('#probabilites');
probs.addEventListener('input',probability);

//Extra function for the specific probabilites
function probability() {
    const p = document.querySelector('#prob');

    if(probs.value === '') {
        p.innerHTML = '';
        withSpecificDistr = 0;
        return;
    }
    withSpecificDistr = 1;

    let list_probs = probs.value.split(',');
    probsDistribution = [];
    for(let t of list_probs) {
        probsDistribution.push(parseFloat(t));
    }
    let sum = 0;
    for(let a of probsDistribution) {
        sum += a;
    }
    
    if(sum != 1.0) {
        p.innerHTML = '';
        p.textContent = 'Wrong probability distribution! The probabilities must add up to 1!';
        return
    }
    if(probsDistribution.length != possibleValues.length) {
        p.innerHTML = '';
        p.textContent = "Wrong probability distribution! The number of probabilities and the number of dots don't match!";
        return
    }
    p.innerHTML = '';
    changeSetup();
}







