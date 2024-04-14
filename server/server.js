import Database from "better-sqlite3";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const db = new Database("database.db");

app.get("/", function (request, response) {
  response.json("This is the root route.");
});

app.get("/guestbook", function (request, response) {
  const guestbook = db.prepare("SELECT * FROM guestbook").all();
  response.json(guestbook);
  console.log("messages sent");
});

app.post("/messageadd", function (request, response) {
  const { name, message } = request.body;
  const insertStatement = db.prepare(
    "INSERT INTO guestbook (name, message) VALUES (?, ?)"
  );
  insertStatement.run(name, message);
  response.json("success");
});

app.delete("/message/:id", function (request, response) {
  const messageId = request.params.id;
  const deleteStatement = db.prepare("DELETE FROM guestbook WHERE id = ?");
  deleteStatement.run(messageId);
  response.json("deleted");
});

//app.like("/message/:id", function (request, response) {
//  const messageId = request.params.id;
//  const likes = 0;
//  function addlike() {
//    likes + 1;
//  }
//  addlike();
//  response.json("Liked!");
//});

app.listen(1937, function () {
  console.log("Server is running on port 1937");
});
