var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", ".ejs");

var posts;
var users;
var comments;

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


app.get("/", function(req, res) {
    res.redirect("/posts");
});

app.get("/posts", function(req, res) {
    res.render("index", {posts: posts, users: users});
});

app.post("/posts", function(req, res) {
    var title = req.body.title;
    var body = req.body.body;
    var userId = req.body.userId;
    console.log("user id is: " + userId);
    // get last index of object array
    var lastIndex = posts.length - 1;
    console.log("Last index " + lastIndex);
    // get the id of last object
    var lastId = posts[lastIndex].id;
    console.log("last id " + posts[lastIndex].id);
    // set the id for new object
    var newLastId = lastId + 1;
    console.log("New last id " + newLastId);
    var newPost = {title: title, body: body, userId: userId, id: newLastId};
    posts.push(newPost);
    res.redirect("/posts/" + newLastId);
});

app.get("/posts/new", function(req, res) {
    res.render("new-post", {users: users});
});

app.get("/posts/:id", function(req, res) {
    var postId = req.params.id;
    console.log(comments);
    posts.forEach(function(post){
        if (postId == post.id) {
            res.render("show", {post: post, users: users, comments: comments});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!");
});