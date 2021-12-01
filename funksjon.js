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
      lastCol=0;
      lastRow=0;
    
     if(selectedP10==="P1-0"){
          col=p1a.poscol -1;
          row =p1a.posrow -1;
          console.log("funket dette ? ");
         p1True=false;
     }else{
          col=p1b.poscol -1;
          row =p1b.posrow -1;
     }
     
     /*
     if(lastCol+1===newPosCol || lastCol-1===nowPosCol || lastRow+1===nowPosRow|| lastRow-1===nowPosRow) move;
     

     col+1
     col-1
     row+1
     row-1
     
     */

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