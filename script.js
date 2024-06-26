
// Getting elements from the DOM
let para_tobe_type = document.getElementById("paragraph");
let duration = document.getElementById("time_left");
let error = document.getElementById("error");
let wmp = document.getElementById("wpm");
let accuracy = document.getElementById("accuracy");
let cmp = document.getElementById("cpm");
let startButton = document.getElementById("start_Game");

let para;
let keys = [];
let globalParagraph = '';

// Event listener for the start button to fetch and display a random paragraph
startButton.addEventListener("click", () => {
    fetch('text.json')
      .then(response => response.json())
      .then(data => {
        let paragraphs = data.paragraphs;
        let randomNumber = Math.floor(Math.random() * paragraphs.length);
        // Displaying the random paragraph to be typed in the text area
        para_tobe_type.textContent = paragraphs[randomNumber];
        globalParagraph = paragraphs[randomNumber];
        keys = []; // Reset keys array for a new paragraph
      });
});

// Keyboard event listener to capture user input
document.addEventListener("keyup", (e) => {
    let key = e.key;
    if (key.length === 1 && key.match(/^[a-zA-Z!"',-.:;? ]$/)) {
        keys.push(key);
        validateKeyPress();
    } else {
        console.log("Error: Invalid key pressed.");
    }
})

// Function to validate user key press against the global paragraph
function validateKeyPress() {
    let lengthOfKeyPress = keys.length;
    let matchKeys = globalParagraph[lengthOfKeyPress - 1] === keys[lengthOfKeyPress - 1];
    
    if (matchKeys) {
        let el = document.createElement("span");
        el.classList.add("correct");
        el.textContent = keys[lengthOfKeyPress - 1];
        para_tobe_type.appendChild(el);
    } else {
        let el = document.createElement("span");
        el.classList.add("wrong");
        el.textContent = keys[lengthOfKeyPress - 1];
        para_tobe_type.appendChild(el);
    }
}
