class Coffee {
    constructor(id, store, type, price) {
        this.id=id;
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
    constructor(userID, coffeeID) {
        this.userID=userID;
        this.coffeeID=coffeeID;
    }
}

class User {
    constructor(id,name, username, email, password, favorites) {
        this.id=id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.favorites = favorites;
    }
}
