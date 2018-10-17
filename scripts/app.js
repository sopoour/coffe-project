/*COFFEES*/
//Generate some creat coffees!
let coffee1 = new Coffee("Starbucks", "Cappuchino",45);
let coffee2 = new Coffee("Dunkin","Cappuchino",40);
let coffee3 = new Coffee("7-11","Latte Macchiatto",30);
let coffee4 = new Coffee("McDonalds","Espresso",14);

//Push all coffees to an array
var coffees = [];
coffees.push(coffee1,coffee2,coffee3,coffee4);

/*STORES*/

//Coffee Stores!
let store1 = new Store("Starbucks","https://www.starbucks.com","/img/starbucks.jpg");
let store2 = new Store("Dunkin Donuts","https://www.dunkin-donuts.com","img/dunkin.jpg");
let store3 = new Store("MyPlace","https://www.myplace.com","img/myplace.jpg");

//Push stores to an array
var stores = [];
stores.push(store1, store2, store3);

/* Why doesn't this work? a iterates over all objects in stores... maybe some issue with the objects?
for (var a in stores) {
    console.log("This is "+a.name);
}
*/

//FUNCTIONS


/*
This builds a yet not-so-nice table with yummy coffees.
*/
function filterResult() {
    //Creates Table
    var table=document.createElement("TABLE");
    table.border=1;
   
    //Init Header Row
    var columns = [];
    columns.push("Type","Price","Store");
    var row=table.insertRow(-1);

    //Fill out Header Row
    for(var i = 0;i<columns.length;i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = columns[i];
        row.appendChild(headerCell);
    }

    //Coffee Rows
    for(var i=0;i<coffees.length;i++) {
        row = table.insertRow(-1);

        //"Hardcoded", should be smarter/more generic here, but need for a decision on how to iterate through data types in coffees[]
        var cell1 = row.insertCell(-1);
        cell1.innerHTML = coffees[i].type;
        var cell2 = row.insertCell(-1);
        cell2.innerHTML = coffees[i].price;
        var cell3 = row.insertCell(-1);
        cell3.innerHTML = coffees[i].store;
    }

    //Put table in <div> on HTML
    table.className="table table-hover";
    var dvTable = document.getElementById("ResultsTable");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);

}