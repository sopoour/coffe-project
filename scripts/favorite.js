// Checking favorites to ensure that the coffee is within favorites and the user is the one using the system

function checkFavorites(favorites, coffee) {
    var currentUser = getCurrentUser();
    if (favorites.length < 1) {
        return false
    }
    for (var i = 0; i < favorites.length; i++) {
        if ((favorites[i].coffee === coffee) && (currentUser === true)) {
            return true
        }
        else return false
    }
}
function displayFavorites() {
    return document.getElementById("displayFavorites").innerHTML = favorites;
}
// 3. Favorite choice is removed from favorite page

// If coffee is in favorites, remove (if not, don't)


/*function removeFavorite(favorites) {

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
} */
