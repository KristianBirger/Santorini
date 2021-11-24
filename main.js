let htmlTable = document.getElementById("SantoTable");

let p1a = {
    pos: playerposArr,
    floorlevel: test,
};

let p1b = {
    pos: playerposArr,
    floorlevel: test,
};

console.log(playerposArr[3][2]);


/*let playerposArr = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]; */

let mapArr = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,2,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
];

let deploy = true; 



const tbody = document.querySelector('#SantoTable tbody');
tbody.addEventListener('click', function (e){
  const cell = e.target.closest('td');
  if (!cell) {
    return;
    }
    else{
        
        updateArr(cell.id);
    }
});

function updateArr (cellid){

    console.log(cellid);

}