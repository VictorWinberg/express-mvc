/**
 * User Pet Controller
 */

var db = require('../db')

exports.create = function(req, res, next){
  var body = req.body
  var pet = { name: body.pet.name }
  pet.id = db.pets.push(pet) - 1
  req.user.pets.push(pet)
  // res.message('Added pet ' + body.pet.name)
  res.redirect('/user/' + req.user.id)
}
