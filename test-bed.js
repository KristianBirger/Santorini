//define the grid objects

class GridSquare {
   constructor(position, height, occupant, adjacencies) {
      this.position = position;
      this.height = height;
      this.occupant = occupant;
      this.adjacencies = adjacencies;
   }

   increaseHeight() {
      this.height++;
   };

   occupiedByPlayer1() {
      this.occupant = "player1Piece";
   };

   occupiedByPlayer2() {
      this.occupant = "player2Piece";
   };

   clearTheSpace() {
      this.occupant = "empty";
   };
};

const a1 = new GridSquare("a1", 0, "player1piece", ["a2", "b1", "b2"]);
const a2 = new GridSquare("a2", 0, "player1piece", ["a1", "a3", "b1", "b2", "b3"]);
const a3 = new GridSquare("a3", 0, "player2piece", ["a2", "a4", "b2", "b3", "b4"]);
const a4 = new GridSquare("a4", 0, "empty", ["a3", "a5", "b3", "b4", "b5"]);
const a5 = new GridSquare("a5", 0, "empty", ["a4", "b4", "b5"]);
const b1 = new GridSquare("b1", 0, "empty", ["a1", "a2", "b2", "c1", "c2"]);
const b2 = new GridSquare("b2", 0, "empty", ["a1", "a2", "a3", "b1", "b3", "c1", "c2", "c3"]);
const b3 = new GridSquare("b3", 0, "empty", ["a2", "a3", "a4", "b2", "b4", "c2", "c3", "c4"]);
const b4 = new GridSquare("b4", 0, "empty", ["a3", "a4", "a5", "b3", "b5", "c3", "c4", "c5"]);
const b5 = new GridSquare("b5", 0, "empty", ["a4", "a5", "b4", "c4", "c5"]);
const c1 = new GridSquare("c1", 0, "empty", ["b1", "b2", "c2", "d1", "d2"]);
const c2 = new GridSquare("c2", 0, "empty", ["b1", "b2", "b3", "c1", "c3", "d1", "d2", "d3"]);
const c3 = new GridSquare("c3", 0, "empty", ["b2", "b3", "b4", "c2", "c4", "d2", "d3", "d4"]);
const c4 = new GridSquare("c4", 0, "empty", ["b3", "b4", "b5", "c3", "c5", "d3", "d4", "d5"]);
const c5 = new GridSquare("c5", 0, "empty", ["b4", "b5", "c4", "d4", "d5"]);
const d1 = new GridSquare("d1", 0, "empty", ["c1", "c2", "d2", "e1", "e2"]);
const d2 = new GridSquare("d2", 0, "empty", ["c1", "c2", "c3", "d1", "d3", "e1", "e2", "e3"]);
const d3 = new GridSquare("d3", 0, "empty", ["c2", "c3", "c4", "d2", "d4", "e2", "e3", "e4"]);
const d4 = new GridSquare("d4", 0, "empty", ["c3", "c4", "c5", "d3", "d5", "e3", "e4", "e5"]);
const d5 = new GridSquare("d5", 0, "empty", ["c4", "c5", "d4", "e4", "e5"]);
const e1 = new GridSquare("e1", 0, "empty", ["d1", "d2", "e2"]);
const e2 = new GridSquare("e2", 0, "empty", ["d1", "d2", "d3", "e1", "e3"]);
const e3 = new GridSquare("e3", 0, "empty", ["d2", "d3", "d4", "e2", "e4"]);
const e4 = new GridSquare("e4", 0, "empty", ["d3", "d4", "d5", "e3", "e5"]);
const e5 = new GridSquare("e5", 0, "empty", ["d4", "d5", "e4"]);

const boardArray = [a1, a2, a3, a4, a5, b1, b2, b3, b4, b5, c1, c2, c3, c4, c5, d1, d2, d3, d4, d5, e1, e2, e3, e4, e5]



// const gsA1 = document.getElementById("a1");
// const gsA2 = document.getElementById("a2");
// const gsA3 = document.getElementById("a3");
// const gsA4 = document.getElementById("a4");
// const gsA5 = document.getElementById("a5");
// const gsB1 = document.getElementById("b1");
// const gsB2 = document.getElementById("b2");
// const gsB3 = document.getElementById("b3");
// const gsB4 = document.getElementById("b4");
// const gsB5 = document.getElementById("b5");
// const gsC1 = document.getElementById("c1");
// const gsC2 = document.getElementById("c2");
// const gsC3 = document.getElementById("c3");
// const gsC4 = document.getElementById("c4");
// const gsC5 = document.getElementById("c5");
// const gsD1 = document.getElementById("d1");
// const gsD2 = document.getElementById("d2");
// const gsD3 = document.getElementById("d3");
// const gsD4 = document.getElementById("d4");
// const gsD5 = document.getElementById("d5");
// const gsE1 = document.getElementById("e1");
// const gsE2 = document.getElementById("e2");
// const gsE3 = document.getElementById("e3");
// const gsE4 = document.getElementById("e4");
// const gsE5 = document.getElementById("e5");

// const domGridSquareArray = [gsA1, gsA2, gsA3, gsA4, gsA5, gsB1, gsB2, gsB3, gsB4, gsB5, gsC1, gsC2, gsC3, gsC4, gsC5, gsD1, gsD2, gsD3, gsD4, gsD5, gsE1, gsE2, gsE3, gsE4, gsE5];

const adjacencyObject = {
   "a1": a1,
   "a2": a2,
   "a3": a3,
   "a4": a4,
   "a5": a5,
   "b1": b1,
   "b2": b2,
   "b3": b3,
   "b4": b4,
   "b5": b5,
   "c1": c1,
   "c2": c2,
   "c3": c3,
   "c4": c4,
   "c5": c5,
   "d1": d1,
   "d2": d2,
   "d3": d3,
   "d4": d4,
   "d5": d5,
   "e1": e1,
   "e2": e2,
   "e3": e3,
   "e4": e4,
   "e5": e5
 };
 
//  let isItPlayer1Turn = true;

//  const switchTurn = () => {
//    isItPlayer1Turn = !isItPlayer1Turn;
//  };

// const turnNotifier = document.getElementById("turn-tracker");

// const displayTurnNotifier = () => {
//   if (isItPlayer1Turn) {
//     return (turnNotifier.innerHTML = "Player 1's turn");
//   }
//   return (turnNotifier.innerHTML = "Player 2's turn");
// };

// // Storage variable for last place a piece was placed (e.g. current piece to perform build action); piece selected to move
// let pieceToBuild;

// let pieceChosenToMove;

// // Add and remove event listeners

// const addEventListenersToGrid = theFunc => {
//    return domGridSquareArray.forEach(domGridSquare => {
//      const gridSquareVariable = translateStringToVariable(domGridSquare.id);
//      const funcyVariable = () => theFunc(gridSquareVariable);
 
//      return domGridSquare.addEventListener("click", funcyVariable);
//    });
//  };
 
//  const removeEventListenersFromGrid = theFunc => {
//     return domGridSquareArray.forEach(domGridSquare => {
//       const gridSquareVariable = translateStringToVariable(domGridSquare.id);
//       const funcyVariable = () => theFunc(gridSquareVariable);
  
//       return domGridSquare.removeEventListener("click", funcyVariable);
//     });
//   };

  const filterForPlayer1Pieces = (gridSquare) => {
   if (gridSquare.occupant === 'player1piece') {
      return gridSquare;
   } else null;
};

const filterForPlayer2Pieces = (gridSquare) => {
  if (gridSquare.occupant === 'player2piece') {
     return gridSquare;
  } else null;
};

const have2piecesBeenDeployedForEachPlayer = () => {
   const filteredArrayP1 = boardArray.filter(filterForPlayer1Pieces);
   const filteredArrayP2 = boardArray.filter(filterForPlayer2Pieces);
   if (filteredArrayP1.length === 2 && filteredArrayP2.length === 2) {
      return true;
   } return false;
};


console.log(have2piecesBeenDeployedForEachPlayer());