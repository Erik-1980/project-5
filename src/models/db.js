const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "database.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the database.');
        db.run(`CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            isAdmin INTEGER DEFAULT 0
        )`, (err) => {
            if (err) {
            } else {
            console.log('Created users table.');
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS products(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT NOT NULL
        )`, (err) => {
            if (err) {
            } else {
                console.log('Created products table.');
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS carts(
            id INTEGER PRIMARY KEY,
            userId INTEGER NOT NULL,
            productId INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY (productId) REFERENCES products(id)
        )`, (err) => {
            if (err) {
            } else {
                console.log('Created carts table.');
            }
        });
    }
});

module.exports = db;