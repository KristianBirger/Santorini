import defaultExport from stianStart.js;

let htmlTable = document.getElementById("SantoTable");
let infoText = document.getElementById("infoText");

//spillet skal gå i rekkefølge - Primært er dette hvordan det skal på gå
// status 1 = player 1 setter brikkene på banen
// status 2 = player 2 setter brikkene på banen
// status 3 = player 1 skal selecte en brikke
// status 4 = player 1 skal selecte plassen brikken skal flyttes til
// status 5 = player 1 skal selecte plassen brikken skal bygge

//---- siden player 1 og 2 er like så kan vi sette status x boolean player1=true
// ----- da er statusen redusert til 1 p1+p2, 2,3,4,5.

// status 6 = player 2 skal selecte en brikke
// status 7 = player 2 skal selecte plassen brikken skal flyttes til.
// status 8 = player 2 skal selecte plassen brikken skal bygge.

// status 9 = første som står på bygning nivå 3 har vunnet.

//under status 3+6 skal player som har selectett en brikke kunne angre.
//under status 4+7 skal brikken skjekkes om det er låv å gå vidre eller starte på nytt, rekursiv funksjon
//under status 5+8 skal byggin ikke pågå der en annen player står og ikke på seg selv, heller ikke på en 4 nivå bygning.

let status=["deploy","select", "move", "build","Win"];// status index 0,1,2,3,4

let player1=true;//bestemmer hvilken sin tur det er å trykke med musen.


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

    }else if(isBuilding && !isPawnSelected && cell.innerHTML === ""){
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
        selectPawns(selectedPawn);
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


    



