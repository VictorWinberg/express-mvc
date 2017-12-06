/**
 * User Controller
 */

var db = require('../db')

exports.before = function(req, res, next){
  var id = req.params.user_id
  if (!id) return next()
  // pretend to query a database...
  process.nextTick(function(){
    req.user = db.users[id]
    // cant find that user
    if (!req.user) return next('route')
    // found it, move on to the routes
    next()
  })
}

exports.list = function(req, res, next){
  res.render('user/list', { users: db.users })
}

exports.edit = function(req, res, next){
  res.render('user/edit', { user: req.user })
}

exports.show = function(req, res, next){
  res.render('user/show', { user: req.user })
}

exports.update = function(req, res, next){
  var body = req.body
  req.user.name = body.user.name
  // res.message('Information updated!')
  res.redirect('/user/' + req.user.id)
}
