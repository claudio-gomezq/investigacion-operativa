"use strict";
import createTable from './create-table.js';

window.onload= main;

function main(){
  document.getElementById("btn-gen").addEventListener("click", createTable);
  document.getElementById("btn-calculate").addEventListener("click", calculate);

  function calculate(){
    const data = getData();
    console.log(data);
    let exit = false;
    while(!exit){
      const pivotColumn = findPivotColumn(data);
      const pivotRow = findPivotRow(pivotColumn, data);
      
      console.log(data[pivotRow][pivotColumn]);
      const pivotElement = data[pivotRow][pivotColumn];
  
      const newRow = reducePivotRowToOne(data[pivotRow], pivotElement);
      data.splice(pivotRow, 1, newRow);
  
      for(let i = 0; i < data.length; i++){
        if(i != pivotRow){
          const reducedRow = reduceRowToOne(data, pivotRow, pivotColumn, i);
          data.splice(i, 1, reducedRow);
        }
  
      }
      
      if(checkFinish(data)){
        exit = true;
      }

    }
  }

  function checkFinish(data){
    const row = data[0];
    let count = 0;
    for(let item of row){
       if(item == 0){
        count++;
       }
    }
    if(count == data[0].length-1){
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
      const reducedCell = pivotRowMod[i] + rowToReduce[i];
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

  function findPivotColumn(data){
      const row = [...data[0]];
      row.pop();
      const minValue = Math.min(...row)
      return row.findIndex(item => item == minValue);
  }
  function findPivotRow(pivotColumn, data){
    const rowLength = data[0].length-1;
    const ratios= [];
    for(let i = 1; i<data.length; i++){
      const cell = data[i][pivotColumn];
      const cellSol = data[i][rowLength];
      ratios.push(cellSol/cell);
    }
    const minValue = Math.min(...ratios);
    return ratios.findIndex(i => i == minValue)+1;
  }

}