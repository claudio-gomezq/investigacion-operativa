"use strict";
window.onload= main;

function main(){
  document.getElementById("btn-gen").addEventListener("click", createTable);

  function createTable (){
    const nVar = document.getElementById("var").value;
    const nRes = document.getElementById("res").value;

    const headTable = document.getElementById("head-table");
    headTable.innerHTML = '<th scope="col">#</th>';
    const bodyTable = document.getElementById("body-table");
    bodyTable.innerHTML = '<tr id="func-row"><th scope="row">Max z</th></tr>';

    for(let i = 0; i < nVar; i++){
      const th = document.createElement("th");
      th.innerHTML = "X"+(i+1);
      headTable.appendChild(th);
      const td = createCell();
      document.getElementById("func-row").appendChild(td);
    }
    for(let x = 0; x < nRes; x++){
      console.log();
      const tr = document.createElement("tr");
      const thRes = document.createElement("th");
      thRes.scope = "row";
      thRes.innerHTML = "R"+(x+1);
      //cualquier cosa
      tr.appendChild(thRes);
      for(let y= 0; y < nVar; y++){
        tr.appendChild(createCell());
      }
      bodyTable.appendChild(tr);
    }

  }
  function createCell(){
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    td.appendChild(input);
    return td;
  }
}
