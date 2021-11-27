let htmlTable = document.getElementById("SantoTable");

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
let lastCell;
let lastRow;
let lastCol;
let selectedPawn; 
let isBuilding=false;
function switchTurns(){
    isItPlayer1Turn = !isItPlayer1Turn;
};

let deployCount = 0;

const tbody = document.querySelector('#SantoTable tbody');
const tBuild=document.querySelector('#SantoTable tbody');
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

    else if((cell.innerHTML).includes("P1")){
    if (isItPlayer1Turn && !deploymentphase && !isPawnSelected){
        
        lastCell = currentCell;
        lastRow=Math.floor(cell.id/5);
        lastCol=cell.id%5;
        selectedPawn = cell.innerHTML;
        selectPawns(selectedPawn);
       // findPlayerPosInArr(selected, cell.id);
        //switchTurns();
    }
    }
    else if(!isItPlayer1Turn && !deploymentphase){
        
        selectedPawn = cell.innerHTML;
        
        findPlayerPosInArr(selected, cell.id);
        
        switchTurns();
    }

    else if(isPawnSelected && cell.innerHTML === ""){
       
        console.log("The previous cell " + lastCell.id);
        updatePlayingBoard(selectedPawn);
        updateArr(cell.id, selectedPawn);
        findPlayerPosInArr(selectedPawn, lastCell.id);

    }else if(isBuilding && !isPawnSelected && cell.innerHTML === ""){
        let currentRow = Math.floor(currentCell.id/5);
        let currentColl = currentCell.id%5;
        building(currentRow,currentColl);
        updatePlayingBoard(selectedPawn);
        console.log("mapArr: ");
        console.log(mapArr);
    }
    
});

function findPlayerPosInArr(selected, cellId){
    if(isItPlayer1Turn){
      
let column = playerposArr[Math.floor(cellId / 5)].indexOf(selected);
let row = Math.floor(cellId / 5);

//Remove from array
playerposArr[row][column] = 0;
console.log("test " + playerposArr[row][column]);

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

        deployCount ++;
        
        if (deployCount === 2){
            switchTurns();
            deploymentphase = false;
            console.log("Deployment phase over")
            
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
    let newPosRow=Math.floor(currentCell.id/5);
    let newPosCol=currentCell.id%5
    if(deploymentphase){
        currentCell.innerHTML = cellText;    
    }

    else if(isPawnSelected){
        console.log("selecpawn is " + isPawnSelected);
        if(whereIstand(newPosRow,newPosCol)){
           
            currentCell.innerHTML = cellText;
            lastCell.innerHTML = "";
            isPawnSelected = false;

            isBuilding=true;
            
            
        console.log("is_building "+isBuilding+" is_pawn "+ isPawnSelected);
        }else{
                console.log(" Funket ikke ");
        }
    
        
    }else if(isBuilding){
        if(whereIstand()){
            building(newPosRow,newPosCol);
            console.log(mapArr);
            isBuilding=false;
            
        }
    }
    else{
        currentCell.innerHTML = cellText;
            console.log(" Du trykket utenfor ");
        
    
 //   lastCell.innerHTML = "";
    }
}
function inRange(old,newer){
    console.log(old +" newer "+newer);
    let max=old+1;
    let min=old-1;
        return ((newer-min)*(newer-max)<=0);
}
function building(currentRow,currentColl){
    
        console.log("sett building up by 1 ")
        return mapArr[currentRow][currentColl]++;
        
    
 

};
function whereIstand(newPosRow,newPosCol){
    if(lastCol===newPosCol && newPosCol ===newPosRow){
        return false;
    }
    else if(inRange(lastCol, newPosCol) && inRange(lastRow, newPosRow) && inRange(mapArr[lastRow][lastCol], mapArr[newPosRow][newPosCol])){
        return true;
    }
}