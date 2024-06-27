
// Getting elements from the DOM
let para_tobe_type = document.querySelector(".display_text");
let viewBoard = document.querySelector(".view_board");
let duration = document.getElementById("time_left");
let error = document.getElementById("error");
let wmp = document.getElementById("wpm");
let accuracy = document.getElementById("accuracy");
let cmp = document.getElementById("cpm");
let startButton = document.getElementById("start_Game");

// setting Global variable


let time = 60;

function CountDown(){
    duration.textContent =time + "s";
    if (time > 0){
    time--;
    setTimeout(CountDown, 1000);
}else{
    duration.textContent = 'Time\'s up!';
    alert("game over")
    duration.textContent = "";
    viewBoard.textContent= "";
    para_tobe_type.textContent="";
    clearTimeout(CountDown)
}


}


let keys = [];
let allError=[];
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
        viewBoard.innerHTML="";
        
      ;
      });
      CountDown()
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
    }else if(!matchKeys){
        let el = document.createElement("span");
        el.classList.add("wrong");
        el.textContent = keys[lengthOfKeyPress - 1];
        viewBoard.appendChild(el);
          //Pushing all the error to the error  array;
        allError.push(el.textContent)
        // Updating the UI with the user Error
        error.textContent=allError.length;
        
    }
    else {
        let el = document.createElement("span");
        el.classList.add("wrong");
        el.textContent = keys[lengthOfKeyPress - 1];
        viewBoard.appendChild(el);
        
      
    }
}
