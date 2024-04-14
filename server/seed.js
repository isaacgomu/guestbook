import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message INTEGER NOT NULL
)`);

const insertMessage = db.prepare(`
INSERT INTO guestbook (name, message) VALUES (?, ?)`);

insertMessage.run("Isaac", "Hello!");
insertMessage.run("Spongebob", "I'm Spongebob!");
insertMessage.run("Mango Genie", "weng image");
