
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

let isMove = true;

let p1true=false;//skjekker om du trykket p1-0

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
       
       // switchTurns();
        
    }
    else if(!isItPlayer1Turn && cell.innerHTML === ""){
        
        //switchTurns();
    }
 
    let selected = cell.innerHTML;
    
    if(selected==="P1-0" && !deploymentphase){
        p1true=true; console.log(" p1true er nå "+p1true);
    }
    findElement(selected, cell.id);
});

function findElement(selected ,id){
   ///console.log(isItPlayer1Turn);
    let pArry1Index=Math.floor(id/5);
    let pArry2Index = playerposArr[Math.floor(id/5)].indexOf(selected);
    console.log("pArry1 " + pArry1Index + " pArry2 " + pArry2Index+  " id: "+ id%5);
    if(isItPlayer1Turn && !deploymentphase){
        //let findIndexOf=playerposArr[Math.floor(id/5)].indexOf(selected);
        if(pArry2Index>=0){
            playerSelect=true;

            console.log("playerSelect er nå true");

        }
    }
// Bruk p1a.posrow for nedover og p1a.col for bortover
console.log("out_bounce "+outOfBounds(pArry1Index,id%5,p1true) +" player_selected " + playerSelect + " deployment? " + !deploymentphase);
    if(playerSelect===true && outOfBounds(pArry1Index,id%5,p1true) && !deploymentphase){
        
        p1a.posrow=pArry1Index;
        p1a.poscol=id%5;
        console.log("p1a er nå satt til col: " + p1a.poscol + " p1a er satt til row: " + p1a.posrow);
        playerSelect=false;
    }

   
}

function outOfBounds(newPosrow,newPoscol,selectedP10){
    console.log(newPosrow + " dette er pos col: "+ newPosrow);
    let col=0;
    let row=0;
    
    if(selectedP10==="P1-0"){
         col=p1a.poscol -1;
         row =p1a.posrow -1;
         console.log("funket dette ? ");
        p1True=false;
    }else{
         col=p1b.poscol -1;
         row =p1b.posrow -1;
    }
    
    for(let i=0;i<2;i++){
        if( col+i=== newPoscol || col+2===newPoscol){
            if(row===newPosrow || col+1!==col+i&&row+1==newPosrow || row+2===newPosrow){
                return true;
            }
        }else{ return false;}

        if( row+i === newPosrow|| row+2 === newPosrow){
            if(col===newPoscol|| row+1!==row+i&&col+1==newPoscol || col+2===newPoscol){
                return true;
            }else{return false;}
            

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
    
    let setP1aRow= Math.floor(currentCell.id/5);
    let setP1aCol= currentCell.id%5;
    //let setP1bRow= Math.floor(currentCell.id/5);
    //let setP1bCol= currentCell.id%5;
    
    currentCell.innerHTML = cellText;
    console.log(" Dette er for objektett col: "+setP1aCol+ " row: " + setP1aRow );
    if(currentCell.innerHTML==="P1-0"){
        
        p1a.posrow=setP1aRow;
        p1a.poscol=setP1aCol;
        console.log (" in start p1a: row "+p1a.posrow +" collum: "+ p1a.poscol);
    }
    if(currentCell.innerHTML=== "P1-1"){
        p1b.posrow=setP1aRow;
        p1b.poscol=setP1aCol;
        console.log (" in start p1b: row "+p1b.posrow +" collum: "+ p1b.poscol);
    }
}