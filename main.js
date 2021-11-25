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

let isItPlayer1Turn = true;

let isPawnSelected = false;

let currentCell;
let lastCell;

let selectedPawn; 

function switchTurns(){
    isItPlayer1Turn = !isItPlayer1Turn;
};

let deployCount = 0;

const tbody = document.querySelector('#SantoTable tbody');
tbody.addEventListener('click', function (e){
  const cell = e.target.closest('td');
  currentCell = cell;
  
  if (!cell) {
    return;
    }
    //Player 1 deploy
    if(deploymentphase && isItPlayer1Turn && cell.innerHTML === "" && deployCount < 2){

        deployPlayers(cell.id);
    }

    if(deploymentphase && !isItPlayer1Turn && cell.innerHTML === "" && deployCount < 2){

        deployPlayers(cell.id);

    }

    if (isItPlayer1Turn && !deploymentphase){
        
        selectedPawn = cell.innerHTML;
        selectPawns(selectedPawn);
       // findPlayerPosInArr(selected, cell.id);
        //switchTurns();
        
    }
    if(!isItPlayer1Turn && !deploymentphase){
        
        selectedPawn = cell.innerHTML;
        
        findPlayerPosInArr(selected, cell.id);
        
        switchTurns();
    }

    if(isPawnSelected && cell.innerHTML === ""){
        lastCell = currentCell;
        console.log(lastCell);
        currentCell = cell;
        console.log(currentCell);
       // console.log(selectedPawn);
        updatePlayingBoard(selectedPawn);

    }
    
});

function findPlayerPosInArr(selected, cellId){
    if(isItPlayer1Turn){
      
let column = playerposArr[Math.floor(cellId / 5)].indexOf(selected);
let row = Math.floor(cellId / 5);

console.log(playerposArr[row][column]);

    }
}

function deployPlayers(cellid){

    let placeHolderPlayer; 

    if(isItPlayer1Turn){
    placeHolderPlayer = `P1-${deployCount}`;
    console.log("Player 1 turn");

    deployCount ++;
    if (deployCount === 2){
        switchTurns();
        deployCount = 0;
    }
}
    else{
        placeHolderPlayer = `P2-${deployCount}`;
        console.log("Player 2 turn");

        deployCount ++
        
        if (deployCount === 2){
            switchTurns();
            console.log("Deployment phase over")
            deploymentphase = false;
        }
    }

    updateArr(cellid, placeHolderPlayer);
    updatePlayingBoard(placeHolderPlayer);
}

function selectPawns(selectedPawn){

console.log("The selected pawn is" + selectedPawn);

isPawnSelected = true;

}

function movePawn(cellText){

updatePlayingBoard(cellText);

}


function updateArr (cellId, cellText){

    if (cellId < 5) {
  
        playerposArr[0][cellId] = cellText;
        console.log(playerposArr);
      
      
    }
    else if (cellId > 4 && cellId < 10) {
      
      cellId = cellId % 5;
    
      playerposArr[1][cellId] = cellText;
      
      console.log(playerposArr);
    }
    else if (cellId > 9 && cellId < 15) {
      
        cellId = cellId % 5;
      
        playerposArr[2][cellId] = cellText;
        
        console.log(playerposArr);
    
    }
    else if (cellId > 14 && cellId < 20) {
      
        cellId = cellId % 5;
      
        playerposArr[3][cellId] = cellText;
        
        console.log(playerposArr);
    
    }
    else if (cellId > 13 && cellId < 25) {
      
        cellId = cellId % 5;
      
        playerposArr[4][cellId] = cellText;
        
        console.log(playerposArr);
    
    }
    
}
    

function updatePlayingBoard(cellText){

    if(deploymentphase){
        currentCell.innerHTML = cellText;    
    }
    else{
    
    currentCell.innerHTML = cellText;
 //   lastCell.innerHTML = "";
    }
}