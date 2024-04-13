"use strict";

let width = 30;
let height = 30;
const size = 22;
const board = document.querySelector('#board');
const widthchange = document.querySelector('#width');
const heightchange = document.querySelector('#height');

widthchange.addEventListener('input', change);
heightchange.addEventListener('input', change);

function change(event) {
    width = widthchange.value;
    height = heightchange.value;
    board.innerHTML = '';
    board.style.width = `${size*width+3}px`
    board.style.height = `${size*height+3}px`

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

