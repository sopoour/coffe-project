
// 1. Click on button --> Store favorite choice

//array where all favorites are stored
var favorites = [];

//specific coffee that is to be added or removed
//why is selectedCoffee an array?
var selectedCoffee = [];


// Add event listener to get coffee id from filter as selectedCoffee
function addFavorite() {

// If item not already in favorites (for loop), add to favorites array (new HTML page with array)
// 2.1. Add "This has been added to your favorite"
// 2.2. Display length of array & items of coffee
    var count = favorites.length;
    for (var i = 0; i < count; i++) {
        if (selectedCoffee [i] === favorites) {
            favorites.push(selectedCoffee);
            alert("You have chosen " + favorites.length + " favorite coffee(s)");
        }
    else
        alert("Hey there greedy! This has already been added to your favorites!")

    }
}

function displayFavorites() {
    return document.getElementById("displayFavorites").innerHTML = favorites;
}
// 3. Favorite choice is removed from favorite page

// If coffee is in favorites, remove (if not, don't)


function removeFavorite(favorites) {

    var count = favorites.length;
    for (var i = 0; i < count; i++) {
        if (selectedCoffee [i] === favorites)
        // Removing element by value https://www.hostingadvice.com/how-to/javascript-remove-element-array/
        {
            favorites.splice(favorites.indexOf('selectedCoffee.value'), 1);
            alert("You have removed " + selectedCoffee.value + " from your favorite coffees");
        }


        else
        alert("Uh Oh. It seems that this coffee wasn't part of your favorites.")
    }
}
