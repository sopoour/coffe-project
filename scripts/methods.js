/*
Global Arrays
*/
var coffees = [];
var stores = [];
var favorites = JSON.parse(localStorage.getItem("favorites"));
var users = [];
/*
ADD FUNCTIONS
*/
function addCoffee(id,store, type, price) {
    var coffee = new Coffee(id,store, type, price);
    coffees.push(coffee);
}

function addUser(id, name, username, email, password) {
    var user = new User(id, name, username, email, password);
    users.push(user);
}

function addStore(name, homepage, picture) {
    var store = new Store(name, homepage, picture);
    stores.push(store);
}

function addFavorite(coffeeID) {

    //Gibts schon Fav in ls?
    if(favorites) {
        var favorite = new Favorite(currentUser.id, coffeeID);
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    else {
        favorites = []; //Overrite
        var favorite = new Favorite(currentUser.id, coffeeID);
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
        //Yes?
            //neuen fav erzeugen
            //in bestehenden array schreiben (überschreiben)
        //No
            //neuen fav erzeugen
            //favorites initialisieren
            //in ls schreiben

    alert('Favorite is added successfully. Yey so happy.');
    location.reload();
}

/*
GET FUNCTIONS
*/
function getCoffees() {
    return coffees;
}

function getUsers() {
    return users;
}

function getFavorites() {
    var output = [];
    //Get Favorites from Local Storage
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
        return output;
    }
    for (var x = 0; x < favorites.length; x++) {
        if (favorites[x].userID === getCurrentUser().id) {
            output.push(favorites[x]);
        }
    }
    return output;
}

function getStores() {
    return stores;
}

/*
* REMOVE FUNCTIONS
*/

//INPUT: coffee object
function removeFavorite(coffeeID) {
    //Get favorites
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    //Find favorite with combination of current user & coffee (based on id)
    for(var x=0;x<favorites.length;x++) {
        if (favorites[x].coffeeID === coffeeID) {
            //Found it, delete it
            favorites.splice(x,1);
        }
    }
    //Push updated favorites to LS
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Removed the coffee from your favorites. Please keep me in mind, i am super delicious.");
    location.reload();
}

/*
CURRENT USER (LocalStorage)
*/
function saveUser(user) {
    //encrypt password in currentUser
    user.password = window.btoa(user.password);
    //save loggedIn user as currentUser in localStorage
    //since it is an object you need first stringify so that it actually shows everything in "value" what is inside of the object
    localStorage.setItem("currentUser", JSON.stringify(user));
}
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

var currentUser = getCurrentUser();


