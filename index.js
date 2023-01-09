const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

mongoose.connect(
  "mongodb+srv://huzaifa:Mongo0900@cluster0.legimcc.mongodb.net/nodekb"
);
let db = mongoose.connection;

//check for db errors

db.once("open", function () {
  console.log("connected to mongodb");
});

db.on("error", function (err) {
  console.log(err);
});

let Article = require("./models/article");

//set view engine

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//body parser middle ware

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//Set Static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/article/:id", function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render("article", {
      article: article,
    });
  });
});

app.get("/article/edit/:id", function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render("edit_article", {
      title: "Edit Article",
      article: article,
    });
  });
});

app.get("/", function (req, res) {
  Article.find({}, function (err, articles) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "List Of Articles",
        articles: articles,
      });
    }
  });
});

app.get("/articles", function (req, res) {
  res.render("add_articles", {
    title: "Add New article",
  });
});

//add submit

app.post("/articles", function (req, res) {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      {
        res.redirect("/");
      }
    }
  });
});

app.delete("/article/:id", function (req, res) {
  let query = { _id: req.params.id };

  Article.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.send("Success");
  });
});

app.post("/articles/edit/:id", function (req, res) {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = { _id: req.params.id };
  Article.update(query, article, function (err) {
    if (err) {
      console.log(err);
    } else {
      {
        res.redirect("/");
      }
    }
  });
});

//start server
app.listen(port);
console.log("port running on port " + port);
