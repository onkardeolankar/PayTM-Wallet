const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const saltRounds = 10;
const secretKey = 'fdsjJLkjKNKkjn.KJN'


let hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

let hashCompare = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}


module.exports ={
    JWT_KEY : "my-key", hashPassword, hashCompare
}