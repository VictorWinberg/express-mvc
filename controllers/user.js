/**
 * User Controller
 */

var { User } = require('../models')

exports.before = function(req, res, next){
  var id = req.params.user_id
  if (!id) return next()

  User.getById(id, function(err, user) {
    // cant find that user
    if (!user) return next('route')
    // found it, move on to the routes
    req.user = user
    next()
  })
}

exports.list = function(req, res, next){
  User.getAll(function(err, users) {
    res.render('user/list', { users })
  })
}

exports.edit = function(req, res, next){
  res.render('user/edit', { user: req.user })
}

exports.show = function(req, res, next){
  res.render('user/show', { user: req.user })
}

exports.create = function(req, res, next){
  var body = req.body
  User.create(body.user.name, function(err, userId) {
    // res.message('Created user ' + body.user.name)
    res.redirect('/user/' + userId)
  })
}

exports.update = function(req, res, next){
  var body = req.body
  req.user.name = body.user.name
  // res.message('Information updated!')
  res.redirect('/user/' + req.user.id)
}
