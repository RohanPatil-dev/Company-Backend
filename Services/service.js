const jwt = require("jsonwebtoken")

const secret = "Rohan123504"

function setUser(user) {
   const payload = {
       _id : user.id,
       email : user.email,
       password : user.password
   }

   return jwt.sign(payload,secret)
}


module.exports = {setUser}
