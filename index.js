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
const { v4: uuidv4 } = require("uuid");
uuidv4();
// <----Dependencies---->

const database = require("./database.js");
const { extractNameFromEmail } = require("./database.js");
let posts = database.posts;

app.get("/", (req, res) => {
  res.render("landpg");
});

app.get("/main", (req, res) => {
  res.render("main", { posts });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/main/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/main/:id/update", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("update.ejs", { post, posts });
});

app.patch("/main/:id", (req, res) => {
  let { id } = req.params;
  let newname = req.body.name;
  let newrollno = req.body.rollno;
  let newplace = req.body.place;
  let post = posts.find((p) => id === p.id);
  post.name = newname;
  post.place = newplace;
  post.rollno = newrollno;
  res.redirect("/main");
});

app.post("/main/create", (req, res) => {
  let { name, rollno, place } = req.body;
  let id = uuidv4();
  posts.push({ name, rollno, place, id });
  res.render("main", { posts });
});

app.post("/main", (req, res) => {
  res.render("main", { posts });
});

app.get("/main/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("details.ejs", { post, posts });
});

app.get("/error404", (req, res) => {
  res.render("error404");
});

app.delete("/main/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/main");
});

app.listen(port, () =>
  console.log(`✅✅Example app listening on port ${port}!`)
);
