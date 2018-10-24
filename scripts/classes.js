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
    constructor(name, username, email, password, loggedIn) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.loggedIn = loggedIn;
    }
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
function addUser(name,username,email,password,loggedIn) {
    var user = new User(name,username,email,password,loggedIn);
    users.push(user);
}
function addFavorite(user,coffee) {
    var favorite = new Favorite(user,coffee);
    favorites.push(favorite);
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