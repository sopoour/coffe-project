/*STORES*/

//Coffee Stores!
var store1 = new Store("7-Eleven", "https://www.7-eleven.dk/", "/img/seveneleven.jpg");
var store2 = new Store("Upper Crust", "http://www.uppercrust-baguettes.com/", "img/uppercrust.jpg");
var store3 = new Store("Dunkin Donuts", "http://www.dunkin-donuts.dk/", "img/dunkindonuts.jpg");
var store4 = new Store("Joe & The Juice", "https://www.joejuice.com/", "img/joeandthejuice.jpg");
var store5 = new Store("Lagkagehuset", "https://lagkagehuset.dk/", "img/lagkagehuset.jpg");


//Push stores to an array
var stores = [];
stores.push(store1, store2, store3);

/*COFFEES*/
//Generate some great coffees!
addCoffee(store1, "Filter Coffee", 13);
addCoffee(store1, "Americano", 28);
addCoffee(store1, "Caffé Latte", 28);
addCoffee(store1, "Cappuccino", 28);
addCoffee(store1, "Latte Macchiato", 28);
addCoffee(store1, "Espresso", 22);
addCoffee(store1, "Doble Espresso", 28);
addCoffee(store1, "Iced Coffee", 20);
addCoffee(store2, "Americano", 25);
addCoffee(store2, "Espresso", 20);
addCoffee(store2, "Cappuccino", 32);
addCoffee(store2, "Caffé Latte", 32);
addCoffee(store3, "Americano", 27);
addCoffee(store3, "Espresso", 20);
addCoffee(store3, "Cappuccino", 35);
addCoffee(store3, "Caffé Latte", 35);
addCoffee(store3, "Filter Coffee", 25);
addCoffee(store4, "Caffé Latte", 30);
addCoffee(store4, "Cappuccino", 40);
addCoffee(store4, "Espresso", 25);
addCoffee(store4, "Iced Coffee", 40);
addCoffee(store5, "caffe Latte", 45);
addCoffee(store5, "Americano", 37);
addCoffee(store5, "Espresso", 35);
addCoffee(store5, "Cappuccino", 45);
addCoffee(store5, "Latte Macchiato", 40);
addCoffee(store5, "Doble Espresso", 40);

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
    //Call display function
    filterResult(filteredCoffees); 
}




/*
This builds a table based on given array of coffees. No filtering here.
*/


function filterResult(filteredCoffees) {
    
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
    columns.push("Type", "Price", "Store", "Favorite");
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

        var j = findCoffee(filteredCoffees[i],coffees);

        //Coffee doesn't exist?
        if(j<0) {
            alert("Großer Fehler");
            return null;
        } 
        var buttonID = "c"+j;

        var b = document.createElement("BUTTON");
        b.setAttribute('class','btn coffeeSelect');
        b.setAttribute('id',buttonID);
        //for favorites
        if(currentUser) {
            var isFavorite = checkIfFavorite(filteredCoffees[i]);

            if (isFavorite === true) {
                b.setAttribute('onClick','removeFavorite('+j+')');
                b.innerHTML = 'Remove From Favorites';
            }
            else {
    
                b.innerHTML = 'Add to Favorites';
                b.setAttribute('onClick','addFavorite('+j+')');
            }
        }

        else {
            //Link to Login
            b.setAttribute("onclick", "redirect()");
            b.innerHTML = 'Login first';
        }

        //"Hardcoded", should be smarter/more generic here, but need for a decision on how to iterate through data types in coffees[] (see above)
        var cell1 = row.insertCell(-1);
        cell1.innerHTML = filteredCoffees[i].type;
        var cell2 = row.insertCell(-1);
        cell2.innerHTML = filteredCoffees[i].price;
        var cell3 = row.insertCell(-1);
        cell3.innerHTML = filteredCoffees[i].store.name;
        var cell4 = row.insertCell(-1);
        //b.onclick = function() {addFavorite(currentUser.username, coffees[j].type)};
        cell4.appendChild(b);
        cell4.setAttribute("class", "buttons");
    }

    //Put table in <div> on HTML
    table.className = "table table-hover";
    //appendChild means to push the table within my div with id="resultsTable" (--> this is a child of div)
    dvTable.appendChild(table);

}

function findCoffee(coffee,searchArray) {

    for(var x=0;x<searchArray.length;x++) {
        //search coffee and compare it will all related columns
        if(searchArray[x].price==coffee.price && searchArray[x].type==coffee.type && comparer(searchArray[x].store,coffee.store)) {
            return x;
        }
    }
    return -1;
} 

/*
checkIfFavorite
Checks if a coffee object is already listed as current user's favorite.
Compares all favorites to var coffee (function called for every row = every filter result coffee)
@return true/false
*/
function checkIfFavorite(coffee) {
    var user = getCurrentUser();

    if(user.favorites.length<1) {
        //No favorites yet
        return false;
    }

    //Iterate through all current user's favorites and compare attributes to coffee
    for (var i=0; i<user.favorites.length; i++) {
        //Compare store
        if(comparer(user.favorites[i].store, coffee.store)){
            //Compare price
            if(user.favorites[i].price===coffee.price) {
                //compare type
                if(user.favorites[i].type===coffee.type) {
                    return true;
                }
            }
        }

    }
    /* Coffee is not in favorites -> return false */
    return false;
}

/*
@returns true if all property values of objectA and objectB are the same
(-> objects to be considered to be equal in this context)
@returns false if not

!!Started to work on it, but couldn't get it to work across several object dimensions... 
but will get there eventually.
*/
function comparer(objectA, objectB) {
    var aProps = Object.getOwnPropertyNames(objectA);
    var bProps = Object.getOwnPropertyNames(objectB);

    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (objectA[propName] !== objectB[propName]) {
            return false;
        }
    }

    //If we made it here, objects have same property levels
    return true
}

function showFavorites() {
    filterResult(currentUser.favorites);
}
