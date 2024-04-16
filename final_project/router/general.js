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

function getAllBooks() {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
}

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  getAllBooks().then((books) => res.status(200).send(books));
});

function getBookByISBN (isbn) {
    return new Promise((resolve, reject) => {
        let ISBN = parseInt(isbn);
        if (books[ISBN]) {
            resolve(books[ISBN]);
        } else {
            reject({status:404,message:"Book not found!"});
        }
    })
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    getBookByISBN(req.params.isbn).then(result=> res.send(result),error=>res.status(error.status).send(error.message));
});
  

function searchBookByAuthor (author) {
    return new Promise((resolve,reject) => {
        const key = Object.keys(books);
        let book = [];
        for (let i=0; i<key.length; i++) {
            if (books[key[i]].author === author) {book.push(books[key[i]]);}
        }
        if (book.length>0) {
            resolve(book)
        } else {
            reject({status:404,message:"book by that author not found!"})
        }
    });
}

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    searchBookByAuthor(req.params.author).then(result=>res.send(result),error=>res.status(error.status).send(error.message));
});

function searchBookByTitle(title) {
    return new Promise((resolve,reject) => {
        const key = Object.keys(books);
        let book = [];
        for (let i=0; i<key.length; i++) {
            if (books[key[i]].title === title) {book.push(books[key[i]]);}
        }
        if (book.length>0) {
            resolve(book);
        } else {
            reject({status:404,message:"Book by that title not found!"});
        }
    });
}

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    searchBookByTitle(req.params.title).then(result => res.send(result), error => res.status(error.status).send(error.message));
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
