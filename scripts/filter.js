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
addCoffee(store1,"cappuccino",45);
addCoffee(store2, "cappuccino",40);
addCoffee(store3,"latte",30);
addCoffee(store3, "espresso",14);
addCoffee(store1, "arabica",20);
addCoffee(store3, "cappuccino",12);
addCoffee(store2, "espresso",42);
addCoffee(store2, "latte",500);
addCoffee(store1, "arabica",5);
addCoffee(store1, "espresso",12);
addCoffee(store3, "arabica",43);
addCoffee(store1, "cappuccino",100);
addCoffee(store3, "latte",24);
addCoffee(store3, "arabica",29);
addCoffee(store2, "arabica",74);
addCoffee(store1, "arabica",35);

//FUNCTIONS

var coffees=getCoffees();


function filter(dataType,operation,attributeValue,filterValue) {
    //Returns true or false
    /*
    Accepted values for comparison: text -> equals // number -> smaller, smallerequals, equals, greaterequals, greater
    If unaccepted input -> return false and alert error
    */
   if(dataType=="text") {
       //alert("analyzieren wir den Typ");
        if(filterValue===attributeValue) {
            //alert("hier ist jetzt die situation: "+filterValue+" == "+attributeValue);
            return 1;
        }
        else if(filterValue=="none"){
            //alert("du hasch select ausgewählt, also gibts nix");
            return 2;
        }
        
        else {
            //alert("Typ passt ned");
            return 0;
        }
   }

   else if(dataType=="number") {
       //alert("analyzieren wir den Preis");
        if(filterValue==0) {
            return 2; //Kein Input
        }
           var comper;
           switch(operation) {
            case "equals":
                comper = filterValue==attributeValue;
                break;
            case "smaller":
                comper = filterValue<attributeValue;
                break;
            case "smallerequals":
                comper = filterValue<=attributeValue;
                break;
            case "greaterequals":
                //alert("hier ist jetzt die situation: "+filterValue+" >= "+attributeValue+" ??");
                comper = filterValue>=attributeValue;
                break;
            case "greater":
                comper = filterValue>attributeValue;
                break;
           }
           if(comper) {
               //lert("und das gibt true!");
               return 1; //True
           }
           //alert("und das gibt false");
    }
    //alert("gibt 0 zurück, weil passt ned");
    return 0; //Passt ned
}

function doFilter() {
    var filteredCoffees=[];
    var price = document.getElementById("priceInput").value;
    var typeContainer = document.getElementById("typeInput");
    var type = typeContainer.options[typeContainer.selectedIndex].value;

    //alert("type is "+type);
    if (!price && !type) {
        //Do stuff for no input values
        //alert("No Input values");
        //return means to cancel the function and get out of it again; you could also use false
        return null;
    }

    var coffeeIndexes = [];

    for(var x=0;x<coffees.length;x++) {
        //alert(x+" schauen wir uns an, ist "+coffees[x].type+" und kostet "+coffees[x].price);
        var filters = [];
        filters.push(filter("number","greaterequals",coffees[x].price,price)); //Price
        filters.push(filter("text","equals",coffees[x].type,type)); //Type

        for(var a=0;a<filters.length;a++) {
            if(filters[a]==1) {
                //for all other filters
                if(filters.length==1) {
                    //Only one, so let's add it directly
                    //alert("Füge index "+x+" hinzu...");
                    filteredCoffees.push(coffees[x]);
                    break;
                }
                else {
                    var falseCounter=0;
                    //Let's look at the other filter results
                    for(var b=0;b<filters.length;b++) {
                        if(filters[b]==0) falseCounter++;
                    }
                    //add only, if other filters are empty, but are not "wrong"/contradicting
                    if(falseCounter==0) {
                        //alert("Füge index "+x+" hinzu...");
                        filteredCoffees.push(coffees[x]);
                        break;
                    }
                }
            }
        }
   
    }

    return filteredCoffees; 
}




//This function is for building a table

function filterResult() {
    //call the actual filtering function
    //filteredCoffee is an array that stores each coffee and these will be printed in each row
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
    //Creates Table - capital letters because it's being created
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
        console.log("Kaffee "+i+" ist "+filteredCoffees[i].type);
        row = table.insertRow(-1);

        var j = findCoffee(filteredCoffees[i]);

        //Coffee doesn't exist?
        if(j<0) {
            alert("Großer Fehler");
            return null;
        } 
        var buttonID = "c"+j;

        var b = document.createElement("BUTTON");
        b.setAttribute('class','btn coffeeSelect');
        b.setAttribute('id',buttonID);
        
        var isFavorite = checkFavorites(filteredCoffees[i], currentUser);

        if(isFavorite==true) {
            b.onclick = function() { removeFavorite(); };
            b.innerHTML = 'Remove From Favorites';
        }
        else {
            //b.onclick = function() {addFavorite(currentUser,filteredCoffees[i]);}; 
            //b.onclick = function() {alert('syntaxcheck');};
            //b.setAttribute('onclick','addFavorite('+currentUser+','+filteredCoffees[i]+')');
            b.innerHTML = 'Add '+filteredCoffees[i].type+' to Favorites';
            b.setAttribute('onClick','addFavorite('+currentUser.username+','+j+')');
        }

        //"Hardcoded", should be smarter/more generic here, but need for a decision on how to iterate through data types in coffees[] (see above)
        var cell1 = row.insertCell(-1);
        cell1.innerHTML = filteredCoffees[i].type;
        var cell2 = row.insertCell(-1);
        cell2.innerHTML = filteredCoffees[i].price;
        var cell3 = row.insertCell(-1);
        cell3.innerHTML = filteredCoffees[i].store.name;
        var cell4 = row.insertCell(-1);
        b.onclick = function() {addFavorite(currentUser.username, coffees[j].type)};
        cell4.appendChild(b);

    }

    //Put table in <div> on HTML
    table.className = "table table-hover";
    //appendChild means to push the table within my div with id="resultsTable" (--> this is a child of div)
    dvTable.appendChild(table);

}

function findCoffee(coffee) {
    var cStore = coffee.store;
    var cPrice = coffee.price;
    var cType = coffee.type;
    
    for(var x=0;x<coffees.length;x++) {
        //search coffee and compare it will all related columns
        if(coffees[x].price==coffee.price && coffees[x].type==coffee.type && coffees[x].store == coffee.store) {
            return x;
        }
    }
    return -1;
} 

