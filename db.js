const Database = require('better-sqlite3');

const db = new Database('example.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
    )
`);


const saveUser = (name, age, city) => {
    const stmt = db.prepare(`INSERT INTO users (name, age, city) VALUES (?, ?, ?)`);
    const info = stmt.run(name, age, city);
    console.log(`User added with ID: ${info.lastInsertRowid}`);
};

const getUsers = () => {
    const stmt = db.prepare(`SELECT * FROM users`);
    const users = stmt.all();
    console.log("Users in database:", users);
};


const deleteUser = (id) => {
    const stmt = db.prepare(`DELETE FROM users WHERE id = ?`);
    const info = stmt.run(id);
    console.log(`Deleted ${info.changes} user(s) with ID ${id}`);
};


saveUser("Alice", 25,"indore");
saveUser("Bob", 30, "TKG");

getUsers();

deleteUser(1); 

getUsers(); 
db.close();
