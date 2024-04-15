const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    const registered_user = [];
    for (let i=0;i<users.length;i++) {registered_user.push(users[i].username);}
    idx = registered_user.indexOf(username)
    if (idx === -1) {return false;} else {return true;}
}

const authenticatedUser = (username,password)=>{ 
    const registered_user = [];
    for (let i=0;i<users.length;i++) {registered_user.push(users[i].username);}
    idx = registered_user.indexOf(username)
    if (!isValid(username)) {return false;}
    if (users[idx].password===password) {return true;} else {return false;}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const user = {username: req.query.username,password: req.query.password};
    if (!authenticatedUser(user.username,user.password)) {
        return res.status(404).json({message:"Unauthorized User!"})
    }
    let accessToken = jwt.sign({
        data:user
    },'access',{expiresIn:60*60});
    req.session.authorization = {accessToken};
    req.user = user;
    return res.status(200).send("User Logged in!")
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const comment = req.query.comment;
    const username = req.user.data.username;
    if (isbn>0&&isbn<=Object.keys(books)) {
        reviews = books[isbn].reviews;
        reviews[username] = comment;
        return res.status(200).json("Review Added thanks for your input!");
    } else {
        return res.status(404).send("Corrosponding book not found!");
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.data.username;
    if (isbn>0&&isbn<=Object.keys(books)) {
        delete books[isbn].reviews[username];
        return res.status(200).send("Review Deleted!")
    } else {
        return res.status(404).send("User or ISBN not found!");
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
