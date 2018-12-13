
function minimization(data){
  const newData = [...data];
  newData.shift();
  const newFunc = [];
  for(let i = 0; i < newData.length; i++){
    for(let j = 0; j < newData[i].length; j++){
      if(isNaN(newFunc[j])) newFunc[j] = 0;
      newFunc[j] += newData[i][j];
    }
  }
  newData.unshift(newFunc);
  const {iterateData, enteredVariablesIndex} = iterate(newData, Math.max);

  iterateData.splice(0, 1, data[0]);
  for(let item of enteredVariablesIndex){
    const [pivotRow, pivotColumn] = item;
    const reducedRow = reduceRowToOne(iterateData, pivotRow, pivotColumn, 0);
    iterateData.splice(0, 1, reducedRow);
  }
  return {
    iterateData: iterateData,
    enteredVariablesIndex: enteredVariablesIndex
  };
}

function maximization(data){
  return iterate(data, Math.min, true);
}

function iterate(initData, func){
  let exit = false;
  const enteredVariablesIndex = [];
  while(!exit){
    console.log([...initData]);
    const data = [...initData];
    const pivotColumn = findPivotColumn(data, func);
    let pivotRow = findPivotRow(pivotColumn, data);
    if(pivotRow == -1){
      exit = true;
    }

    
    enteredVariablesIndex.push([pivotRow, pivotColumn]);
    const pivotElement = data[pivotRow][pivotColumn];

    const newRow = reducePivotRowToOne(data[pivotRow], pivotElement);
    data.splice(pivotRow, 1, newRow);

    for(let i = 0; i < data.length; i++){
      if(i != pivotRow ){
        const reducedRow = reduceRowToOne(data, pivotRow, pivotColumn, i);
        data.splice(i, 1, reducedRow);
      }
    }
    if(checkFinish(data)){
      exit = true;
    }
  }
  return {
    iterateData:data,
    enteredVariablesIndex: enteredVariablesIndex
  };
}

function checkFinish(data){
  const row = [...data[0]];
  row.pop();
  let count = 0;
  for(let item of row){
    if(item >= 0){
      count++ ;
    }
  }
  if(count == row.length){
    return true;
  }
  return false;
}

function reduceRowToOne(data, pivotRow, pivotColumn, i){
  const rowToReduce = data[i];
  const cellToReduce = data[i][pivotColumn]*-1;
  const pivotRowMod = data[pivotRow].map(item => item*cellToReduce);

  const reducedRow = [];
  for(let i = 0; i<rowToReduce.length; i++){
    const reducedCell = rowToReduce[i] + pivotRowMod[i];
    reducedRow.push(reducedCell);
  }
  return reducedRow;
}

function reducePivotRowToOne(row, pivotElement){
  const newRow = row.map(number => number / pivotElement);
  return newRow;
}

function getData(){
  const nVar = document.getElementById("var").value;
  const nRes = document.getElementById("res").value;

  const data = [];
  for(let x = 0; x <= nRes; x++){
    const row = [];
    for(let y = 0; y<nVar; y++){
      const cell = document.getElementById("cell-"+x+y);
      row.push(cell.value | 0);
    }
    const sol = document.getElementById("cell-"+x+"-valor");
    row.push(sol ? sol.value | 0 : 0);
    data.push(row);
  }
  return data;
}

function findPivotColumn(data, func){
  const row = [...data[0]];
  row.pop();
  const minValue = func(...row)
  return row.findIndex(item => item == minValue);
}
function findPivotRow(pivotColumn, data){
  const rowLength = data[0].length-1;
  const ratios= [];
  let negatives = 0;
  for(let i = 1; i<data.length; i++){
    const cell = data[i][pivotColumn];
    if(cell < 0){
      negatives++;
      ratios.push(Infinity);
    }else{
      const cellSol = data[i][rowLength];
      ratios.push(cellSol/cell);
    }
  }
  if(negatives == rowLength){
    return -1;
  }
  const minValue = Math.min(...ratios);

  return ratios.findIndex(i => i == minValue)+1;
}

export {getData, maximization, minimization};