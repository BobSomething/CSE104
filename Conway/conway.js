"use strict";

//Help button

const help = document.querySelector('#help');
help.addEventListener('click',showHelp);

let helper = 0;

function showHelp() {
    const titlediv = document.querySelector('#title');
    if(helper == 0) {
        titlediv.style.height = '450px';
        helper = 1;
        const parent = document.querySelector('#textHelp');
        setTimeout(() => {parent.style.maxHeight = '100%';}, 500); 
        
    }
    else {
        const parent = document.querySelector('#textHelp');
        parent.style.maxHeight = '0';
        setTimeout(() => {titlediv.style.height = '80px';}, 500); 
        helper = 0; 
    }
    
}


let width = 30;
let height = 30;

let lights = {};
let cords = {};

const container = document.querySelector('#board');
const widthchange = document.querySelector('#width');
const heightchange = document.querySelector('#height');

widthchange.addEventListener('input', change);
heightchange.addEventListener('input', change);


//Toggleable cells

function cellClicked(event) {
    if(lights[event.currentTarget.classList[1]] != 1) {
        event.currentTarget.style.background = 'black';
        lights[event.currentTarget.classList[1]] = 1;
    }
    else {
        event.currentTarget.style.background = 'white';
        lights[event.currentTarget.classList[1]] = 0;
    }
    console.log(lights)
    
}

//Setting the cells

function setCells() {
    lights = {};
    cords = {};
    for(let i=0; i<height; i++) {
        const board = document.createElement('div');
        container.appendChild(board);
        for(let j=0; j<width; j++)
        {
            const newdiv = document.createElement('div');
            newdiv.classList.add(`cell`);
            newdiv.classList.add(`${i},${j}`);
            newdiv.id = `${i},${j}`;
            cords[newdiv.classList[1]] = newdiv;
            lights[newdiv.classList[1]] = 0;
            newdiv.addEventListener('click',cellClicked);
            board.appendChild(newdiv);
        }
    }
}

setCells();


function change(event) {
    width = parseInt(widthchange.value);
    height = parseInt(heightchange.value);
    container.innerHTML = '';
    setCells();
}



//Game

const isGame = document.querySelector('#start-button');
isGame.addEventListener('click', game);

const clear = document.querySelector('#clear-button');
clear.addEventListener('click', change);


//Standard

function conway1() {
    function neighbours(x,y) {
        let count = 0;
        for(let i=-1; i<=1; i++)
        {
            for(let j=-1; j<=1; j++)
            {
                if(i == 0 && j == 0) {continue;}
                if(lights[`${x+i},${y+j}`] == 1) {count++;}
            }
        }
        return count;
    }
    
    let temp = {};
    for(let i=0; i<height; i++) {
        for(let j=0; j<width; j++) {
            const num = neighbours(i,j);
            const current = cords[`${i},${j}`];

            if(lights[`${i},${j}`] == 1)
            {
                if(num < 2 || num > 3) {
                    current.style.background = 'white';
                }
                else if(num == 2 || num == 3) temp[`${i},${j}`] = 1;
            } 
            else
            {
                if(num == 3) {
                    temp[`${i},${j}`] = 1;
                    current.style.background = 'black';
                }
            }
        }
    }
    lights = temp;
}

//Torus

function conway2() {
    function neighbours(x,y) {
        let count = 0;
        for(let i=-1; i<=1; i++)
        {
            for(let j=-1; j<=1; j++)
            {
                if(i == 0 && j == 0) {continue;}
                let a = (height+x);
                let b = (width+y);
                a -= i; b -= j; a %= height; b %= width;
                if(lights[`${a},${b}`] == 1) {count++;}
            }
        }
        return count;
        
    }

    let temp = {};
    for(let i=0; i<height; i++) {
        for(let j=0; j<width; j++) {
            const num = neighbours(i,j);
            const current = cords[`${i},${j}`];

            if(lights[`${i},${j}`] == 1)
            {
                if(num < 2 || num > 3) {
                    current.style.background = 'white';
                }
                else if(num == 2 || num == 3) temp[`${i},${j}`] = 1;
            } 
            else
            {
                if(num == 3) {
                    temp[`${i},${j}`] = 1;
                    current.style.background = 'black';
                }
            }
        }
    }
    lights = temp;
}

//Klein Bottle

function conway3() {
    function neighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) { continue; }

                let a = (height + x + i) % height;
                let b = (width + y + j) % width;
                if(x+i < 0 || x+i >= height) {
                    b = width - b;
                }
                if (lights[`${a},${b}`] === 1) { count++; }
            }
        }
        return count;
    }

    let temp = {};
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const num = neighbors(i, j);
            const current = cords[`${i},${j}`];

            if (lights[`${i},${j}`] == 1) {
                if (num < 2 || num > 3) {
                    current.style.background = 'white';
                } else if (num == 2 || num == 3) temp[`${i},${j}`] = 1;
            } else {
                if (num == 3) {
                    temp[`${i},${j}`] = 1;
                    current.style.background = 'black';
                }
            }
        }
    }
    lights = temp;
}


//Cross surface

function conway4() {
    function neighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {continue;}

                let a = (height + x + i) % height;
                let b = (width + y + j) % width;
                if(x+i < 0 || x+i >= height) {
                    b = width - b;
                }
                if(y+j < 0 || y+j >= width) {
                    a = height - a;
                }

                if (lights[`${a},${b}`] === 1) {count++;}
            }
        }
        return count;
    }

    let temp = {};
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const num = neighbors(i, j);
            const current = cords[`${i},${j}`];

            if (lights[`${i},${j}`] == 1) {
                if (num < 2 || num > 3) {
                    current.style.background = 'white';
                } else if (num == 2 || num == 3) temp[`${i},${j}`] = 1;
            } else {
                if (num == 3) {
                    temp[`${i},${j}`] = 1;
                    current.style.background = 'black';
                }
            }
        }
    }
    lights = temp;
}



//Game Animation

let gameOn = 0;

function game() {
    gameOn = gameOn ^ 1;

    if(gameOn) {
        isGame.id = 'end-button';
        isGame.innerHTML = 'END';
    }
    else {
        isGame.id = 'start-button';
        isGame.innerHTML = 'START';
    }

    if(gameOn) {requestAnimationFrame(gameoflife);}
    console.log(gameOn)
}

const type = document.querySelector('#type');

type.addEventListener('input', changetype);


let currentgame = conway1;
let games = [conway1,conway2,conway3,conway4];

function changetype(){
    currentgame = games[type.value];
    console.log(0);
}

const speed = document.querySelector('#speed');
speed.addEventListener('input',changeSpeed);

let currentSpeed = 500;

function changeSpeed() {
    currentSpeed = 2500/speed.value;
}

function gameoflife() {
    if(gameOn) {
        currentgame();
        setTimeout(() => { requestAnimationFrame(gameoflife); }, currentSpeed);
    }
}




