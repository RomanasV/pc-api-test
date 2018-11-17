var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", ".ejs");

var posts;
var users;
var comments;
var albums;

request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
    if(!error && response.statusCode == 200) {
        posts = JSON.parse(body); //string to object
    }
});


request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
    if(!error && response.statusCode == 200) {
        users = JSON.parse(body); //string to object
    }
});

request('https://jsonplaceholder.typicode.com/comments', function (error, response, body) {
    if(!error && response.statusCode == 200) {
        comments = JSON.parse(body); //string to object
    }
});

request('https://jsonplaceholder.typicode.com/albums', function (error, response, body) {
    if(!error && response.statusCode == 200) {
        albums = JSON.parse(body); //string to object
    }
});


app.get("/", function(req, res) {
    res.redirect("/posts");
});

app.get("/posts", function(req, res) {
    res.render("index", {posts: posts, users: users, comments: comments});
});

app.post("/posts", function(req, res) {
    var title = req.body.title;
    var body = req.body.body;
    var userId = req.body.userId;
    // get last index of object array
    var lastIndex = posts.length - 1;
    // get the id of last object
    var lastId = posts[lastIndex].id;
    console.log("last id " + posts[lastIndex].id);
    // set the id for new object
    var newLastId = lastId + 1;
    var newPost = {title: title, body: body, userId: userId, id: newLastId};
    posts.push(newPost);
    res.redirect("/posts/" + newLastId);
});

app.get("/posts/new", function(req, res) {
    res.render("new-post", {users: users});
});

app.get("/posts/:id", function(req, res) {
    var postId = req.params.id;
    posts.forEach(function(post){
        if (postId == post.id) {
            res.render("show", {post: post, users: users, comments: comments});
        }
    });
});

app.get("/users", function(req, res) {
    res.render("users", {posts: posts, users: users, comments: comments, albums: albums});
});

app.post("/users", function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var street = req.body.street;
    var suite = req.body.suite;
    var city = req.body.city;
    var zipcode = req.body.zipcode;
    var phone = req.body.phone;
    var website = req.body.website;
    // get last index of object array
    var lastIndex = users.length - 1;
    // get the id of last object
    var lastId = users[lastIndex].id;
    console.log("last id " + posts[lastIndex].id);
    // set the id for new object
    var newLastId = lastId + 1;
    var newUser = {
        name: name,
        username: username,
        email: email,
        id: newLastId,
        address: {
            street: street,
            suite: suite,
            city: city,
            zipcode: zipcode
        },
        phone: phone,
        website: website
    };
    users.push(newUser);
    res.redirect("/users/" + newLastId);
});

app.get("/users/new", function(req, res) {
    res.render("new-user");
});

app.get("/users/:id", function(req, res) {
    var userId = req.params.id;
    users.forEach(function(user){
        if (userId == user.id) {
            res.render("show-user", {posts: posts, user: user, comments: comments, albums: albums});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!");
});