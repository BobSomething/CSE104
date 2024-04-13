"use strict";

let width = 12;
let height = 12;
const board = document.querySelector('#board');

for(let i=0; i<width*height; i++) {
    const newdiv = document.createElement('div');
    newdiv.classList.add('cell');
    console.log(1);
    board.appendChild(newdiv);
}