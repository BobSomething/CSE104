"use strict";

let width = 30;
let height = 30;
const size = 30;
const board = document.querySelector('#board');
const widthchange = document.querySelector('#width');
const heightchange = document.querySelector('#height');

widthchange.addEventListener('input', change);
heightchange.addEventListener('input', change);

function change(event) {
    width = widthchange.value;
    height = heightchange.value;
    board.innerHTML = '';
    board.style.width = `${size*width}px`
    board.style.height = `${size*height}px`

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

