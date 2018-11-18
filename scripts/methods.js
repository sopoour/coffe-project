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

function addCoffee(id,store, type, price) {
    var coffee = new Coffee(id,store, type, price);
    coffees.push(coffee);
}

function addUser(name, username, email, password, favorites) {
    var user = new User(name, username, email, password, favorites);
    users.push(user);
}

/**
 * returns coffee object based on given id.
 * returns null if no coffee object with given id exists.
 */
function findCoffee(id) {
    for(var x=0;x<coffees.length;x++) {
        if(coffees[x].id == id) {
            return coffees[x];
        }
    }
    return null;
}

/* ci = coffeeIndex */
function addFavorite(coffeeID) {
    /**Old Logic (favorites as user attribute)
     * currentUser.favorites.push(coffees[ci]);
    saveUser(currentUser);
    location.reload();
    alert('Coffee has been added');
    */
    //Get Favorites from LS
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    if(!favorites) {
        var favorites = [];
        var favorite = new Favorite(currentUser.id, coffeeID);
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    else {
        //Save Favorite
        //var id = findMaxId(favorites)+1;
        var favorite = new Favorite(currentUser.id, coffeeID);
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    alert('Favorite is added successfully. Yey so happy.');
    location.reload();
}

/**
 * 
 * INPUT: coffee object
 */
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
    /**
     * OLD CODE
     
    //find coffee to be deleted in user's favorite
    var deleteIndex = findCoffee(coffee, currentUser.favorites);
    //Remove from favorites
    currentUser.favorites.splice(deleteIndex);
    //Store user
    saveUser(currentUser);
    alert('Coffee has been removed');
    location.reload();
    */
}

function addStore(name, homepage, picture) {
    var store = new Store(name, homepage, picture);
    stores.push(store);
}

/*function findMaxId(objects) {
    if(objects.length===0) {
        return 0;
    }
    var currentMax=0;
    for (var x=0;x<objects.length;x++) {
        if(objects[x].id > currentMax) {
            currentMax = objects[x].id;
        }
    }
    return currentMax;
}
*/

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
    var favorites =  JSON.parse(localStorage.getItem("favorites"));
    if(!favorites) {
        return output;
    }
    for(var x=0;x<favorites.length;x++) {
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
var x = document.getElementById("favCounter").innerHTML = '(' + getFavorites().length + ')';
//var x = 0;
//POPUP

function modalContent(ci) {
    var title = document.getElementById("popUpTitle");
    var body = document.getElementById("popUpBody");
    title.innerHTML = coffees[ci].store.name;
    //body.innerHTML = coffees[ci].store.picture;
    body.innerHTML = coffees[ci].store.homepage;
}