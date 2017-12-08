/**
 * User Model
 */

var db = require('../db')

exports.create = function(name, done) {
  var values = [name]

  db.query('INSERT INTO users (name) VALUES(?)', name, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.query('SELECT * FROM users', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.getByName = function(name, done) {
  db.query('SELECT * FROM users WHERE name = ?', name, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
