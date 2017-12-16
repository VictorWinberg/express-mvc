/**
 * Pet Model
 */

var db = require('../db')

exports.create = function(name, userId, done) {
  var values = [name, userId]

  db.query('INSERT INTO pets (name, user_id) VALUES(?, ?)', values, function(err, pet) {
    if(err) return done(err)
    done(null, pet.id)
  })
}

exports.update = function(name, petId, done) {
  var values = [name, petId]

  db.query('UPDATE pets SET name = ? WHERE pet_id = ?', values, function(err, pet) {
    if(err) return done(err)
    done(null, pet)
  })
}

exports.getById = function(petId, done) {
  db.query('SELECT * FROM pets WHERE pet_id = ?', petId, function (err, pet) {
    if (err) return done(err)
    done(null, pet)
  })
}
