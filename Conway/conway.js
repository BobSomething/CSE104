"use strict";

let width = 12;
let height = 12;
const board = document.querySelector('#board')

for(let i=0; i<width; i++) {
    const newdiv = document.createElement('div.cell')
    board.appendChild(newdiv);
}