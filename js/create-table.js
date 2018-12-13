export default function createTable (){
    const nVar = document.getElementById("var").value;
    const nRes = document.getElementById("res").value;

    const headTable = document.getElementById("head-table");
    headTable.innerHTML = '<th scope="col">#</th>';

    const bodyTable = document.getElementById("body-table");
    bodyTable.innerHTML = `<tr id="func-row">
                            <th scope="row">
                                <select id="select-option" >
                                    <option value="max">Max Z</options>
                                    <option value="min">Min Z</options>
                                </select>
                            </th>
                          </tr>`;

    for(let i = 0; i < nVar; i++){
        const th = document.createElement("th");
        th.innerHTML = "X"+(i+1);
        headTable.appendChild(th);
        const td = createCell(0, i);
        document.getElementById("func-row").appendChild(td);
    }

    for(let x = 0; x < nRes; x++){
        const tr = document.createElement("tr");
        const thRes = document.createElement("th");
        thRes.scope = "row";
        thRes.innerHTML = "R"+(x+1);

        tr.appendChild(thRes);
        for(let y= 0; y < nVar; y++){
            tr.appendChild(createCell(x+1, y));
        }
        tr.appendChild(createCellWithSelect(x));
        tr.appendChild(createCell(x+1, "-valor"));
        bodyTable.appendChild(tr);
    }
    document.getElementById("btn-calculate").style.display= "inline-block";
}

function createCell(x, y){
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.id = "cell-"+(x)+y;
    td.appendChild(input);
    return td;
}
function createCellWithSelect(x){
    const td = document.createElement("td");
    const select = document.createElement("select");
    select.appendChild(createItem("<=","<="));
    select.appendChild(createItem(">=",">="));
    select.appendChild(createItem("=","="));
    select.id = "select-"+x;
    td.appendChild(select);
    return td;
}

function createItem(text, value){
    const item = document.createElement("option");
    item.value = value;
    item.innerHTML = text;
    return item;
}