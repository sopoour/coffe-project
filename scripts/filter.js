/*STORES*/

//Coffee Stores!
var store1 = new Store("7-Eleven", "https://www.7-eleven.dk/", "/img/seveneleven.jpg");
var store2 = new Store("Upper Crust", "http://www.uppercrust-baguettes.com/", "img/uppercrust.jpg");
var store3 = new Store("Dunkin Donuts", "http://www.dunkin-donuts.dk/", "img/dunkindonuts.jpg");
var store4 = new Store("Joe & The Juice", "https://www.joejuice.com/", "img/joeandthejuice.jpg");
var store5 = new Store("Lagkagehuset", "https://lagkagehuset.dk/", "img/lagkagehuset.jpg");

//Push stores to an array
//We don't need it but you could use it if you iterate through stores at some point
//var stores = [store1, store2, store3, store4, store5];
var stores = [store1,store2,store3,store4,store5];

/*COFFEES*/
//Generate some great coffees!
addCoffee(store1, "Filter Coffee", 13);
addCoffee(store1, "Americano", 28);
addCoffee(store1, "Caffé Latte", 28);
addCoffee(store1, "Cappuccino", 28);
addCoffee(store1, "Espresso", 22);
addCoffee(store1, "Double Espresso", 28);
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
addCoffee(store5, "Caffé Latte", 45);
addCoffee(store5, "Americano", 37);
addCoffee(store5, "Espresso", 35);
addCoffee(store5, "Cappuccino", 45);
addCoffee(store5, "Caffé Latte", 40);
addCoffee(store5, "Double Espresso", 40);

//FUNCTIONS

var coffees=getCoffees();

/**
 * 
 * FILTER compares attributeValue with filterValue.
 * Attribute Value is a parameter from an existing coffee object in the system, filterValue is passed from the input fields.
 * The function will try to find a match between filterValue and attributeValue, and has three return options:
 * 0 = filter doesn't match
 * 1 = filter matches
 * 2 = no filter because of default input ("Select...") and empty price
 * This filter supports two data types: "text" and "number".
 * If "number" is chosen, it will require an operator to compare.
 * 
 * @param {accepts text and number} dataType 
 * @param {accepts equals/smaller/smalerequals/equals/greaterequals/greater} operation 
 * @param {gets the value of the coffee object that we are currntly iterating on} attributeValue 
 * @param {gets the value from the input field that is to be compared} filterValue 
 * 
 */

//DOES THE ACTUAL MATCHING/COMPARING PROCESS
function filter(dataType,operation,attributeValue,filterValue) {
    //TEXT
    if (dataType === "text") {
        if (filterValue === attributeValue) {
            return 1;
        }
        else if (filterValue === "none") {
            return 2;
        }
        else {
            return 0;
        }
   }
   //NUMBER
    else if (dataType === "number") {
        if (filterValue === 0) {
            return 2; //No Input
        }
        //Compare = True/False (True if filterValue ==attributeValue, False if not)
        var compare;
           switch(operation) {
            case "equals":
                compare = filterValue === attributeValue;
                break;
            case "smaller":
                compare = filterValue < attributeValue;
                break;
            case "smallerequals":
                compare = filterValue <= attributeValue;
                break;
            case "greaterequals":
                compare = filterValue >= attributeValue;
                break;
            case "greater":
                compare = filterValue > attributeValue;
                break;
           }
        if (compare) {
               return 1; //True
           }
    }
    return 0; //false
}

//is evaluating the filter () and creates the list of filteredCoffees
//CREATES ME A LIST OF MATCHED COFFEES
function doFilter() {
    //Initialize empty array of filtered coffees
    var filteredCoffees=[];
    //Get Input values from HTML
    var price = document.getElementById("priceInput").value; //value = give me what is inside of priceInput
    var typeContainer = document.getElementById("typeInput"); //the whole dropdown
    var type = typeContainer.options[typeContainer.selectedIndex].value; //to get the exact option the user chose

    //Iterate through all existing coffee objects
    for(var x=0;x<coffees.length;x++) {
        //Create an empty array of filters
        //you need the filters for each coffee, that's why it's in the for loop
        var filters = [];

        //Add filters (add all input fields)
        filters.push(filter("number","greaterequals",coffees[x].price,price)); //Price
        filters.push(filter("text","equals",coffees[x].type,type)); //Type
        //each of the filter function returns either 0, 1 or 2 (see filter function)
        /*
        0 = filter doesn't match
        1 = filter matches
        2 = no filter because of default input ("Select...") and empty price
         */

        for (var a = 0; a < filters.length; a++) {

            if (filters[a] >= 1) { //for 1 and 2
                //For use case: "Locfe has only one filter"
                //in case we have only one filter, it doesn't have to iterate through the loop and can skip the rest of the loop
                if (filters.length === 1) {
                    //only one, let's add it directly
                    filteredCoffees.push(coffees[x]);
                    break;
                }
                //For use case: "Locfe has more than one filter"
                else {
                    //counts how many 0s there are
                    var zeroCounter = 0;
                    //Let's look at the other filter results
                    //We're looking if there are no "0" results in my filters array
                    for(var b=0;b<filters.length;b++) {
                        if (filters[b] === 0) zeroCounter++;
                    }

                    //add only, if other filters are empty, but are not "wrong"/contradicting
                    if (zeroCounter === 0) {
                        filteredCoffees.push(coffees[x]);
                        break;
                    }

                }
            }
        }
    }
    //Call display function
    showCoffees(filteredCoffees); 
}

/*
This builds a table based on given array of coffees. No filtering here.
*/

function showCoffees(filteredCoffees) {
    //Get div container
        var container = document.getElementById('resultsTable');
        container.innerHTML = '';
    //Check if fC = 0, display message
        if(filteredCoffees.length==0) {
            container.innerHTML = '<p>No matching coffees :( Try again!</p>';
            return;
        }
    //Create panels fe o in fC
        for(var x=0;x<filteredCoffees.length;x++) {
            var row = document.createElement("ROW");
            var pContainer = document.createElement("DIV");
            pContainer.className = "col-md-8";
            var panel = document.createElement("DIV");
            panel.className = "panel panel-success";
            panel.style.borderColor = "var(--green-faded)";

            //Header
            var panelHead = document.createElement("DIV");
            panelHead.className = 'panel-heading';
            panelHead.innerHTML = filteredCoffees[x].type;
            panelHead.style.backgroundColor = "var(--green-faded)";
            panelHead.style.color = "white";
            panelHead.style.borderColor = "var(--green-faded)";
            //Body
            var panelBody = document.createElement("DIV");
            panelBody.className = 'panel-body';


            //Build row
            var panelBodyRow = document.createElement("DIV");
            panelBodyRow.className = "row";

            //Build price column
            var panelBodyRowPrice = document.createElement("DIV");
            panelBodyRowPrice.className = "col-md-6";
            panelBodyRowPrice.innerHTML = filteredCoffees[x].price + " DKK";

            //Build store column
            var panelBodyRowStore = document.createElement("DIV");
            panelBodyRowStore.className = "col-md-6";
            panelBodyRowStore.innerHTML= filteredCoffees[x].store.name;


            //Append
            row.appendChild(pContainer);
            pContainer.appendChild(panel);
            panel.appendChild(panelHead);
            var aCof = document.createElement("A");
            var bInfo = document.createElement("BUTTON");
            panelHead.appendChild(aCof);
            aCof.appendChild(bInfo);
            panel.appendChild(panelBody);
            panelBody.appendChild(panelBodyRow);
            panelBodyRow.appendChild(panelBodyRowPrice);
            panelBodyRow.appendChild(panelBodyRowStore);

            /*
            POPUP
            */
            //var coffeeIndex = filteredCoffees[x].id;
            var j = findCoffee(filteredCoffees[x], coffees);
            bInfo.innerHTML = "Info";
            bInfo.setAttribute("class", "btn");

            aCof.setAttribute("data-toggle", "modal");
            //ADD CUSTOMIZED CONTENT REGARDING STORES
            //PROBLEM: the ID is overwritten so that it only works with the last item
            //I guess I need a loop
            document.querySelector(".modal").setAttribute("id", j);

            aCof.setAttribute("data-target", "#" + j);
            var title = document.getElementById("popUpTitle");
            var body = document.getElementById("popUpBody");
            title.innerHTML = filteredCoffees[x].store.name;
            //body.innerHTML = coffees[ci].store.picture;
            body.innerHTML = filteredCoffees[x].store.homepage;
            //modalContent(j);
            //Button style
            bInfo.style.cssFloat = "right";
            bInfo.style.padding = "0.2% 5% 0.2% 5%";
            bInfo.style.textDecoration = "none";
            bInfo.style.color = "var(--green)";


            var fContainer = document.createElement("DIV");
            fContainer.className = "col-md-4";
            //var toolTip = document.createElement("DIV");
            //toolTip.setAttribute("class", "tooltip");
            var aFav = document.createElement("A");
            fContainer.appendChild(aFav);
            //toolTip.appendChild(aFav);
            row.appendChild(fContainer);
            container.appendChild(row);
            var b = document.createElement("BUTTON");
            aFav.appendChild(b);
            //var toolTipText = document.createElement("SPAN");
            //toolTip.appendChild(toolTipText);
            //toolTipText.setAttribute("class", "tooltiptext");
            //FAVORITES

            if (currentUser) {
                var isFavorite = checkIfFavorite(filteredCoffees[x]);

                if (isFavorite === true) {
                    aFav.setAttribute('onclick', 'removeFavorite(' + j + ')');
                    aFav.innerHTML = "<i class='fas fa-star'></i>";
                }
                else {
                    aFav.setAttribute('onclick', 'addFavorite(' + j + ')');
                    aFav.innerHTML = "<i class='far fa-star'></i>";
                    aFav.style.color = "var(--brown-faded)";
                }
            }
            else {
                //alert("here me now");
                //add a hypertext reference (href) to anchor around favorite buttons
                //redirection to login page when no user is logged in
                aFav.setAttribute("href", "login.html");
                b.setAttribute("class", "btn");
                b.style.backgroundColor = "var(--green-faded)";
                b.style.color = "white";
                //b.setAttribute("onclick", "redirect()");
                b.innerHTML = 'No Login, No Favorite  <i class="far fa-hand-point-up"></i>';
            }


        }
    //Append
        
    //return
} 

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

        //"Hardcoded", should be smarter/more generic here, but need for a decision on how to iterate through data types in coffees[] (see above)
        var cell1 = row.insertCell(-1);
        cell1.innerHTML = filteredCoffees[i].type;
        var cell2 = row.insertCell(-1);
        cell2.innerHTML = filteredCoffees[i].price;
        var cell3 = row.insertCell(-1);
        cell3.innerHTML = filteredCoffees[i].store.name;
        var cell4 = row.insertCell(-1);
        //b.onclick = function() {addFavorite(currentUser.username, coffees[j].type)};

        //create an anchor around the favorite button for login redirection in case user is not logged in
        var aFav = document.createElement("A");
        // anchor is child of td
        cell4.appendChild(aFav);
        // button is child of anchor
        aFav.appendChild(b);

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
            //add a hypertext reference (href) to anchor around favorite buttons
            //redirection to login page when no user is logged in
            aFav.setAttribute("href", "login.html");
            //b.setAttribute("onclick", "redirect()");
            b.innerHTML = 'Login first';
        }
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
    showCoffees(currentUser.favorites);
}
