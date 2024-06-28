
// // Getting elements from the DOM
// let para_tobe_type = document.querySelector(".display_text");
// let viewBoard = document.querySelector(".view_board");
// let duration = document.getElementById("time_left");
// let error = document.getElementById("error");
// let wmp = document.getElementById("wpm");
// let accuracy = document.getElementById("accuracy");
// let cmp = document.getElementById("cpm");
// let startButton = document.getElementById("start_Game");

// // setting Global variable


// let time = 60;

// function CountDown(){
//     duration.textContent =time + "s";
//     if (time > 0){
//     time--;
//     setTimeout(CountDown, 1000);
// }else{
//     duration.textContent = 'Time\'s up!';
//     alert("game over")
//     duration.textContent = "";
//     viewBoard.textContent= "";
//     para_tobe_type.textContent="";
//     clearTimeout(CountDown)
// }


// }


// let keys = [];
// let allError=[];
// let globalParagraph = '';

// // Event listener for the start button to fetch and display a random paragraph
// startButton.addEventListener("mouseenter", () => {
//     fetch('text.json')
//       .then(response => response.json())
//       .then(data => {
//         let paragraphs = data.paragraphs;
//         let randomNumber = Math.floor(Math.random() * paragraphs.length);
//         // Displaying the random paragraph to be typed in the text area
//         para_tobe_type.textContent = paragraphs[randomNumber];
//         globalParagraph = paragraphs[randomNumber];
//         keys = []; // Reset keys array for a new paragraph
//         viewBoard.innerHTML="";
        
//       ;
//       });
//       CountDown()
// });

// // Keyboard event listener to capture user input
// document.addEventListener("keyup", (e) => {
//     let key = e.key;
//     if (key.length === 1 && key.match(/^[a-zA-Z!"',-.:;? ]$/)) {
//         keys.push(key);
//         wpm()
//         validateKeyPress();
//     } else {
//         console.log("Error: Invalid key pressed.");
//     }
   
// });

// // Function to validate user key press against the global paragraph
// function validateKeyPress() {
//     let lengthOfKeyPress = keys.length;
//     let matchKeys = globalParagraph[lengthOfKeyPress - 1] === keys[lengthOfKeyPress - 1];
    
//     if (matchKeys) {
//         let el = document.createElement("span");
//         el.classList.add("correct");
//         el.textContent = keys[lengthOfKeyPress - 1];
//         viewBoard.appendChild(el);
//     }else if(!matchKeys){
//         let el = document.createElement("span");
//         el.classList.add("wrong");
//         el.textContent = keys[lengthOfKeyPress - 1];
//         viewBoard.appendChild(el);
//           //Pushing all the error to the error  array;
//         allError.push(el.textContent)
//         // Updating the UI with the user Error
//         error.textContent=allError.length;
        
//     }
//     else {
//         let el = document.createElement("span");
//         el.classList.add("wrong");
//         el.textContent = keys[lengthOfKeyPress - 1];
//         viewBoard.appendChild(el);
        
      
//     }
// }

// // Cheecking words per menuit
// function wpm(){
//     let totalWpm=keys.length / time;
//     wmp.textContent =Math.floor(totalWpm)
// }


// Getting elements from the DOM
let para_tobe_type = document.querySelector(".display_text");
let viewBoard = document.querySelector(".view_board");
let duration = document.getElementById("time_left");
let error = document.getElementById("error");
let wpmDisplay = document.getElementById("wpm");
let accuracy = document.getElementById("accuracy");
let cpm = document.getElementById("cpm");
let startButton = document.getElementById("start_Game");

// Setting global variables
let time = 60;
let timer;
let keys = [];
let allError = [];
let globalParagraph = '';
let startTime;
let wordCount = 0;

// Countdown function
function countDown() {
    duration.textContent = time + "s";
    if (time > 0) {
        time--;
        timer = setTimeout(countDown, 1000);
    } else {
        duration.textContent = 'Time\'s up!';
        alert("Game over");
        clearTimeout(timer);
        displayResults();
    }
}

// Function to display results at the end of the game
function displayResults() {
    duration.textContent = "";
    viewBoard.textContent = "";
    para_tobe_type.textContent = "";
    calculateWPM();
    calculateAccuracy();
    calculateCpm();
}

// Event listener for the start button to fetch and display a random paragraph
startButton.addEventListener("mouseenter", () => {
    
    fetch('text.json')
      .then(response => response.json())
      .then(data => {
        let paragraphs = data.paragraphs;
        let randomNumber = Math.floor(Math.random() * paragraphs.length);
        // Displaying the random paragraph to be typed in the text area
        para_tobe_type.textContent = paragraphs[randomNumber];
        globalParagraph = paragraphs[randomNumber];
        keys = []; // Reset keys array for a new paragraph
        viewBoard.innerHTML = "";
        time = 60;
        startTime = Date.now();
        countDown();
      });
});

// Keyboard event listener to capture user input
document.addEventListener("keyup", (e) => {
    let key = e.key;
    if (key.length === 1 && key.match(/^[a-zA-Z!"',-.:;? ]$/)) {
        keys.push(key);
        validateKeyPress();
        calculateWPM();
       
    } else {
        console.log("Error: Invalid key pressed.");
    }
});

// Function to validate user key press against the global paragraph
function validateKeyPress() {
    let lengthOfKeyPress = keys.length;
    let matchKeys = globalParagraph[lengthOfKeyPress - 1] === keys[lengthOfKeyPress - 1];
    
    if (matchKeys) {
        let el = document.createElement("span");
        el.classList.add("correct");
        el.textContent = keys[lengthOfKeyPress - 1];
        viewBoard.appendChild(el);

        if (keys[lengthOfKeyPress - 1] === ' ') {
            wordCount++;
        }
    } else {
        let el = document.createElement("span");
        el.classList.add("wrong");
        el.textContent = keys[lengthOfKeyPress - 1];
        viewBoard.appendChild(el);
        allError.push(el.textContent);
        error.textContent = allError.length;
    }
}

// Function to calculate words per minute
function calculateWPM() {
    let elapsedTime = (Date.now() - startTime) / 1000 / 60; // time in minutes
    let wordsTyped = keys.join('').split(' ').length;
    let totalWpm = Math.floor(wordsTyped / elapsedTime);
    wpmDisplay.textContent = totalWpm;
}

// Function to calculate accuracy
function calculateAccuracy() {
    let correctChars = keys.length - allError.length;
    let accuracyPercentage = (correctChars / keys.length) * 100;
    accuracy.textContent = accuracyPercentage.toFixed(2) + "%";
}

function calculateCpm(){
     
    cpm.textContent = keys.length;
}
