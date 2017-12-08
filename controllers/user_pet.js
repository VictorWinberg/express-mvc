/**
 * User Pet Controller
 */

var { User, Pet } = require('../models')

exports.create = function(req, res, next){
  var body = req.body
  Pet.create(body.pet.name, req.user.id)
  // res.message('Added pet ' + body.pet.name)
  res.redirect('/user/' + req.user.id)
}
