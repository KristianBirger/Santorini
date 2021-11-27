// Her ligger en rekke funksjoner

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

function whereIstand(oldPos,newPos){
    let newPosRow,newPosCol, oldPosRow,oldPosCol;
    console.log("whereIStand = " + newPos.id + " old " + oldPos.id + " " );

    newPosRow=Math.floor(Math.floor(newPos.id/5));
    newPosCol=newPos.id%5;

    oldPosRow=Math.floor(Math.floor(oldPos.id/5));
    oldPosCol=oldPos.id%5;
console.log("whereIStand = " + newPos.id + newPos.id);
    if(oldPosCol===newPosCol && newPosCol === newPosRow){
        console.log(" activated ");
        return false;
    }
    else if(inRange(oldPosCol, newPosCol) && inRange(oldPosRow, newPosRow) && inRange(mapArr[oldPosRow][oldPosCol], mapArr[newPosRow][newPosCol])){
        console.log(" dette funket inRANGE: " +inRange(oldPosCol, newPosCol) + " " + inRange(oldPosRow, newPosRow)  + " " + inRange(mapArr[oldPosRow][oldPosCol],mapArr[newPosRow][newPosCol]));
        return true;
    }else{
        return console.log("oldPos "+ oldPos + ", NewPos: " + newPos) ;
    }
}
function building(currentRow,currentColl){
    //let colorchange=docuemnt.getElementById(cell.id);
    //colorchange.classList.add("");
    console.log("sett building up by 1 ");
    
    return mapArr[currentRow][currentColl]++;

    



};
function inRange(old,newer){
    console.log(old +" newer "+ newer);
    let max=old+1;
    let min=old-1;
        return ((newer-min)*(newer-max)<=0);
}




function updatePlayingBoard(cellText){

    if(deploymentphase){
        currentCell.innerHTML = cellText;    
    }

    else if(isPawnSelected){
        console.log("where i stand: " + whereIstand(previousCell,currentCell) + " previus " + previousCell.id + " " + currentCell.id);
        if( whereIstand( previousCell, currentCell)){
        currentCell.innerHTML = cellText;
        previousCell.innerHTML = "";
        isPawnSelected = false;
        isBuilding = true;

        console.log("selecpawn is " + isPawnSelected + " IsBuilding: "+ isBuilding);
           
        switchTurns();
        }else{ 
             console.log("Error: is_building " + isBuilding + " is_pawn " +isPawnSelected)
         }
    }else if(isBuilding){
        console.log( "Wher i stand: " + whereIstand(previousCell,currentCell));
        if(whereIstand(previousCell,currentCell)){
            //console.log(mapArr);
            isBuilding=false;
            switchTurns();
            
        }
    }
    else{
    
    currentCell.innerHTML = cellText;
 //   lastCell.innerHTML = "";
    }
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
    
    function movePawn(cellText){
    
    updatePlayingBoard(cellText);
    
    }
    
    function removeFromArr(){
    
    }
    
    function updateArr (cellId, cellText){
    
        cellId = addToPlayerPosArr(cellId, cellText);
        
    }