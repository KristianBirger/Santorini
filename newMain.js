
let htmlTable = document.getElementById("SantoTable");

let p1a = {
    poscol:0,
    posrow:0
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
let playerSelect=false;
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
       
      //  switchTurns();
        
    }
    else if(!isItPlayer1Turn && cell.innerHTML === ""){
        
       // switchTurns();
    }
 
    let selected = cell.innerHTML;
    findElement(selected, cell.id);
});

function findElement(selected ,id){
   ///console.log(isItPlayer1Turn);
    let pArry1Index=Math.floor(id/5);
    let pArry2Index = playerposArr[Math.floor(id/5)].indexOf(selected);
    console.log("collum "+pArry2Index + " row " + pArry1Index);
    if(isItPlayer1Turn && !deploymentphase){
        //let findIndexOf=playerposArr[Math.floor(id/5)].indexOf(selected);
        console.log("pArry1 " + pArry1Index + " pArry2 " + pArry2Index);
        
        if(pArry2Index>=0){
            playerSelect=true;
            console.log("playerSelect er nå true");

        }
        
    }
// Bruk p1a.posrow for nedover og p1a.col for bortover
    if(playerSelect===true && outOfBounds(pArry1Index,pArry2Index) && !deploymentphase){
        
        p1a.posrow=pArry1Index;
        p1a.poscol=id%5;
        console.log("p1a er nå satt til col: " + p1a.poscol + " p1a er satt til row: " + p1a.posrow);
        playerSelect=false;
    }

   
}
function outOfBounds(newPosrow,newPoscol){
    let col=p1a.poscol -1;
    let row =p1a.posrow -1;
    for(let i=0;i<2;i++){
        if(
        col+i=== newPoscol || col+2===newPoscol){
            if(row===newPosrow || col+1!==col+i&&row+1==newPosrow || row+2===newPosrow){
                return true;
            }
        }

        if(
        row+i === newPosrow|| row+2 === newPosrow){
            if(col===newPoscol|| row+1!==row+i&&col+1==newPoscol || col+2===newPoscol){
                return true;
            }
        }
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
            deploymentphase = false;
            console.log("Deployment phase over");
        }
        
    }

    updateArr(cellid, placeHolderPlayer);
    updatePlayingBoard(placeHolderPlayer);
}

//function movePlayers(){}


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