class Coffee {
    constructor(id,store, type, price) {
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
    constructor(user, coffee) {
        this.user=user;
        this.coffee=coffee;
    }
}

class User {
    constructor(name, username, email, password) {
        this.name=name;
        this.username=username;
        this.email=email;
        this.password=password;
    }
}