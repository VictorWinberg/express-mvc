/**
 * Pet Controller
 */

var { Pet } = require('../models')

exports.before = function(req, res, next){
  Pet.getById(req.params.pet_id, function(err, pet) {
    if (!pet) return next('route')
    req.pet = pet
    next()
  })
}

exports.show = function(req, res, next){
  res.render('pet/show', { pet: req.pet })
}

exports.edit = function(req, res, next){
  res.render('pet/edit', { pet: req.pet })
}

exports.update = function(req, res, next){
  var body = req.body
  req.pet.name = body.pet.name
  // res.message('Information updated!')
  res.redirect('/pet/' + req.pet.id)
}
