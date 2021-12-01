//import * as db from "./db.js";
//let db = require("./db.js");

let htmlTable = document.getElementById("SantoTable");
let infoText = document.getElementById("infoText");
let inputChat = document.getElementById("inputChat");
let btnChat = document.getElementById("btnSend");
let chatContainer = document.getElementById("chatContainer");

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
let previusPlayerPos=[];
let previusMapPos=[];

let pObjet={
    player: playerposArr,
    map: mapArr
}

let deploymentphase = true; 

let isItPlayer1Turn = true;

let isPawnSelected = false;

let winnerState = false;

let currentCell;
let previousCell;


let selectedPawn; 
let isBuilding = false;
let isMoved=false;



sendArr();
function switchTurns(){
    if(!isBuilding){
        isItPlayer1Turn = !isItPlayer1Turn;
        // sendArr(); dette er en post
       
        
        
    /*
    */
         // venter på database pull er på plass.
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

    else if(deploymentphase && !isItPlayer1Turn && cell.innerHTML === "" && deployCount < 2){

        deployPlayers(cell.id);

    }else if(isBuilding && !isPawnSelected && cell.innerHTML === "" && whereIstand(standingCell,currentCell) ){
        let currentRow = Math.floor(currentCell.id/5);
        let currentColl = currentCell.id%5;
        
        building(currentRow,currentColl);
        console.log("Building level ");
        console.log(mapArr) 
        updatePlayingBoard(selectedPawn);
        isBuilding=false;
      
    }


    else if (isItPlayer1Turn && !deploymentphase && !isPawnSelected){
        
        if((cell.innerHTML).includes("P1")){
           // console.log("uuuh" + (cell.innerHTML).includes("P1"));
        
        previousCell = currentCell;
        selectedPawn = cell.innerHTML;

        if(isBuilding===false){
        selectPawns(selectedPawn);}
        if(mapArr[Math.floor(currentCell.id/5)][currentCell.id%5]>2){
            let player = isItPlayer1Turn;
            return winnerCalculator(player);
        }
        
        }
        else{
            infoText.innerHTML = "Wrong pawn my guy!";
        }

       
        
        
    }
    else if(!isItPlayer1Turn && !deploymentphase && !isPawnSelected){
        
        if((cell.innerHTML).includes("P2")){
            //console.log("uuuh" + (cell.innerHTML).includes("P2"));
       
        previousCell = currentCell;
        selectedPawn = cell.innerHTML;
        if(isBuilding===false){
        selectPawns(selectedPawn);}
        //console.log(" winner? " + mapArr[Math.floor(currentCell.id/5)][currentCell.id%5]);
        if(mapArr[Math.floor(currentCell.id/5)][currentCell.id%5]>2){
            let player = isItPlayer1Turn;
            return winnerCalculator(player);
        }
        }
        else{
            infoText.innerHTML = "Wrong pawn my guy!";
        }

    }else if((cell.innerHTML).includes("P1")){
        if(isItPlayer1Turn && !deploymentphase && isPawnSelected ){
        previousCell = currentCell;
        selectedPawn = cell.innerHTML;
        selectPawns(selectedPawn);}
    }else if((cell.innerHTML).includes("P2")){
        if( !isItPlayer1Turn && !deploymentphase && isPawnSelected ){
        previousCell = currentCell;
        selectedPawn = cell.innerHTML;
        selectPawns(selectedPawn);}
    }

    else if(isPawnSelected && cell.innerHTML === "" ){
       // previousCell = currentCell;
        if(whereIstand(previousCell,currentCell)){
        updatePlayingBoard(selectedPawn);
        updateArr(cell.id, selectedPawn);
        findPlayerPosInArr(selectedPawn, previousCell.id);
        printPlayerArray();
        }

    }
    //updateDbArr();
    updateDbArr();
    getArr();
    arrChangeToDb();
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
    //printPlayerArray();
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
    //printInnerHTML();
    return cellId;
}

function updatePlayingBoard(cellText){
    //getArr();
    if(deploymentphase){
        //console.log(" Kjører denne 2 ganger? ");
       
    }

    else if(isPawnSelected){
        standingCell=currentCell;
        if( whereIstand( previousCell, currentCell)){
        //currentCell.innerHTML = cellText;
        
        //previousCell.innerHTML = "";
        isPawnSelected = false;
        isBuilding = true;
         
        if(mapArr[Math.floor(currentCell.id/5)][currentCell.id%5]>2){
            let player = isItPlayer1Turn;
            return winnerCalculator(player);
        }
        switchTurns();
        

        }else{ 
             console.log("Error: is_building " + isBuilding + " is_pawn " +isPawnSelected)
         }
    }else if(isBuilding){
    
        if(whereIstand(previousCell,currentCell, null)){
            //console.log(mapArr);
            isBuilding=false;
            switchTurns();
            
        }else{
            isBuilding=false;
            switchTurns();
        }
    }
    else{
    

 //printInnerHTML();

    //currentCell.innerHTML = cellText;
   // lastCell.innerHTML = "";
    }
    printPlayerArray();
   
}
function winnerCalculator(winName){
    let winnerName;
    if(winName)winnerName=" Player 1 ";
    if(!winName)winnerName=" Player 2";
    let winnerText= document.getElementById("jimbo");
    winnerText.innerHTML = " Du want! " + winnerName;
    console.log(" Du want! " + winnerName);
}
function whereIstand(oldPos,newPos, currentPos){
    let newPosRow,newPosCol, oldPosRow,oldPosCol;
    

    newPosRow=Math.floor(Math.floor(newPos.id/5));
    newPosCol=newPos.id%5;
    if(currentPos === undefined && oldPos === undefined ){

    }
    else if(oldPos === undefined){
        oldPosRow=Math.floor(Math.floor(currentPos.id/5));
        oldPosCol=currentPos.id%5;
    }else{
        oldPosRow=Math.floor(Math.floor(oldPos.id/5));
    oldPosCol=oldPos.id%5;
    }
    
    updateDbArr();
    getArr();
    if(oldPosCol===newPosCol && newPosCol === newPosRow && oldPosRow === newPosRow){
        
        return false;
    }
    else if(inRange(oldPosCol, newPosCol) && inRange(oldPosRow, newPosRow) && inRange(mapArr[oldPosRow][oldPosCol], mapArr[newPosRow][newPosCol]) && inRange(mapArr[newPosRow][newPosCol], mapArr[oldPosRow][oldPosCol])){
      
        return true;
    }else if(inRange(oldPosCol, newPosCol) && inRange(oldPosRow, newPosRow)  && isBuilding){
        
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
    //console.log("Switch checker value? "+ switchChecker);

    
    

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

//------------------------------------------------------------------- Chat

btnChat.addEventListener("click", sendMessage);
 // sender playerArr når klikker på grafen.

function sendArr(){
    console.log(" sending player array ");
    sendPlayerArr();
    
}

function sendMessage (){

    console.log("sending message");
    
    sendRequest();
    

}

let myInterval;

if(!myInterval){

    myInterval = setInterval(getMessages, 2000); 

}

async function getArr(){
    let url = "/api/parr";
    let innerPlayerArr=[];
    let resPlayerArr=[];
    let innerMapArr=[];
    let resMapArr=[];

    try{
    let getArr = await fetch(url);
   
    let data = await getArr.json();

    
    //console.log(data);
    //console.log("Player " + data[0].playerarr);// data av array index tror jeg
    //console.log("Map "+data[0].maparr);
    let pArrValue;
    let mArrValue;

    for(value of data){
        let player=data[value].playerarr;
        let map=data[value].maparr;
         pArrValue=player.replaceAll("\"","").replaceAll("{","").replaceAll("}","");
         mArrValue=map.replaceAll("}","").replaceAll("{","").replaceAll("\"","");

    }
    let splitMArr=mArrValue.split(",");
    let splitPArr = pArrValue.split(",");
    console.log("split mar: ");
    console.log(splitMArr);
    console.log("split par: ");
    console.log(splitPArr);
    
    for (let i=0;  i < splitPArr.length; i++){
        if(innerPlayerArr.length<5){
            if(splitPArr[i]==="0"||splitPArr[i]===0 ){
                innerPlayerArr.push(0);
            }else if(splitPArr[i]==="P1-0"){
                console.log(" sjer dette dårlig tid? p1");
                innerPlayerArr.push("P1-0");
            }else if(splitPArr[i]==="P1-1"){
                console.log(" sjer dette dårlig tid? p11");
                innerPlayerArr.push("P1-1");
            }else if(splitPArr[i]==="P2-0"){
                console.log(" sjer dette dårlig tid? p2");
                innerPlayerArr.push("P2-0");
            }else if(splitPArr[i]==="P2-1"){
                console.log(" sjer dette dårlig tid? p22");
                innerPlayerArr.push("P2-1");
            }else{
                console.log(" PlayerArr index got gliched " + splitPArr[i])}
            if(i===24){
                    resPlayerArr.push(innerPlayerArr);
            } 
         }else{
            resPlayerArr.push(innerPlayerArr);
            innerPlayerArr=[];
            if(splitPArr[i]==="0"||splitPArr[i]===0 ){
                innerPlayerArr.push(0);
            }else if(splitPArr[i]==="P1-0"){
                innerPlayerArr.push("P1-0");
            }else if(splitPArr[i]==="P1-1"){
                innerPlayerArr.push("P1-1");
            }else if(splitPArr[i]==="P2-0"){
                innerPlayerArr.push("P2-0");
            }else if(splitPArr[i]==="P2-1"){
                innerPlayerArr.push("P2-1");
            }else{
                console.log(" PlayerArr index got gliched " + splitPArr[i])}
         }
         if(innerMapArr.length<5){
             
            if(splitMArr[i]==="0"||splitMArr[i]===0 ){
                innerMapArr.push(0);
            }else if(splitMArr[i]==="1"||splitMArr[i]===1){
                innerMapArr.push(1);
            }else if(splitMArr[i]==="2"||splitMArr[i]===2){
                innerMapArr.push(2);
            }else if(splitMArr[i]==="3"||splitMArr[i]===3){
                innerMapArr.push(3);
            }else if(splitMArr[i]==="4"||splitMArr[i]===4){
                innerMapArr.push(4);
            }else{
                console.log(" Map klarte ikke å finne map number ");
            }
            if(i===24){
                resMapArr.push(innerMapArr);
        } 
           
            } else{
                resMapArr.push(innerMapArr);
                innerMapArr=[];
                if(splitMArr[i]==="0"||splitMArr[i]===0 ){
                    innerMapArr.push(0);
                }else if(splitMArr[i]==="1"||splitMArr[i]===1){
                    innerMapArr.push(1);
                }else if(splitMArr[i]==="2"||splitMArr[i]===2){
                    innerMapArr.push(2);
                }else if(splitMArr[i]==="3"||splitMArr[i]===3){
                    innerMapArr.push(3);
                }else if(splitMArr[i]==="4"||splitMArr[i]===4){
                    innerMapArr.push(4);
                }else{
                    console.log(" Map klarte ikke å finne map number ");
                }
            }
    }
    
    console.log("is this corect?:   ");
    console.log(resPlayerArr); // her kan jeg exportere player arr fra database
    console.log(" Map Array : ");
    console.log(resMapArr);

    //-----------------------Map Array

    previusPlayerPos=resPlayerArr;
    previusMapPos=resMapArr;
   // console.log("");

    //playerposArr=resPlayerArr;
    //mapArr=resMapArr;
     // dette refresher canvasen med ny verdier

     playerposArr = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]; 
    // Må ha to, enten må kun playeren stå i arrayen eller hva nivå bygningen er på 
    mapArr = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];


    
   }catch(err){
        console.log(" URL could not be fetcherd " + err);
    }


}

async function updateDbArr(){
    let url ="/api/pArr";
    let update ={
        id: 1,
        arr: playerposArr,
        mar: mapArr

    }
    let cfg = {
        method: "PUT",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(update)
    }
    try {
        let response = await fetch(url, cfg);
        let data = await response.json();
        
    
        if (response.status != 200) {
            throw data.error;
        }
    }
    
    catch(error) {
        console.log("something went wrong!")
        console.log(error);
    }

}

async function sendPlayerArr(){
    let url ="/api/pArr";
    let update ={
        id: 3,
        arr: pObjet,
        //mar: mapArr

    }
    let cfg = {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(update)
    }
    try {
        let response = await fetch(url, cfg);
        let data = await response.json();
        
    
        if (response.status != 200) {
            throw data.error;
        }
    }
    
    catch(error) {
        console.log("something went wrong!")
        console.log(error);
    }
}
async function sendRequest(){

    let url = "/msgs";

let updata = {
    id: "Carlson",
    msg: inputChat.value
}

let cfg = {
    method: "POST",
    headers: {"Content-type":"application/json"},
    body: JSON.stringify(updata)
}

try {
    let response = await fetch(url, cfg);
    let data = await response.json();
    

    if (response.status != 200) {
        throw data.error;
    }
}

catch(error) {
    console.log("something went wrong!")
    console.log(error);
}

}



async function getMessages(){
    let url = "/msgs";
    const messageLength = 6;
    chatContainer.innerHTML = "";
    

    try{
        let response = await fetch (url);
        let data = await response.json();

        if (response.status != 200) {
            throw data.error;
        }

        
        let dataReversed = data.reverse();
        dataReversed = data.slice(0,messageLength);

        for (let value of dataReversed) {
            

            let html = "<h3>" + value.heading + "</h3>";
            html += "<p>" + value.msgbody + "</p>";
            
            let myDiv = document.createElement("div");
            myDiv.innerHTML = html;
            
            chatContainer.appendChild(myDiv);
            
        }
        
    }
    catch(error) {
        console.log(error);
    }
}



function printPlayerArray(){
       let idCounter=0;
       let idDesign = idCounter;
    for(let i = 0; i < playerposArr.length; i++){
        let playerarrPosCounter=playerposArr[i].length
        for(let j = 0;j < playerarrPosCounter; j++){
            // includes 
            let checkId= document.getElementById(idCounter);
           
            if(playerposArr[i][j]==="P1-0"){
                checkId.innerText = "P1-0";
            }else if(playerposArr[i][j] === "P1-1"){
                checkId.innerText = "P1-1";
            }else if(playerposArr[i][j] === "P2-0"){
                checkId.innerText = "P2-0";
            }else if(playerposArr[i][j] === "P2-1"){
                checkId.innerText =  "P2-1";
            }else{
                checkId.innerText = "";
            }
            idCounter++;
        }

    }

    for(let i = 0; i < mapArr.length; i++){
        let mapArrCounter =mapArr[i].length
        
        for(let j = 0;j < mapArrCounter; j++){
            // includes 
            
            let checkId = document.getElementById(idDesign);
            console.log(" Check id: " + mapArrCounter);
           
            switch(mapArr[i][j]){
        
                case 1:
                    checkId.classList.add("tier1");
                    break;
                case 2:
                   
                    checkId.classList.add("tier2");
                   // fargelegging.classList.remove("tier1");
                    break;
                case 3:
                    //fargelegging.classList.remove("tier2");
                    checkId.classList.add("tier3");
                    break;
                case 4:
                    //fargelegging.classList.remove("tier3");
                    checkId.classList.add("tier4");
                    break;
            }
                idDesign++;
        }

    }


}
function arrChangeToDb(){

    if(previusPlayerPos[0]!==undefined && previusMapPos[0]!==undefined){
        playerposArr=previusPlayerPos;
        mapArr=previusMapPos;
    }   else{
        console.log(" Vi hentet ikke fra databasen ")
    }
    
}