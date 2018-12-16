/*
Global Arrays
*/
var coffees = [];
var stores = [];
var favorites = JSON.parse(localStorage.getItem("favorites"));
var users = [];

/*
Initial check of favorites (dataType correct, else correct it)
*/
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

    //Is favorites set? 
    if(favorites) {
        var favorite = new Favorite(currentUser.id, coffeeID);
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    else {
        favorites = [];
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
    //var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites || !getCurrentUser() ) {
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
    //var favorites = JSON.parse(localStorage.getItem("favorites"));
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

/**
 * Popup/Modal for the filter
 */
$('#coffeeModal').on('show.bs.modal', function (event) {
    //Trigger Button
    var button = $(event.relatedTarget);
    //Identify coffee | Try/Catch to prevent false coffee ids (might have been removed or sth else)
    try{
        var coffeeID = button.data('cid');
        var coffee = null;
        getCoffees().forEach(function(c) {
            if(c.id===coffeeID) {
                coffee = c;
            }
        });
    }
    catch (e) {
    }
    //Fill the modal 
    var modal = $(this);
    modal.find('.modal-title').text(coffee.store.name)
    modal.find('.modal-body #storeDescription').html('<h6>Check out where to find your favorite coffee:</h6>');
    modal.find('.modal-body #storeIMG').html("<img class='storeIMG' src=" + coffee.store.picture + " width='150px' height='auto' />");
    modal.find('.modal-footer #homepageRef').html("<a type='button' class='btn btn-default' target='_blank' style='float: left' href='" + coffee.store.homepage + "'><i class='fa fa-eye' style='color: hotpink'></i> Visit Homepage</a>");
  })

