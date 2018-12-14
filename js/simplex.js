function simplex(normalizeData, option){
  const {data, nR} = normalizeData;
  if(nR > 0){
    return twoPhases(normalizeData, option);
  }

  if(option == "max"){
    return maximization(data);
  }else{
    return minimization(data);
  }

}

function twoPhases(normalizeData, option){
  const {data, nR, nS} = normalizeData;

  const newData = [...data];
  
  
  const length = data[0].length;
  const funcRow = [];
  for(let h = 0; h < length; h++){
    if(h >= length-nR &&  h <= length){
      funcRow.push(-1);
    }else{
      funcRow.push(0);
    }
  }

  newData.splice(0,1,funcRow);
  
  const newFunc = [];
  for(let i = 0; i < newData.length; i++){
    for(let j = 0; j < newData[i].length; j++){
      if(isNaN(newFunc[j])) newFunc[j] = 0;
      newFunc[j] += newData[i][j];
    }
  }


  newData.splice(0 , 1, newFunc);
  const {iterateData} =  minimization(data);

  iterateData.splice(0, 1, data[0]);
  
  let secondData = {}
  if(option == "max"){
    secondData = maximization(iterateData);
  }else{
    secondData = minimization(iterateData);
  }

  return {
    iterateData: secondData.iterateData,
    enteredVariablesIndex: secondData.enteredVariablesIndex
  };
}

function minimization(data){
  return iterate(data, Math.max, "min");
}

function maximization(data){
  return iterate(data, Math.min, "max");
}

function iterate(initData, func, option){
  let exit = false;
  const enteredVariablesIndex = [];
  const data = [...initData];
  while(!exit){
    const pivotColumn = findPivotColumn(data, func);
    let pivotRow = findPivotRow(pivotColumn, data);
    if(pivotRow == -1 || pivotColumn == -1){
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
    console.log([...data]);
    if(checkFinish(data, option)){
      exit = true;
    }
  }
  return {
    iterateData:data,
    enteredVariablesIndex: enteredVariablesIndex
  };
}

function checkFinish(data, option){
  const row = [...data[0]]; 
  row.pop();
  let count = 0;
  for(let item of row){
    if(option == "max"){
      if(item >= 0){
        count++ ;
      }
    }else{
      if(item <= 0){
        count++ ;
      }
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


function findPivotColumn(data, func){
  const row = [...data[0]];
  const minValue = func.apply(null, row.filter(Boolean));
  if(minValue === Infinity){
    return -1;
  }
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

export default simplex;