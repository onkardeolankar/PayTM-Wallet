const mongodb = require('mongodb')
const dbName = 'PayTM-Wallet'
const dbUrl = `mongodb+srv://Onkar:F5Z6B0KarUxuqzhJ@cluster0.roxwh.mongodb.net/${dbName}?retryWrites=true&w=majority`

module.exports = {mongodb,dbName,dbUrl}