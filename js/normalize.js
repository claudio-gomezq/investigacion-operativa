function getData(){
  const nVar = document.getElementById("var").value;
  const nRes = document.getElementById("res").value;    
  const data = [];
  const {vars, nR, nS} = getVar(nRes);
  for(let x = 0; x <= nRes; x++){
    const row = [];
    for(let y = 0; y<nVar; y++){
      const cell = document.getElementById("cell-"+x+y);
      row.push(cell.value | 0);
    }
    const sol = document.getElementById("cell-"+x+"-valor");
    const newRow = [...row, ...vars[x]];
    newRow.push(sol ? sol.value | 0 : 0);
    data.push(newRow);
  }
  return {
    data: data,
    nR: nR,
    nS: nS
  }
}
  
function getVar(nRes){
  const vars = [];
  const [nR, nS] = countVar(nRes);
  const totalVar = nR+nS;
  
  let currentR = 0;
  let currentS = 0;
  
  const rowFunc = fillRow(totalVar);
  vars.push(rowFunc);

  for(let i = 0 ; i < nRes; i++){
    const value = document.getElementById("select-"+i).value;
    const rowVar = fillRow(totalVar);
    switch(value){
      case "=":
        rowVar[nS+currentR] = 1;
        currentR++;
        break;
      case ">=":
        rowVar[nS+currentR] = 1;
        rowVar[currentS] = -1;
        currentR++;
        currentS++;
        break;
      case "<=":
        rowVar[currentS] = 1;
        currentS++;
        break;
    }
    vars.push(rowVar);
  }
  return {
    vars: vars,
    nR: nR,
    nS: nS,
  };
}

function fillRow(totalVar){
  const rowVar = [];
  for(let j = 0; j < totalVar; j++){
    rowVar[j] = 0;
  }
  return rowVar;
}

function countVar(nRes){
  let nR = 0;
  let nS = 0;
  for(let i = 0; i<nRes; i++){
    const value = document.getElementById("select-"+i).value;
    switch(value){
      case "=":
        nR++;
        break;
      case ">=":
        nS++;
        nR++;
        break;
      case "<=":
        nS++;
        break;
    }
  }
  return [nR, nS];
}

export default getData;