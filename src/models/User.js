const db = require('./db');

class User {
    constructor(username, password, isAdmin = false) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    save() {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', [this.username, this.password, this.isAdmin ? 1 : 0], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    };

    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }
            });
        });
    };

    static findAllUsers() {
        return new Promise((resolve, reject) => {
            db.all('SELECT id, username FROM users', function (err, rows) {
                if (err) {
                    reject(err.message);
                } else {
                    const users = rows.map(row => ({
                        id: row.id,
                        username: row.username,
                    }));
                    resolve(users);
                }
            });
        });
    };

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT id, username FROM users WHERE id = ?', [id], function (err, row) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }
            });
        });
    };

    static deleteById(id) {
        return new Promise((resolve, reject) => {
          db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
            if (err) {
              reject(err.message);
            } else {
              resolve(this.changes);
            }
          });
        });
      };

    static async adminStatus(id, isAdmin) {
        return new Promise((resolve, reject) => {
        db.run('UPDATE users SET isAdmin = ? WHERE id = ?', [isAdmin ? 1 : 0, id], function(err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(id);
            }
        });
    });
    };

}

module.exports = User;