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

let isMove = true;

let currentCell;

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
    let selected = cell.innerHTML;
    findElement(selected, cell.id);
});
function findElement(selected, cellId){
    if(isItPlayer1Turn){
     
console.log(`Prøver å finne ${selected} med id ${Math.floor(cellId / 5)}`);
  
let column = playerposArr[Math.floor(cellId / 5)].indexOf(selected);
let row = Math.floor(cellId / 5);

console.log("row: " + row);
console.log("column: " + column);
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

function movePlayers(){



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

    currentCell.innerHTML = cellText;

}