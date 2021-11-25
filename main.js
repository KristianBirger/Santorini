let htmlTable = document.getElementById("SantoTable");

let p1a = {
    
    };

let p1b = {
       
};

let playerposArr = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]; 
// Må ha to, enten må kun playeren stå i arrayen eller hva nivå bygningen er på 
let mapArr = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
];

let deploymentphase = true; 
let deployCount = 0;

let isItPlayer1Turn = true;

let currentCell;

function switchTurns(){
    isItPlayer1Turn = !isItPlayer1Turn;
};

const tbody = document.querySelector('#SantoTable tbody');
tbody.addEventListener('click', function (e){
  const cell = e.target.closest('td');
  currentCell = cell;
  
  if (!cell) {
    return;
    }

    if(deploymentphase && isItPlayer1Turn && cell.innerHTML === "" && deployCount < 2){

        const placeHolderPlayer1 = `P1-${deployCount}`;
        console.log("Player 1 turn");

        updateArr(cell.id, placeHolderPlayer1);
        updatePlayingBoard(placeHolderPlayer1);

        deployCount ++;
        if (deployCount === 2){
            switchTurns();
            deployCount = 0;
        }
        
    }

    if(deploymentphase && !isItPlayer1Turn && cell.innerHTML === "" && deployCount < 2){
      

        const placeHolderPlayer2 = `P2-${deployCount}`;
        console.log("Player 1 turn");

        updateArr(cell.id, placeHolderPlayer2);
        updatePlayingBoard(placeHolderPlayer2);

        deployCount ++
        
        if (deployCount === 2){
            switchTurns();
            console.log("Deployment phase over")
            deploymentphase = false;
        }
    }

    if (isItPlayer1Turn && cell.innerHTML === ""){
        const placeHolderPlayer1 = "P1a";
        console.log("Player 1 turn");

        updateArr(cell.id, placeHolderPlayer1);
        updatePlayingBoard(placeHolderPlayer1);

        switchTurns();
        
    }
    else if(!isItPlayer1Turn && cell.innerHTML === ""){
        const placeHolderPlayer2 = "P2a";
        console.log("Player 2 turn");

        updateArr(cell.id, placeHolderPlayer2);
        updatePlayingBoard(placeHolderPlayer2);

        switchTurns();
    }
});

function updateArr (cellId, cellText){

    playerposArr[0][cellId] = cellText;
    console.log(playerposArr);

}

function updatePlayingBoard(cellText){

    currentCell.innerHTML = cellText;

}