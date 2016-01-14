'use strict';

const User = require("./User");
var user = new User();

user.onSaved((user) => console.log("saved: " + user.name ));

user.onErase((error, id) => {
    if (error) {
        console.log("error on erase: " + error);
    } else {
        console.log("erased: " + id);
    }
});

user.save({ name: "Jane Doe", occupation: "manager" });
user.save({ name: "John Jacob", occupation: "developer" });

user.all();

user.erase(5);
user.erase(20);

user.all();
