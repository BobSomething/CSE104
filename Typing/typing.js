"use strict";

//https://random-word-form.herokuapp.com
//https://random-word-api.herokuapp.com

const numWords = document.querySelector('#numwords');
numWords.addEventListener('input',changeNum);

const addDisplay = document.querySelector('#display');

const start = document.querySelector('#start');
start.addEventListener('click',changeDisplay);

let listWords = [];

const type = document.querySelector('#type');
type.addEventListener('select',changeType);

let currentType = 0;

let types = [0, 'noun', 'adjective', 'animal'];

function changeType() {
    currentType = type.value;
}

function changeNum() {
    if(currentType === 0) {
        fetch(`https://random-word-api.herokuapp.com/word?number=${numWords.value}`)
            .then(response => response.json())
            .then(data => {listWords = data})
    }
    else {
        fetch(`https://random-word-form.herokuapp.com/random/${types[currentType]}/a?count=${numWords.value}`)
            .then(response => response.json())
            .then(data => {listWords = data})
    }
}


changeNum();

function changeDisplay() {
    changeNum();

    addDisplay.innerHTML = '';

    /*const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    addDisplay.appendChild(cursor);*/

    for(const str of listWords) {
        const word = document.createElement('div');
        word.classList.add('word');
        addDisplay.appendChild(word);

        if(listWords.indexOf(str) == 0)
            word.classList.add('active');

        for(const char of str) {
            const letter = document.createElement('div');
            letter.classList.add('letter');
            letter.innerHTML = char;
            word.appendChild(letter);
        }
    }
}

document.addEventListener('keydown', changeText);

let lastWord;
let indexWord=-1;
let indexCorrect = -1;

function changeText(event) {
    const activeWord = document.querySelector('.active');
    const allWords = document.querySelectorAll('.word');
    const words = document.querySelectorAll('.active div.letter');

    if((event.which < 65 || event.which > 90) && event.which != 8 && event.which != 32) {
        return;
    } //if the character is not in the alphabet or is not Backspace or Space - we ignore it

    let w = words[indexWord];


    
    if(event.which === 8) { //Backspace
        console.log(words[indexWord].classList.value);
        if(words[indexWord].classList.value === 'letter incorrect new') {
            console.log(1);
            w.remove();
            indexWord--;


            return;
        }
        else {
            w.classList.remove('incorrect');
            w.classList.remove('correct');
            indexWord--;

            if(indexWord < 0) {
                let index = 0;
                for(const t of allWords) {
                    if(t === activeWord) {
                        break;
                    }
                    index++;
                }
                allWords[index-1].classList.add('active');
                activeWord.classList.remove('active');
                const temp = document.querySelectorAll('.active div.letter');
                indexWord = temp.length;
            }


            return;
        }
    }

    let next_word = 0;
    indexWord++;
    w = words[indexWord];

    if(w != undefined) {
        if(event.key === w.innerHTML) {
            w.classList.remove('incorrect');
            w.classList.add('correct');
            next_word = 1
            if(indexWord-1 === indexCorrect) {
                indexCorrect++;
            }
        }
        else {
            w.classList.add('incorrect');
            next_word = 1
        }
        /*
        const cursor = document.querySelector('.cursor');
        cursor.remove();
        const cursorNew = document.createElement('div');
        cursorNew.classList.add('cursor');

        console.log(w.offsetWidth);
        w.style.width = `${w.offsetWidth + 0.7}px`;

        w.appendChild(cursorNew);*/
    }

    
    if(next_word === 0) {
        if(event.which != 32) { //spacebar
            const newBadLetter = document.createElement('div');
            newBadLetter.classList.add('letter');
            newBadLetter.classList.add('incorrect');
            newBadLetter.classList.add('new');
            newBadLetter.innerHTML = event.key;
            activeWord.appendChild(newBadLetter);
            return;
        }

        let index = 0;
        for(const w of allWords) {
            if(w === activeWord) {
                break;
            }
            index++;
        }
        allWords[index+1].classList.add('active');
        activeWord.classList.remove('active');
        indexWord = -1;
    }
}



