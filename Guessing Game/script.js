const submitBtn = document.getElementById("submitBtn");
const actualNumber = Math.floor((Math.random() * 100) + 1);
const game = document.getElementById("game");
const remaining = document.getElementById("remaining");
const prevguess = document.getElementById("prevguess");

let prevGuessList = [];

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let value = document.getElementById("number").value;
    chances -= 1;
    if(actualNumber == value){
        document.getElementById("result").innerHTML = "Wow, Congratulation You won the game.";
    }
    else if(chances <= 0){
        document.getElementById("result").innerHTML = `You Lose!<br/>Better Luck Next Time.`
    }
    else{
        prevGuessList.push(value);
        prevguess.innerHTML = prevGuessList;
        remaining.innerHTML = parseInt(remaining.innerHTML) - 1 ;
    }
});
