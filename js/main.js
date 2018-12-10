"use strict";
import createTable from './create-table.js';

window.onload= main;

function main(){
  document.getElementById("btn-gen").addEventListener("click", createTable);
  document.getElementById("btn-calculate").addEventListener("click", calculate);

  function calculate(){
    const data = getData();
    console.log(data);
    const pivotColumn = findPivotColumn(data);
    const pivotIndex = findPivotRow(pivotColumn, data);
    
    console.log(data[pivotIndex][pivotColumn], pivotColumn, pivotIndex);

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
      const row = data[0];
      row.pop();
      const minValue = Math.min(...row)
      return row.findIndex(item => item == minValue);
  }
  function findPivotRow(pivotColumn, data){
    const rowLength = data[0].length;
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