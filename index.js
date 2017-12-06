/**
 * Index
 */

const express = require('express')
const bodyParser  = require('body-parser')
const logger = require('morgan')
const path = require('path')
const methodOverride = require('method-override')
const { main, pet, user, user_pet } = require('./controllers')

const app = express()

// set our default template engine to "ejs"
// which prevents the need for using file extensions
app.set('view engine', 'ejs')

// log
if (!module.parent) app.use(logger('dev'))

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

// parse request bodies (req.body)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'))

// routes
app.get('/', main.index)

app.get('/users', user.list)
app.get('/user/:user_id', user.before, user.show)
app.put('/user/:user_id', user.before, user.update)
app.get('/user/:user_id/edit', user.before, user.edit)
app.post('/user/:user_id/pet', user_pet.create)

app.get('/pet/:pet_id', pet.before, pet.show)
app.put('/pet/:pet_id', pet.before, pet.update)
app.get('/pet/:pet_id/edit', pet.before, pet.edit)

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl })
})

if (!module.parent) {
  app.listen(3000)
  console.log('Express started on port 3000')
}
