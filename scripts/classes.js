class Coffee {
    constructor(store, type, price) {
        this.store = store;
        this.type = type;
        this.price = price;
    }
}

class Store {
    constructor(name, homepage, picture) {
        this.name=name;
        this.homepage=homepage;
        this.picture=picture;
    }
}

class Favorite {
    constructor(user, coffee) {
        this.user=user;
        this.coffee=coffee;
    }
}

class User {
    constructor(name, username, email, password, favorites) {
        this.name = name;
        this.username = username;
        this.mael = email;
        this.password = password;
        this.favorites = favorites;
    }
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}
var currentUser = getCurrentUser();

/*
Saves/overrides current local storage
*/
function saveUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

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

function addCoffee(store,type,price) {
    var coffee = new Coffee(store,type,price);
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
    alert('has been added');
}
function removeFavorite(coffee) {
    //find coffee to be deleted in user's favorite
    var deleteIndex = findCoffee(coffee,currentUser.favorites);
    //Remove from favorites
    currentUser.favorites.splice(deleteIndex);
    //Store user
    saveUser(currentUser);
    alert('has been removed');
    location.reload();
}
function addStore(name,homepage,picture) {
    var store = new Store(name,homepage,picture);
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

//var userfavcounter = currentUser.favorites.length;
var x = document.getElementById("favCounter").innerHTML = '('+currentUser.favorites.length+')';