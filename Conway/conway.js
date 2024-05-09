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


<<<<<<< HEAD

=======
let width = 30;
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
let height = 30;

let lights = {};
let cords = {};

const container = document.querySelector('#board');
const widthchange = document.querySelector('#width');
const heightchange = document.querySelector('#height');

widthchange.addEventListener('input', change);
heightchange.addEventListener('input', change);

<<<<<<< HEAD
widthchange.max = Math.floor(window.innerWidth/30);
widthchange.value = Math.min(30,Math.floor(window.innerWidth/30));
let width = parseInt(widthchange.value);
=======
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a

//Toggleable cells

function cellClicked(event) {
    if(lights[event.currentTarget.classList[1]] != 1) {
        event.currentTarget.style.background = 'black';
        lights[event.currentTarget.classList[1]] = 1;
    }
    else {
<<<<<<< HEAD
        event.currentTarget.style.background = 'none';
        lights[event.currentTarget.classList[1]] = 0;
    }   
=======
        event.currentTarget.style.background = 'white';
        lights[event.currentTarget.classList[1]] = 0;
    }
    console.log(lights)
    
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
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


<<<<<<< HEAD
function change() {
=======
function change(event) {
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
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

<<<<<<< HEAD
//helper functions

function changingNeighbours(neigh) {
    let temp = {};
    for(let i=0; i<height; i++) {
        for(let j=0; j<width; j++) {
            const num = neigh(i,j);
            const current = cords[`${i},${j}`];

            if(lights[`${i},${j}`] == 1) {
                if(num < 2 || num > 3) {
                    current.style.background = 'none';
=======

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
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
                }
                else if(num == 2 || num == 3) temp[`${i},${j}`] = 1;
            } 
            else
<<<<<<< HEAD
=======
            {
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
                if(num == 3) {
                    temp[`${i},${j}`] = 1;
                    current.style.background = 'black';
                }
<<<<<<< HEAD
=======
            }
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
        }
    }
    lights = temp;
}

<<<<<<< HEAD
function neighs(x,y,condition) {
    let count = 0;
    for(let i=-1; i<=1; i++)
    {
        for(let j=-1; j<=1; j++)
            {
            if(i == 0 && j == 0) {continue;}
            if(condition(x,y,i,j)) {count++;}
        }
    }
    return count;
}

//Standard

function conway1() {
    function neighbours1(x,y) {
        function condition1(x,y,i,j) {
            return (lights[`${x+i},${y+j}`] === 1);
        }
        return neighs(x,y,condition1);
    }
    changingNeighbours(neighbours1);
}

//Torus

function conway2() {
    function neighbours2(x,y) {
        function condition2(x,y,i,j) {
            let a = (height+x);
            let b = (width+y);
            a -= i; b -= j; a %= height; b %= width;
            return lights[`${a},${b}`] === 1;
        }
        return neighs(x,y,condition2);       
    }
    changingNeighbours(neighbours2);
=======
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
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
}

//Klein Bottle

function conway3() {
<<<<<<< HEAD
    function neighbours3(x, y) {
        function condition3(x,y,i,j) {
            let a = (height + x + i) % height;
            let b = (width + y + j) % width;
            if(x+i < 0 || x+i >= height) {
                b = width - b;
            }
            return (lights[`${a},${b}`] === 1);
        }
        return neighs(x,y,condition3);
    }

    changingNeighbours(neighbours3);
}

//Cross surface

function conway4() {
    function neighbours4(x, y) {
        function condition4(x,y,i,j) {
            let a = (height + x + i) % height;
            let b = (width + y + j) % width;
            if(x+i < 0 || x+i >= height) 
                b = width - b;
            if(y+j < 0 || y+j >= width) 
                a = height - a;

            return (lights[`${a},${b}`] === 1)
        }
        return neighs(x,y,condition4);
    }
    changingNeighbours(neighbours4);
}


=======
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



>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
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

<<<<<<< HEAD
//changing the type of board
const type = document.querySelector('#type');
type.addEventListener('input', changetype);

=======
const type = document.querySelector('#type');

type.addEventListener('input', changetype);


>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
let currentgame = conway1;
let games = [conway1,conway2,conway3,conway4];

function changetype(){
    currentgame = games[type.value];
<<<<<<< HEAD
}


//changing speed
const speed = document.querySelector('#speed');
speed.addEventListener('input',changeSpeed);

let currentSpeed = 2500/speed.value;
=======
    console.log(0);
}

const speed = document.querySelector('#speed');
speed.addEventListener('input',changeSpeed);

let currentSpeed = 500;

>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
function changeSpeed() {
    currentSpeed = 2500/speed.value;
}

<<<<<<< HEAD
//looping the game
=======
>>>>>>> 4d20eaa4a9e72c1cbf3fa40d1d34c4850432046a
function gameoflife() {
    if(gameOn) {
        currentgame();
        setTimeout(() => { requestAnimationFrame(gameoflife); }, currentSpeed);
    }
}




