/**
 * User Model
 */

var db = require('../db')

exports.create = function(name, done) {
  var values = [name]

  db.query('INSERT INTO users (name) VALUES(?)', name, function(err, user) {
    if (err) return done(err)
    done(null, user)
  })
}

exports.update = function(name, userId, done) {
  var values = [name, userId]

  db.query('UPDATE users SET name = ? WHERE user_id = ?', values, function(err, user) {
    if(err) return done(err)
    done(null, user)
  })
}

exports.getAll = function(done) {
  db.query('SELECT * FROM users', function (err, users) {
    if (err) return done(err)
    done(null, users)
  })
}

exports.getById = function(userId, done) {
  db.query('SELECT * FROM users WHERE user_id = ?', userId, function (err, user) {
    if (err) return done(err)
    done(null, user)
  })
}
