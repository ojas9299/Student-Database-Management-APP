const express = require("express");
const app = express();
const path = require("path");
const methodoverride = require("method-override");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodoverride("_method"));
// <----Dependencies---->

const database = require("./database.js");
let posts = database.posts;

app.get("/LP", (req, res) => {
  res.render("landpg");
});

app.get("/LP/main", (req, res) => {
  res.render("main", { posts });
});

app.get("/LP/form", (req, res) => {
  res.render("form");
});

app.get("/LP/main/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/LP/main/:id/update", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("update.ejs", { post, posts });
});

app.patch("/LP/main/:id", (req, res) => {
  let { id } = req.params;
  let newname = req.body.name;
  let newrollno = req.body.rollno;
  let newplace = req.body.place;
  let post = posts.find((p) => id === p.id);
  post.name = newname;
  post.place = newplace;
  post.rollno = newrollno;
  res.redirect("/LP/main");
});

app.post("/LP/main/create", (req, res) => {
  let { name, rollno, place } = req.body;
  posts.push({ name, rollno, place });
  console.log(posts);
  res.render("main", { posts });
});

app.post("/LP/main", (req, res) => {
  let { email, password } = req.body;
  res.render("main", { posts });
  console.log(posts);
});

app.get("/LP/main/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("details.ejs", { post, posts });
});

app.get("/LP/error404", (req, res) => {
  res.render("error404");
});

app.delete("/LP/main/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/LP/main");
});

app.listen(port, () =>
  console.log(`✅✅Example app listening on port ${port}!`)
);
