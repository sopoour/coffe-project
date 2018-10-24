/*STORES*/

//Coffee Stores!
var store1 = new Store("Starbucks", "https://www.starbucks.com", "/img/starbucks.jpg");
var store2 = new Store("Dunkin Donuts", "https://www.dunkin-donuts.com", "img/dunkin.jpg");
var store3 = new Store("MyPlace", "https://www.myplace.com", "img/myplace.jpg");

//Push stores to an array
var stores = [];
stores.push(store1, store2, store3);

/*COFFEES*/
//Generate some great coffees!
addCoffee(store1,"Cappuchino",45);
addCoffee(store2, "Cappuchino",40);
addCoffee(store3,"Latte Macchiato",30);
addCoffee(store3, "Espresso",14);
addCoffee(store2, "Arabica",20);
/*var coffee1 = new Coffee(1,store1, "Cappuccino", 45);
var coffee2 = new Coffee(2,store2, "Cappuccino", 40);
var coffee3 = new Coffee(3,store1, "Latte Macchiato", 30);
var coffee4 = new Coffee(4,store3, "Espresso", 14);*/

//Push all coffees to an array
/*var coffees = [];
coffees.push(coffee1, coffee2, coffee3, coffee4);*/



/* Why doesn't this work? a iterates over all objects in stores... maybe some issue with the objects?
for (var a in stores) {
    console.log("This is "+a.name);
}
*/

//FUNCTIONS

var coffees=getCoffees();

function doFilter() {
    var filteredCoffees=[];
    var price = document.getElementById("priceInput").value;
    var type = document.getElementById("typeInput").value;

    if (!price && type === "Select...") {
        //Do stuff for no input values
        alert("No Input values");
        return null;
    }

    for(var x=0;x<coffees.length;x++) {
        var c = coffees[x];
        //For what is the var lock?
        /*
        Otherwise it might be that coffees are pushed multiple times to filteredCoffees[].
        Tough i am still working on a more generic way to do the filter (right now both filters are statically coded, want to have this generic)
        */
        var lock = false;
        //Price Checker
        if (c.price <= price && type === "Select...") {
            filteredCoffees.push(c);
            lock=true;
        }
        //Type Checker
        if (c.type === type && !price) {
            filteredCoffees.push(c);
            lock=true;
        }

        if (c.type === type && c.price <= price && !lock) {
            filteredCoffees.push(c);
        }
    }
    alert
    return filteredCoffees;
}

/*
This builds a yet not-so-nice table with yummy coffees.
*/
function filterResult() {
    var filteredCoffees=doFilter();
    //Do we really need this if statement? and for what?
    /*
    I put this in for development/debuging purpose, as this helps me to identify when there is something wrong with doFilter().
    I work a lot with the chrome dev tools and if this if condition returns true then there is something wrong in doFilter. 
    return null is just a statement to quit the function in this case.
    */
    if (!filteredCoffees) {
        return null;
    }
    var dvTable = document.getElementById("resultsTable");
    dvTable.innerHTML = "";
    //how can the function doFilter() have a length?
    /*
    ?
    doFilter() is a function, it has no length attribute, but the returning array of doFilter(filteredCoffees) does
    */
    if (filteredCoffees.length === 0) {
        alert("No matching objects");
        return null;
    }
    //Creates Table
    var table = document.createElement("TABLE");
    table.border = 1;

    //Init Header Row
    var columns = [];
    columns.push("Type", "Price", "Store", "Button");
    var row = table.insertRow(-1);

    //Fill out Header Row
    for (var i = 0; i < columns.length; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = columns[i];
        row.appendChild(headerCell);
    }

    //Coffee Rows
    for (var i = 0; i < filteredCoffees.length; i++) {
        row = table.insertRow(-1);
        
        var j = findCoffee(filteredCoffees[i]);
        if(j<0) {
            alert("Großer Fehler");
            return null;
        }
        var buttonID = "coffee-"+j;

        var b = document.createElement("BUTTON");
        b.setAttribute('class','btn coffeeSelect');
        b.setAttribute('id',buttonID);
        b.innerHTML = 'Add To Favorites';

        //"Hardcoded", should be smarter/more generic here, but need for a decision on how to iterate through data types in coffees[] (see above)
        var cell1 = row.insertCell(-1);
        cell1.innerHTML = filteredCoffees[i].type;
        var cell2 = row.insertCell(-1);
        cell2.innerHTML = filteredCoffees[i].price;
        var cell3 = row.insertCell(-1);
        cell3.innerHTML = filteredCoffees[i].store.name;
        var cell4 = row.insertCell(-1);
        cell4.appendChild(b);

    }

    //Put table in <div> on HTML
    table.className = "table table-hover";
    dvTable.appendChild(table);

}

function findCoffee(coffee) {
    for(var x=0;x<coffees.length;x++) {
        if(coffees[x].price==coffee.price && coffees[x].type==coffee.type && coffees[x].store == coffee.store) {
            return x;
        }
    }
    return -1;
}

