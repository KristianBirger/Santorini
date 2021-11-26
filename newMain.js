let htmlTable = document.getElementById("SantoTable");
let infoText = document.getElementById("infoText");

let p1a = {
    poscol:0,
    posrow:0
    };

let p1b = {
    poscol:0,
    posrow:0
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
let previousCell;
let previousRow;
let previousCol;
let selectedPawn; 

function switchTurns(){
    isItPlayer1Turn = !isItPlayer1Turn;


    if(isItPlayer1Turn && !deploymentphase){
        infoText.innerHTML = "Player 1 turn, select a pawn to move";
        
    }
    else if(!isItPlayer1Turn && !deploymentphase) {
        infoText.innerHTML = "Player 2 turn, select a pawn to move";
        
    };

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

    else if (isItPlayer1Turn && !deploymentphase && !isPawnSelected){

        if((cell.innerHTML).includes("P1")){

        previousCell = currentCell;
        previousRow = Math.floor(cell.id/5);
        previousCol = cell.id%5;
        selectedPawn = cell.innerHTML;
        selectPawns(selectedPawn);


       
     
        }

        else{
            infoText.innerHTML = "Wrong pawn my guy!";
        }

      
        
    }
    else if(!isItPlayer1Turn && !deploymentphase && !isPawnSelected){
        
        if((cell.innerHTML).includes("P2")){

        previousCell = currentCell;
        previousRow = Math.floor(cell.id/5);
        previousCol = cell.id%5;
        selectedPawn = cell.innerHTML;
        selectPawns(selectedPawn);


        
        }

        else{
            infoText.innerHTML = "Wrong pawn my guy!";
        }

    }

    else if(isPawnSelected && cell.innerHTML === ""){
       
        console.log("The previous cell " + previousCell.id);
        updatePlayingBoard(selectedPawn);
        updateArr(cell.id, selectedPawn);
        findPlayerPosInArr(selectedPawn, previousCell.id);

      
    }
    
});

function findPlayerPosInArr(selected, cellId){
  
      
let column = playerposArr[Math.floor(cellId / 5)].indexOf(selected);
let row = Math.floor(cellId / 5);

//Remove from array
console.log("Removing this " + playerposArr[row][column]);
playerposArr[row][column] = 0;


    
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

        deployCount ++;
        
        if (deployCount === 2){
            switchTurns();
            deploymentphase = false;
            console.log("Deployment phase over");
            infoText.innerHTML = "Player 1 turn, select a pawn to move";
            
        }
    }

    updateArr(cellid, placeHolderPlayer);
    updatePlayingBoard(placeHolderPlayer);
}

function selectPawns(selectedPawn){

console.log("The selected pawn is" + selectedPawn);
infoText.innerHTML = "Move your pawn";
isPawnSelected = true;



}

function movePawn(cellText){

updatePlayingBoard(cellText);

}

function removeFromArr(){

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
    let newPosRow = Math.floor(currentCell.id/5);
    let newPosCol = currentCell.id % 5;
    if(deploymentphase){
        currentCell.innerHTML = cellText;    
    }

    else if(isPawnSelected){
       
        if(inRange(previousCol, newPosCol) && inRange(previousRow, newPosRow)){
           
            currentCell.innerHTML = cellText;
            previousCell.innerHTML = "";
            isPawnSelected = false;
   
            switchTurns();

            }   
            else{
            console.log(" Funket ikke ");
            infoText.innerHTML = "Your pawn can only move to the adjacent tiles";
             }

        

            console.log("selecpawn is " + isPawnSelected);
    }
    else{
        currentCell.innerHTML = cellText;
          //  console.log(" Du trykket utenfor ");
        
    
        
    }
}
function inRange(old,newer){
    
    let max = old+1;
    let min = old-1;
    return ((newer-min)*(newer-max)<=0);

}