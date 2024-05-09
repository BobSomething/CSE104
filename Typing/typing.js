"use strict";

//https://random-word-form.herokuapp.com

const numWords = document.querySelector('#numwords');
const addDisplay = document.querySelector('#display');

const start = document.querySelector('#start');
start.addEventListener('click',changeDisplay);

let stringWords = '';
let currentChar = 0;

function changeDisplay() {
    fetch(`https://random-word-api.herokuapp.com/word?number=${numWords.value}`)
    .then(response => response.json())
    .then(data => {addDisplay.innerHTML = data.join(' '); stringWords = data.join(' ')})
}

document.addEventListener('keydown', changeText);

let currentString = '';
let text = '';

function changeText(event) {
    if(event.key === 'Backspace') {
        for(let i=text.length - 6; i>=0; i--) {
            if(text.substring(i,i+5) === '<span') {
                currentString = currentString.slice(0,-1);
                text = text.slice(0,i);
                break;
            }
        }
        addDisplay.innerHTML = text + stringWords.substring(currentString.length);
        return;
    }
    else if((event.which >= 65 && event.which <= 90) || event.which === 32) {
        currentString += event.key;
    }
    else {
        return;
    }

    if(stringWords[currentString.length - 1] === event.key) {
        text += '<span style="color:blue">' + stringWords.substring(currentString.length - 1, currentString.length) + '</span>';
        
    }
    else {
        text += '<span style="color:red">' + stringWords.substring(currentString.length - 1, currentString.length) + '</span>';
    }
    console.log(text);
    addDisplay.innerHTML = text + stringWords.substring(currentString.length);
}



