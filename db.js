// mockup database

var pets = []

pets.push({ name: 'Tobi', id: 0 })
pets.push({ name: 'Loki', id: 1 })
pets.push({ name: 'Jane', id: 2 })
pets.push({ name: 'Raul', id: 3 })

var users = []

users.push({ name: 'TJ', pets: [pets[0], pets[1], pets[2]], id: 0  })
users.push({ name: 'Guillermo', pets: [pets[3]], id: 1 })
users.push({ name: 'Nathan', pets: [], id: 2 })


// fake mysql query
exports.query = function(p1, p2, p3) {
  if (typeof p3 == 'undefined')
    query_1(p1, p2)
  else
    query_2(p1, p2, p3)
}

query_1 = function(sql, done) {
  console.log(sql)
  if(sql === 'SELECT * FROM users')
    done(null, users)
}

query_2 = function(sql, values, done) {
  console.log(sql + ' with values (' + values + ')')
  switch (sql) {
    case 'SELECT * FROM users WHERE user_id = ?':
      [userId] = [values]
      done(null, users[userId])
      break
    case 'SELECT * FROM pets WHERE pet_id = ?':
      [petId] = [values]
      done(null, pets[petId])
      break
    case 'INSERT INTO users (name) VALUES(?)':
      [name] = [values]
      user = { name, pets: [], id: users.length }
      users.push(user)
      done(null, user)
      break
    case 'INSERT INTO pets (name, user_id) VALUES(?, ?)':
      [name, userId] = values
      pet = { name, id: pets.length }
      pets.push(pet)
      users[userId].pets.push(pet)
      break
    default:
      break
  }
}
