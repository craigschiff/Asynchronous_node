const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

class Append {
  constructor(oldName, oldPath, newName, newPath, ext){
    this.oldName = oldName
    this.oldPath = oldPath
    this.newName = newName
    this.newPath = newPath
    this.ext = ext
  }
  appendFile() {
    if (this.ext == '.json'){
      return this.appendJson()
    } else if (this.ext == '.txt'){
      return this.appendText()
    }
  }
  appendJson(){
    return fs.readFileAsync(this.oldPath)
      .then((data) => {
        let fileData = JSON.parse(data)
        fileData['oldName'] = this.oldName
        fileData['oldPath'] = this.oldPath
        fileData['newName'] = this.newName
        fileData['newPath'] = this.newPath
        let updatedFile = JSON.stringify(fileData)
        return fs.writeFileAsync(this.oldPath, updatedFile)
        .catch((error) => {
          return console.log(error)
        })
      })
      .catch((error) => {
        return console.log(error)
      })
  }
  appendText(){
    let data = "Old Name: " + this.oldName + "\n" +
              "Old Path: " + this.oldPath + "\n" +
              "New Name: " + this.newName + "\n" +
              "New Path: " + this.newPath + "\n"
    return fs.appendFileAsync(this.oldPath, data)
    .catch((error) => {
      return console.log(error)
    })
  }

}

module.exports = Append
