const database = require('better-sqlite3')

const db = new database('exp.db')

if(db) console.log("db connected!")
db.exec(`
     CREATE TABLE IF NOT EXISTS users(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     city TEXT NOT NULL
     )`
)
const saveUser = (name,city)=>{
     const stmt = db.prepare(`INSERT INTO users(name,city) VALUES(?,?)`)
     const info = stmt.run(name,city);
     console.log(`data saved in user Table: ${info.lastInsertRowid}`);
}

const getUser = ()=>{
     const stmt = db.prepare(`SELECT * FROM users where name LIKE 'p%'`)
     const info = stmt.all()
     console.log(`Show all records from user Table`,JSON.stringify(info,null,2));
}

saveUser("Atesh","Indore")
saveUser("Piyush","TKG")
getUser();