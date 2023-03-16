const db = require('./db');

class Cart {
    constructor(userId, productId, quantity = 1) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    save() {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO carts (userId, productId, quantity) VALUES (?, ?, ?)', [this.userId, this.productId, this.quantity], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    };

    static findAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM carts WHERE userId = ?', [userId], function (err, rows) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    static findByUserIdAndProductId(userId, productId) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM carts WHERE userId = ? AND productId = ?', [userId, productId], function (err, row) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }
            });
        });
    };

    static updateQuantity(userId, productId, quantity) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE carts SET quantity = ? WHERE userId = ? AND productId = ?', [quantity, userId, productId], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve();
                }
            });
        });
    };

    

    static deleteByUserIdAndProductId(userId, productId) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM carts WHERE userId = ? AND productId = ?', [userId, productId], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve();
                }
            });
        });
    }

    static deleteAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM carts WHERE userId = ?', [userId], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Cart;