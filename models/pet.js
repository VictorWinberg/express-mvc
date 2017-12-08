/**
 * Pet Model
 */

var db = require('../db')

exports.create = function(name, userId, done) {
  var values = [name, userId]

  db.query('INSERT INTO pets (name, user_id) VALUES(?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.query('SELECT * FROM pets', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.getAllByUser = function(userId, done) {
  db.query('SELECT * FROM pets WHERE user_id = ?', userId, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
