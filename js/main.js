"use strict";
import createTable from './create-table.js';
import simplex from './simplex.js';
import getData from './normalize.js';

window.onload= main;

function main(){
  document.getElementById("btn-gen").addEventListener("click", createTable);
  document.getElementById("btn-calculate").addEventListener("click", calculate);

  function calculate(){
    const selectedOption = document.getElementById("select-option").value;
    const data = getData();
    const result = simplex(data, selectedOption);
    
    console.log(result.iterateData);
    print(result);
  }

  function print(result){
    const divResult = document.getElementById("result");
    divResult.innerHTML = "";

    const {iterateData, enteredVariablesIndex} = result;
    const solIndex = iterateData[0].length -1;

    const resultZ = iterateData[0][solIndex];
    divResult.appendChild(createDiv(`Z = ${resultZ}`));
    for(let item of enteredVariablesIndex){      
      const [pivotRow, pivotColumn] = item;

      const resultVar = iterateData[pivotRow][solIndex];
      divResult.appendChild(createDiv(`X${pivotColumn+1} = ${resultVar}`));
    }
    
  }

  function createDiv(text){
    const div = document.createElement("div");
    div.innerHTML = text;
    div.className = "row";
    return div
  }
}