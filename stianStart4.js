

let htmlTable = document.getElementById("SantoTable");
let infoText = document.getElementById("infoText");
let standingCell;
//let p1a = {};
//let p1b = {};

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


let selectedPawn; 
let isBuilding = false;
let isMoved=false;
function switchTurns(){
    if(!isBuilding){
        isItPlayer1Turn = !isItPlayer1Turn;
    }
    

    if( isItPlayer1Turn && isBuilding && !deploymentphase){
       
        infoText.innerHTML="Player 1 turn, Select place to build";
    }
    else if(!isItPlayer1Turn && !deploymentphase && isBuilding){
        infoText.innerHTML = "Player 2 turn, Select place to build"
    }
    else if(!isItPlayer1Turn && !deploymentphase) {
        infoText.innerHTML = "Player 2 turn, select a pawn to move";
        
    }else if(isItPlayer1Turn && !deploymentphase){
        infoText.innerHTML = "Player 1 turn, select a pawn to move";

    };
};

let deployCount = 0;

const tbody = document.querySelector('#SantoTable tbody');
tbody.addEventListener('click', function (e){
  const cell = e.target.closest('td');
  currentCell = cell;
  //console.log (" isPlayer1 " + isItPlayer1Turn+" isBuilding " + isBuilding +" isPawnSelected "+ isPawnSelected);
  if (!cell) {
    return;
    }
    //Player 1 deploy
    if(deploymentphase && isItPlayer1Turn && cell.innerHTML === "" && deployCount < 2){

        deployPlayers(cell.id);
    }

    if(deploymentphase && !isItPlayer1Turn && cell.innerHTML === "" && deployCount < 2){

        deployPlayers(cell.id);

    }else if(isBuilding && !isPawnSelected && cell.innerHTML === ""&& whereIstand(standingCell,currentCell) ){
        let currentRow = Math.floor(currentCell.id/5);
        let currentColl = currentCell.id%5;
        
        building(currentRow,currentColl);
        
        updatePlayingBoard(selectedPawn);
        isBuilding=false;
        console.log("mapArr: ");
        console.log(mapArr);// for å se om mapet bygges
    }


    else if (isItPlayer1Turn && !deploymentphase && !isPawnSelected){
        
        if((cell.innerHTML).includes("P1")){
            console.log("uuuh" + (cell.innerHTML).includes("P1"));
        
        previousCell = currentCell;
        selectedPawn = cell.innerHTML;
        if(isBuilding===false){
        selectPawns(selectedPawn);}
        
        }
        else{
            infoText.innerHTML = "Wrong pawn my guy!";
        }

       
        
        
    }
    else if(!isItPlayer1Turn && !deploymentphase && !isPawnSelected){
        
        if((cell.innerHTML).includes("P2")){
            console.log("uuuh" + (cell.innerHTML).includes("P2"));
       
        previousCell = currentCell;
        selectedPawn = cell.innerHTML;
        if(isBuilding===false){
        selectPawns(selectedPawn);}
        
        }
        else{
            infoText.innerHTML = "Wrong pawn my guy!";
        }

    }else if((cell.innerHTML).includes("P1")){
        if(isItPlayer1Turn && !deploymentphase && isPawnSelected){
        previousCell = currentCell;
        selectedPawn = cell.innerHTML;
        selectPawns(selectedPawn);}
    }else if((cell.innerHTML).includes("P2")){
        if( !isItPlayer1Turn && !deploymentphase && isPawnSelected){
        previousCell = currentCell;
        selectedPawn = cell.innerHTML;
        selectPawns(selectedPawn);}
    }

    else if(isPawnSelected && cell.innerHTML === ""){
       
        
        updatePlayingBoard(selectedPawn);
        updateArr(cell.id, selectedPawn);
        findPlayerPosInArr(selectedPawn, previousCell.id);

    }
    
});

function findPlayerPosInArr(selected, cellId){
   
      
let column = playerposArr[Math.floor(cellId / 5)].indexOf(selected);
let row = Math.floor(cellId / 5);

//Remove from array
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
            console.log("Deployment phase over")
            infoText.innerHTML = "Player 1 turn, select a pawn to move";
            
        }
    }

    updateArr(cellid, placeHolderPlayer);
    updatePlayingBoard(placeHolderPlayer);
}

function selectPawns(selectedPawn){

console.log("The selected pawn is " + selectedPawn);

isPawnSelected = true;

}


function updateArr (cellId, cellText){

    cellId = addToPlayerPosArr(cellId, cellText);
    
}
    

function addToPlayerPosArr(cellId, cellText) {
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
    return cellId;
}

function updatePlayingBoard(cellText){
    
    if(deploymentphase){
        currentCell.innerHTML = cellText;    
    }

    else if(isPawnSelected){
        
        if( whereIstand( previousCell, currentCell)){
        currentCell.innerHTML = cellText;
        standingCell=currentCell;
        previousCell.innerHTML = "";
        isPawnSelected = false;
        isBuilding = true;
        switchTurns();

        }else{ 
             console.log("Error: is_building " + isBuilding + " is_pawn " +isPawnSelected)
         }
    }else if(isBuilding){
    
        if(whereIstand(previousCell,currentCell)){
            //console.log(mapArr);
            isBuilding=false;
            switchTurns();
            
        }else{
            isBuilding=false;
            switchTurns();
        }
    }
    else{
    
    currentCell.innerHTML = cellText;
 //   lastCell.innerHTML = "";
    }

    
}
function whereIstand(oldPos,newPos){
    let newPosRow,newPosCol, oldPosRow,oldPosCol;
    

    newPosRow=Math.floor(Math.floor(newPos.id/5));
    newPosCol=newPos.id%5;

    oldPosRow=Math.floor(Math.floor(oldPos.id/5));
    oldPosCol=oldPos.id%5;

    if(oldPosCol===newPosCol && newPosCol === newPosRow && oldPosRow === newPosRow){
        
        return false;
    }
    else if(inRange(oldPosCol, newPosCol) && inRange(oldPosRow, newPosRow) && inRange(mapArr[oldPosRow][oldPosCol], mapArr[newPosRow][newPosCol]) && inRange(mapArr[newPosRow][newPosCol], mapArr[oldPosRow][oldPosCol])){
      
        return true;
    }else if(inRange(oldPosCol, newPosCol) && inRange(oldPosRow, newPosRow) && mapArr[oldPosRow][oldPosCol]>0 && isBuilding){
        
        return true;
    }else{
        return console.log("Error: oldPos "+ oldPos + ", NewPos: " + newPos) ;
    }
}

function building(currentRow,currentColl){
    // dette påvirker koden og burde revurderess.
    console.log("sett building up by 1 ");
    let fargelegging=document.getElementById(currentCell.id);
    //let tableHtml=document.getElementById("SantoTable");
    let switchChecker=mapArr[currentRow][currentColl];
    console.log("Switch checker value? "+ switchChecker);
    switch(switchChecker){
        
        case 0:
            fargelegging.classList.add("tier1");
            break;
        case 1:
           
            fargelegging.classList.add("tier2");
           // fargelegging.classList.remove("tier1");
            break;
        case 2:
            //fargelegging.classList.remove("tier2");
            fargelegging.classList.add("tier3");
            break;
        case 3:
            //fargelegging.classList.remove("tier3");
            fargelegging.classList.add("tier4");
            break;
    }
    
    

    return mapArr[currentRow][currentColl]++;
};
function inRange(old,newer){
    
    let max=old+1;
    let min=old-1;
        if(min<0){
            min=0;
        return ((newer-min)*(newer-max)<=0);
    }else if(max >5){
        max=5;
        return ((newer-min)*(newer-max)<=0);
    }
    else{
        return ((newer-min)*(newer-max)<=0);
    }
}