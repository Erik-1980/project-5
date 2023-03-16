const db = require('./db');

class Product {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    save() { 
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO products (name, price, image) VALUES (?, ?, ?)', [this.name, this.price, this.image], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    static findAllProduct() { 
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', function (err, rows) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM products WHERE id = ?', [id], function (err, row) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static updateById(id, name, price, image) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?', [name, price, image, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve();
                }
            });
        });
    }

    static deleteById(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Product;