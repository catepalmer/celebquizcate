const path = require('path')
const fs = require('fs')

function readJSON(file, callback){
  readFile(file, data => {
    let obj = JSON.parse(data)
    callback(obj)
  })
}

function readFile (file, callback) {
  const filepath = path.join(__dirname, file)
  fs.readFile(filepath, 'utf-8', function(err, data) {
    if (err) throw err
    callback(data)
  })
}

module.exports = {
  readFile,
  readJSON
}