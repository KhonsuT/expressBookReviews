const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;
    console.log(users);
    const registered_user = [];
    for (let i=0;i<users.length;i++) {registered_user.push(users[i].username);}
    if (registered_user.includes(username)) {
        res.status(300).json({message: "User already exist please login!"});
    } else if (!username && !password) {
        res.status(300).json({message: `Please enter valid username and password: ${username, password}`});
    } else {
        users.push({"username": username,"password":password});
        res.status(300).json({message:`New User added, Welcome ${username}!`});
    }
    return res;
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    if (isbn<=Object.keys(books).length && isbn > 0) {
        res.status(300).json(books[isbn]);
    }
    else {
        res.status(404).json({message:"Book not found, please enter a valid ISBN!"});
    }
    return res;
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const key = Object.keys(books);
    let book = [];
    for (let i=0; i<key.length; i++) {
        if (books[key[i]].author === req.params.author) {book.push(books[key[i]]);}
    }
    if (book.length>0) {
        res.status(300).json(book);
    } else {
        res.status(404).json({message: `No Books with author: ${req.params.author} found!`});
    }
    return res;
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const key = Object.keys(books);
    let book = [];
    for (let i=0; i<key.length; i++) {
        if (books[key[i]].title === req.params.title) {book.push(books[key[i]]);}
    }
    if (book.length>0) {
        res.status(300).json(book);
    } else {
        res.status(404).json({message: `No Books with title: {req.params.author} found!`});
    }
    return res;
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    if (isbn<=Object.keys(books).length && isbn > 0) {
        res.status(300).json(books[isbn].reviews);
    }
    else {
        res.status(404).json({message:"Book not found, please enter a valid ISBN!"});
    }
    return res;
});

module.exports.general = public_users;
