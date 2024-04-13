"use strict";

let width = 12;
let height = 12;
const board = document.querySelector('#board');
const widthchange = document.querySelector('#width');
const heightchange = document.querySelector('#height');

widthchange.addEventListener('input', change);
heightchange.addEventListener('input', change);

function change(event) {
    console.log(1);
    width = widthchange.value;
    height = heightchange.value;
    board.innerHTML = '';
    for(let i=0; i<width*height; i++) {
        const newdiv = document.createElement('div');
        newdiv.classList.add('cell');
        console.log(1);
        board.appendChild(newdiv);
    }
}

for(let i=0; i<width*height; i++) {
    const newdiv = document.createElement('div');
    newdiv.classList.add('cell');
    console.log(1);
    board.appendChild(newdiv);
}

