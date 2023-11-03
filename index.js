const boxElement = document.querySelectorAll(".box")
var winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

var xAttempts = [];
var oAttempts = [];
var clicks = 0;
var wonTheGame = 0;
const message = document.getElementById("message");
const gameResult = document.getElementById("result");
const restart = document.getElementById("button");

//onclick function
boxElement.forEach( box => {
    box.onclick = handleClick;
})

//handleclick function
function handleClick(e){

    const i = e.target.getAttribute('id');
    const text = document.createElement('p');
    text.setAttribute ('id', 'text');

    
    boxElement[i-1].appendChild(text);

    if(clicks % 2 == 0 ){
        xAttempts.push(parseInt(i-1));
        text.innerHTML = "X";
        text.style.color = "#FAB201";
        result(winningCombinations,xAttempts,"X");
    }

    else{
        oAttempts.push(parseInt(i-1));
        text.innerHTML = "O";
        text.style.color = "#FAB201";
        result(winningCombinations,oAttempts,"O");
    }

    clicks++;
    if(clicks == 9 && wonTheGame == 0){
        result.style.visibility ="visible";
        message.innerHTML = "It is a tie 🫱🏻‍🫲🏻"
    }
}

//result function
function result(winningCombinations, attempts, player){
    let flag = 0;
    let checker = [];

    
    for(var i=0; i<winningCombinations.length; i++){

        if(Array.isArray(winningCombinations[i])){
            result(winningCombinations[i], attempts, player);
        }

        else{
            if(attempts.includes(winningCombinations[i])){
                checker.push(true);
                flag++;
            }
            else{
                checker.push(false);
            }
        }
    }
    if(checker.every(check => check === true) && flag > 2){
        gameResult.style.visibility = "visible";
        message.innerHTML = "'" + player + "'" + "won the game";
        wonTheGame = 1;
    }
}

restart.onclick = () => {
    history.go(0);
}
