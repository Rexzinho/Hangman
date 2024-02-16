const container = document.querySelector(".container");
const keyboardDisplay = document.querySelector(".keyboardDisplay");
const wordDisplay = document.getElementById("wordDisplay");
const selectCategory = document.getElementById("selectCategory");
const categoryDisplay = document.getElementById("categoryDisplay");
const manDisplay = document.getElementById("manDisplay");
const gameStatus = document.getElementById("gameStatus");
const correctWord = document.getElementById("correctWord");

const fruits = ["strawberry", "apple", "pineapple", "watermelon", "coconut", "banana"];
const objects = ["rocket", "keyboard", "clothes", "ventilator", "newspaper", "scissors"];
const animals = ["elephant", "capybara", "penguin", "turtle", "kangaroo", "rhinoceros"];
const characters = ["mordecai", "fives", "benson", "skips", "rigby", "pops"];

const stages = ['🤡', '😡', '😨', '😵', '🙂', '😎'];

let word = "";
let hidedWord = "";
let latestWord = "";
let lives = 5;
let isNotRunning = false;

let category = "";

let keyboard = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                    ["Z", "X", "C", "V", "B", "N", "M"]];

function createKeyboard(){

    for(let i=0; i<keyboard.length; i++){

        for(let j=0; j<keyboard[i].length; j++){

            const newKey = document.createElement("button");
            newKey.classList = "keyDisplay enabled";
            newKey.textContent = keyboard[i][j];
            newKey.value = keyboard[i][j];
            newKey.id = keyboard[i][j];
            keyboardDisplay.appendChild(newKey);
        }
        const newP = document.createElement("p");
        keyboardDisplay.appendChild(newP);
    }
}

keyboardDisplay.addEventListener("click", (event) => {

    if(isNotRunning){
        return;
    }

    if(event.target.classList.value == "keyDisplay enabled"){

        putLetter(event.target.value);
    }
});

function putLetter(letter){

    const key = document.getElementById(letter);
    letter = letter.toLowerCase();

    if(word.indexOf(letter) >= 0){
        
        key.classList.add("correct");

        for(let i=0; i<word.length; i++){

            if(word[i] == letter){
                
                hidedWord = hidedWord.slice(0, i) + letter + hidedWord.slice(i+1, word.length);
            }
        }

        wordDisplay.style.scale = "0.9";

        setTimeout(() => {
            
            wordDisplay.style.scale = "1";

            wordDisplay.textContent = hidedWord;

            if(category == characters){
                wordDisplay.textContent = 
                wordDisplay.textContent.charAt(0).toUpperCase() + wordDisplay.textContent.slice(1);
            }
            

        }, 300);

        if(hidedWord == word){

            isNotRunning = true;

            container.style.scale = "0.95";
            setTimeout(() => container.style.scale = "1", 300);

            gameStatus.style.color = "rgb(118, 161, 32)";
            gameStatus.textContent = "CORRECT";
            gameStatus.style.display = "block";
        }

    }

    else{
        key.classList = "keyDisplay disabled";
        lives--;
        manDisplay.style.scale = "0.9";

        setTimeout(() => {
            manDisplay.textContent = stages[lives];
            manDisplay.style.scale = "1";
        }, 200);
        
        if(lives == 0){
            isNotRunning = true;

            container.style.scale = "0.95";
            setTimeout(() => container.style.scale = "1", 300);

            gameStatus.style.color = "rgb(230, 43, 30)";
            gameStatus.textContent = "GAME OVER";
            gameStatus.style.display = "block";

            correctWord.textContent = "corect word: " + word;
            correctWord.style.display = "block";
        }

    }

    
}

function refresh(){

    lives = 5;
    isNotRunning = false;

    gameStatus.style.color = "black";
    gameStatus.textContent = "";
    gameStatus.style.display = "none";

    manDisplay.style.scale = "0.9";

    setTimeout(() => {
        manDisplay.textContent = stages[lives];
        manDisplay.style.scale = "1";
    }, 200);

    correctWord.textContent = "";
    correctWord.style.display = "none";

    for(let i=0; i<keyboard.length; i++){

        for(let j=0; j<keyboard[i].length; j++){

            const key = document.getElementById(keyboard[i][j]);
            key.classList = "keyDisplay enabled";
        }
    }

    switch(selectCategory.value){

        case "fruits":
            category = fruits;
            categoryDisplay.textContent = selectCategory[0].textContent;
            break;
        case "objects":
            category = objects;
            categoryDisplay.textContent = selectCategory[1].textContent;
            break;
        case "animals":
            category = animals;
            categoryDisplay.textContent = selectCategory[2].textContent;
            break;
        case "characters":
            category = characters;
            categoryDisplay.textContent = selectCategory[3].textContent;
            break;
    }
    
    do{
        let randNum = Math.floor(Math.random() * category.length);
        word = category[randNum];
    }while(word == latestWord);
    
    latestWord = word;

    console.log(word);

    hidedWord = "_";

    for(let i=0; i<word.length; i++){
        
        hidedWord += "_";
    }

    wordDisplay.textContent = hidedWord;
}

function setGame(){
    createKeyboard();
    refresh();
}

setGame();

