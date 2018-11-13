/*
Global Arrays
*/
var coffees = [];
var stores = [];
var favorites = [];
var users = [];

/*
ADD FUNCTIONS
*/

function addCoffee(store, type, price) {
    var coffee = new Coffee(store, type, price);
    coffees.push(coffee);
}

function addUser(name, username, email, password, favorites) {
    var user = new User(name, username, email, password, favorites);
    users.push(user);
}

/* ci = coffeeIndex */
function addFavorite(ci) {
    currentUser.favorites.push(coffees[ci]);
    saveUser(currentUser);
    location.reload();
    alert('Coffee has been added');
}

function removeFavorite(coffee) {
    //find coffee to be deleted in user's favorite
    var deleteIndex = findCoffee(coffee, currentUser.favorites);
    //Remove from favorites
    currentUser.favorites.splice(deleteIndex);
    //Store user
    saveUser(currentUser);
    alert('has been removed');
    location.reload();
}

function addStore(name, homepage, picture) {
    var store = new Store(name, homepage, picture);
    stores.push(store);
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
    return favorites;
}

function getStores() {
    return stores;
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

//var userfavcounter = currentUser.favorites.length;
var x = document.getElementById("favCounter").innerHTML = '(' + currentUser.favorites.length + ')';