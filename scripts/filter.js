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

//DOES THE ACTUAL MATCHING PROCESS
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
        //to show all coffees when filterValue is empty
        if (filterValue === "x") {
            return 2;
        }
        //to have no match when typing in 0

        //!! We figured we don't need it, because we allow "free" coffees. Initially we used this to escape from empty or invalid (string) inputs, but we decided to do this with "x"
        /*if (filterValue < 0) {
            return 0; //No Input
        } */

        //compare = True/False (True if filterValue ==attributeValue, False if not)
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
               return 1;
           }
           return 0;
    }
    
}
//CREATES ME A LIST OF MATCHED COFFEES
function doFilter() {
    //Initialize empty array of filtered coffees
    var filteredCoffees=[];
    //Get Input values from HTML
    var price = parseInt(document.getElementById("priceInput").value); //turn price into an actual integer
    var type = document.getElementById("typeInput").value;
    /*var typeContainer = document.getElementById("typeInput"); //the whole dropdown
    var type = typeContainer.options[typeContainer.selectedIndex].value;//to get the exact option the user chose */
    var storeName = document.getElementById("storeInput").value;
    /*var storenameContainer = document.getElementById("storeInput"); //the whole dropdown
    var storeName = storenameContainer.options[storenameContainer.selectedIndex].value;//to get the exact option the user chose*/
    /**
     * When no price is set as input, NaN is passed when converting the number.
     * So if NaN is set, set price to string x to filter to
     * Since you can't type in a string in price input this is gonna have no match
     */
    if(isNaN(price)) {
        price = "x";
    }
    //Iterate through all existing coffee objects
    for(var x=0;x<coffees.length;x++) {
        //Create an empty array of filters
        //you need the filters for each coffee, that's why it's in the for loop
        var filters = [];
        //Add filters (add all input fields)
        filters.push(filter("number","greaterequals",coffees[x].price,price)); //Price
        filters.push(filter("text","equals",coffees[x].type,type)); //Type
        filters.push(filter("text","equals",coffees[x].store.name,storeName));
        //each of the filter function returns either 0, 1 or 2 (see filter function)
        var zeroCounter = 0;
        for (var a = 0; a < filters.length; a++) {
            if(filters[a]==0) {
                zeroCounter++;
            }
            /*if (filters[a] >= 1) { //for 1 and 2
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
            }*/        
        }
        if(zeroCounter==0) {
            filteredCoffees.push(coffees[x]);
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
    //Check if filteredCoffees = 0, display message
    if (filteredCoffees.length === 0) {
        container.innerHTML = '<h6>No matching coffees :( Try again!</h6>';
            return;
        }
    //Create panels
        for(var x=0;x<filteredCoffees.length;x++) {
            var row = createPanel(filteredCoffees[x]);
            container.appendChild(row);
        }
} 

/*
checkIfFavorite
Checks if a coffee object is already listed as current user's favorite.
Compares all favorites to var coffee (function called for every row = every filter result coffee)
INPUT: coffee OBJECT (not id!)
@return true/false
*/
function checkIfFavorite(coffee) {
    //Get Favorites
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    //No Favorites yet?
    if(!favorites) {
        return false;
    }
    //Is coffee in there? Coffee ID must match and User ID must match current User
    for(var x=0;x<favorites.length;x++) {
        if (favorites[x].coffeeID === coffee.id && favorites[x].userID === getCurrentUser().id) {
            return true;
        }
    }
    return false;
}

function showFavorites() {
    var favorites = getFavorites();
    //showCoffees function needs an array of coffee as input, right now favorites is only an array of ids
    //Solution: match coffeeID in favorites with ids in coffees
    var favoritesArray = [];
    //since getFavorites is only an array of ids, I now have to create a new array which pushes me all the
    // coffees whose ID is in favorites
    for (var x = 0; x < favorites.length; x++) {
        for (var y = 0; y < coffees.length; y++) {
            //match the coffeeID with the id inside of all coffees
            if (favorites[x].coffeeID === coffees[y].id) {
                //in case there is a match add this coffee to my favoritesArray
                favoritesArray.push(coffees[y]);
            }
        }
    }
    //display my favorites list
    showCoffees(favoritesArray);
}

//FAVORITE COUNTER AT FAVORITE BUTTON
var x = document.getElementById("favCounter").innerHTML = '(' + getFavorites().length + ')';

function createPanel(coffee) {
    var row = document.createElement("ROW");
    //give each filteredCoffee row the fcID --> used for Modal
    row.setAttribute("id", coffee.id);
    var pContainer = document.createElement("DIV");
    pContainer.className = "col-md-8";
    var panel = document.createElement("DIV");
    panel.className = "panel panel-success";
    panel.style.borderColor = "var(--green-faded)";

    //Header
    var panelHead = document.createElement("DIV");
    panelHead.className = 'panel-heading';
    //Write Coffee Type
    panelHead.innerHTML = coffee.type;
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
    //Write Coffee PRice
    panelBodyRowPrice.innerHTML = coffee.price + " DKK";

    //Build store column
    var panelBodyRowStore = document.createElement("DIV");
    panelBodyRowStore.className = "col-md-6";
    panelBodyRowStore.innerHTML= coffee.store.name;

    //Append
    row.appendChild(pContainer);
    pContainer.appendChild(panel);
    panel.appendChild(panelHead);

    panel.appendChild(panelBody);
    panelBody.appendChild(panelBodyRow);
    panelBodyRow.appendChild(panelBodyRowPrice);
    panelBodyRow.appendChild(panelBodyRowStore);

    /*
    POPUP (MODAL)
     */

    //New button
    var bInfo = document.createElement("BUTTON");
    bInfo.innerHTML = "Info";
    bInfo.setAttribute("type", "button");
    bInfo.setAttribute("class", "btn btnInfo");
    bInfo.setAttribute("data-toggle", "modal");
    bInfo.setAttribute("data-target", "#coffeeModal");
    bInfo.setAttribute("data-cid", coffee.id);
    bInfo.style.cssFloat = "right";
    bInfo.style.padding = "0.2% 5% 0.2% 5%";
    bInfo.style.textDecoration = "none";
    bInfo.style.color = "var(--green)";
    panelHead.appendChild(bInfo);
    
    /*
    FAVORITES
     */
    //FAVORITE BUTTON
    var fContainer = document.createElement("DIV");
    fContainer.className = "col-md-4";
    var aFav = document.createElement("A");
    aFav.setAttribute("type", "button");
    aFav.setAttribute("class", "btn");
    fContainer.appendChild(aFav);
    row.appendChild(fContainer);
    
    

    //FAVORITES
    if (currentUser) {
        var isFavorite = checkIfFavorite(coffee);
        if (isFavorite) {
            aFav.setAttribute('onclick', 'removeFavorite(' + coffee.id + ')');
            aFav.innerHTML = "<i class='fas fa-star' style='color: white'></i>";
            aFav.setAttribute("class", "btn btn-circle");
            aFav.style.backgroundColor = "hotpink";
        }
        else {
            aFav.setAttribute('onclick', 'addFavorite(' + coffee.id + ')');
            aFav.innerHTML = "<i style='color: hotpink' class='far fa-star'></i>";
            aFav.setAttribute("class", "btn btn-circle");
            aFav.style.borderColor = "hotpink";
        }
    }
    else {
        //redirection to login page when no user is logged in
        aFav.setAttribute("href", "login.html");
        aFav.style.backgroundColor = "var(--green-faded)";
        aFav.style.color = "white";
        aFav.innerHTML = 'No Login, No Favorite  <i class="far fa-hand-point-up"></i>';
    }

    return row;
}

