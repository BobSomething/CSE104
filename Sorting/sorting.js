"use strict";

let N = 10;

const displayContent = document.querySelector('#displaying');


function randint(max) {
    return Math.floor(Math.random() * max);
}

//Shuffling the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let blocks = [];
let getBlocks = {};

//setting up the display
async function settingUp() {
    displayContent.innerHTML = '';
    blocks = [];
    for(let i=1; i<=N; i++) {blocks.push(i);}
    shuffleArray(blocks);
    for(const h of blocks) {
        const column = document.createElement('div');
        column.classList.add('block');
        column.style.height = `${20 + (h-1)*5}px`;
        column.textContent = `${h}`;
        getBlocks[h] = column;
        displayContent.appendChild(column);
    }
    //if N is too big, we remove the label
    if(N > 50) {
        for(const b in getBlocks) {
            let blocky = getBlocks[b];
            blocky.textContent = '.';
            blocky.style.width = `${Math.floor((innerWidth-N*6)/(N))}px`;
        }
    }
}
settingUp();


//randomize the display
const clickRandom = document.querySelector('#random');
clickRandom.addEventListener('click',clickedRandom);
function clickedRandom() {
    settingUp();
}

//change the number of columns
const Number = document.querySelector('#number');
Number.addEventListener('input',changeN);

function changeN() {
    N = Number.value;
    settingUp();
}

//stop button
const Stop = document.querySelector('#stop');
Stop.addEventListener('click',stopSorting);

let sorting = true;
function stopSorting() {
    sorting = false;
}

//start button
const Start = document.querySelector('#start');
Start.addEventListener('click',startSorting);

function startSorting() {
    sorting = true;
    currentAlgo();
}

//change speed
const speed = document.querySelector('#speed');
speed.addEventListener('input',changeSpeed);

let currentSpeed = 5;

function changeSpeed() {
    currentSpeed = 10 - speed.value;
}

//choose the algorithm
const choosingAlgo = document.querySelector('select');
choosingAlgo.addEventListener('input',changeAlgo);

let currentAlgo = bubbleSort;

function changeAlgo() {
    let changeDescription = document.querySelector(`#about div[id="${parseInt(algos.indexOf(currentAlgo))}"]`);
    changeDescription.style.display = 'none';

    currentAlgo = algos[choosingAlgo.value];

    changeDescription = document.querySelector(`#about div[id="${parseInt(algos.indexOf(currentAlgo))}"]`);
    changeDescription.style.display = 'block';

}

//all algorithms
let algos = [bubbleSort,selectionSort,mergeSort,quickSort,cocktailSort,shellSort,pancakeSort,gnomeSort,brickSort,combSort,
    stoogeSort,bogoSort];

//if more than 50 columns
function more50(x,v) {
    if(N <= 50)
        x.textContent = `${v}`;
}

//sleep function, cause there is not built-in sleep function in JavaScript :(
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//swap function - swaps blocks[i] and blocks[j]
async function swap(i, j) {
    let temp = blocks[i];
    blocks[i] = blocks[j];
    blocks[j] = temp;

    getBlocks[blocks[i]].style.height = `${20+(blocks[j]-1)*5}px`;
    more50(getBlocks[blocks[i]], blocks[j]);
    //getBlocks[blocks[i]].textContent = `${blocks[j]}`;

    getBlocks[blocks[j]].style.height = `${20+(blocks[i]-1)*5}px`;
    more50(getBlocks[blocks[j]], blocks[i]);
    //getBlocks[blocks[j]].textContent = `${blocks[i]}`;

    let tempb = getBlocks[blocks[i]];
    getBlocks[blocks[i]] = getBlocks[blocks[j]];
    getBlocks[blocks[j]] = tempb;
}


//Implementation of the sorting algorithms
//https://www.geeksforgeeks.org/sorting-algorithms

async function markBlocks(a,b) {
    getBlocks[a].style.backgroundColor = 'red';
    getBlocks[b].style.backgroundColor = 'red';

    await sleep(currentSpeed);

    getBlocks[a].style.backgroundColor = 'lightcyan';
    getBlocks[b].style.backgroundColor = 'lightcyan';
}



//bubbleSort
async function bubbleSort() {
    for(let i=0; i<N; i++) {
        if(!sorting)
            return;

        let condition = true;
        for(let j=0; j<N-i-1; j++) {
            await markBlocks(blocks[j],blocks[j+1]);

            if(blocks[j] > blocks[j+1]) {
                swap(j,j+1);
                condition = false;
            }
        }
        if(condition) break;
    }
}



//selectionSort
async function selectionSort() {
    for(let i=0; i<N; i++) {
        if(!sorting)
            return

        let minI = i;
        for(let j=i+1; j<N; j++) {
            await markBlocks(blocks[minI],blocks[j]);

            if(blocks[j] < blocks[minI])
                minI = j;
        }
        swap(minI,i);
    }
}




//mergeSort
async function merge(l,m,r) {
    let p = m - l + 1;
    let q = r - m;

    let left = [];
    let right = [];

    for(let i=l; i<=r; i++)
        getBlocks[blocks[i]].style.background = 'red';

    await sleep(currentSpeed);

    for(let i=0; i<p; i++)
        left[i] = blocks[l+i];
    for(let i=0; i<q; i++)
        right[i] = blocks[m+1+i];

    let i = 0;
    let j = 0;
    let k = l;

    while(i < p && j < q) {
        if(left[i] <= right[j]) {
            let id = blocks.indexOf(left[i]);
            swap(k,id);
            blocks[k] = left[i];
            i++;
        }
        else {
            let id = blocks.indexOf(right[j]);
            swap(k,id);
            blocks[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < p) {
        let id = blocks.indexOf(left[i]);
        swap(k,id);
        blocks[k] = left[i];
        i++;
        k++;
    }

    while (j < q) {
        let id = blocks.indexOf(right[j]);
        swap(k,id);
        blocks[k] = right[j];
        j++;
        k++;
    }

    for(let i=l; i<=r; i++)
        getBlocks[blocks[i]].style.background = 'lightcyan';

}

async function mergeSort(l = 0, r = N-1) {
    if(!sorting)
        return;

    if(l >= r) return;
    
    let m = l + Math.floor((r-l)/2);

    await mergeSort(l,m);

    await sleep(currentSpeed);

    await mergeSort(m+1,r);

    await sleep(currentSpeed);

    await merge(l,m,r);
}



//quickSort
async function partition(l, h) {
    let pivot = blocks[h];
    let i = l - 1;
  
    for (let j = l; j <= h - 1; j++) {
        await markBlocks(pivot,blocks[j]);

        if (blocks[j] < pivot) {
            i++;
            swap(i,j);
        }
    }
  
    swap(i+1,h);
    return i+1;
}

async function quickSort(l=0, h=N-1) {
    if(!sorting)
        return;

    if (l < h) {
        let pi = await partition(l, h);
        await quickSort(l, pi - 1);
        await quickSort(pi + 1, h);
    }
}




//cocktailSort
async function cocktailSort() {
    let swapped = true;
    let start = 0;
    let end = N;
  
    while (swapped == true) {
        if(!sorting)
            return;

        swapped = false;
        
        for (let i = start; i < end - 1; ++i) {
            await markBlocks(blocks[i],blocks[i+1]);

            if (blocks[i] > blocks[i + 1]) {
                swap(i,i+1);
                swapped = true;
            }
        }

        if (swapped == false)
            break;
        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            await markBlocks(blocks[j],blocks[i+1]);

            if (blocks[i] > blocks[i + 1]) {
                swap(i,i+1);
                swapped = true;
            }
        }

        start++;
    }
}



//shellSort
async function shellSort() {
    for (let gap = Math.floor(N/2); gap > 0; gap = Math.floor(gap/2)) {
        if(!sorting)
            return;

        for (let i = gap; i < N; i += 1) {
            let temp = blocks[i];
            let j;
            for (j = i; j >= gap && blocks[j - gap] > temp; j -= gap) {
                await markBlocks(blocks[j],blocks[j-gap]);

                swap(j,j-gap);
            }
        }
    }
}




//pancakeSort
async function flip(i)
{
    let start = 0;
    while (start < i) {
        if(!sorting)
            return;

        await markBlocks(blocks[i],blocks[start]);

        swap(start,i);
        start++;
        i--;
    }
}

async function findMax(n)
{
    let mi, i;
    for (mi = 0, i = 0; i < n; ++i)
        if (blocks[i] > blocks[mi])
            mi = i;
    return mi;
}

async function pancakeSort()
{
    for (let curr_size = N; curr_size > 1; --curr_size) {
        if(!sorting)
            return;

        let mi = await findMax(curr_size);

        if (mi != curr_size - 1) {
            await flip(mi);
            await flip(curr_size - 1);
        }
    }
}



//gnomeSort
async function gnomeSort() { 
    let i = 0; 

    while (i < N) { 
        if(!sorting)
            return;

        if (i == 0) 
            i++;

        await markBlocks(blocks[i],blocks[i-1]);

        if (blocks[i] >= blocks[i-1]) 
            i++; 
        else {
            swap(i,i-1); 
            i--;
        } 
    } 
} 



//brickSort
async function brickSort() {
    let isSorted = false; 
         
    while (!isSorted) {
        isSorted = true;
        for (let i=1; i<=N-2; i=i+2) {
            if(!sorting)
                return;

            await markBlocks(blocks[i],blocks[i+1]);

            if (blocks[i] > blocks[i+1]) {
                swap(i,i+1);
                isSorted = false;
            }
        }

        for (let i=0; i<=N-2; i=i+2) {
            if(!sorting)
                return;

            await markBlocks(blocks[i],blocks[i+1]);

            if (blocks[i] > blocks[i+1]) {
                swap(i,i+1);
                isSorted = false;
            }
        }
    }
}



//stoogeSort
async function stoogeSort(l=0, h=N-1) { 
    if(!sorting)
        return;

    if (l >= h) 
         return; 
    
    await markBlocks(blocks[l],blocks[h]);

    if (blocks[l] > blocks[h])
        swap(l,h); 

    if (h - l + 1 > 2) { 
        let t = Math.floor((h - l + 1) / 3); 

        await stoogeSort(l, h - t);
        await stoogeSort(l + t, h); 
        await stoogeSort(l, h - t); 
    } 
} 



//combSort
async function getNextGap(gap) {
    gap = Math.floor((gap*10)/13);
     if (gap < 1)
        return 1;
    return gap;
}

async function combSort() {
    let gap = N;
    
    let swapped = true;
  
    while (gap != 1 || swapped == true) {
        if(!sorting)
            return;

        gap = await getNextGap(gap);
        swapped = false;

        for (let i=0; i<N-gap; i++) {
            await markBlocks(blocks[i],blocks[i+gap]);

            if (blocks[i] > blocks[i+gap]) {
                swap(i,i+gap);
                swapped = true;
            }
        }
    }
}



//bogoSort
function isSorted() {
    for(let i=0; i<N-1; i++)
        if(blocks[i] > blocks[i+1])
            return false;
    return true;
}

async function bogoSort() {
    while(!isSorted()) {
        if(!sorting)
            return;
        console.log(blocks);
        await sleep(5);
        await settingUp();
    }
}



