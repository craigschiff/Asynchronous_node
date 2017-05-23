const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
var Append = Promise.promisifyAll(require('./append'))
let date = new Date()
let oldDirectory = './files/original'
let newDir = 'files/moved'


class Rename {
  constructor(fileName, filePath, newDirectory){
    this.originalName = fileName
    this.originalPath = filePath
    this.newDirectory = newDirectory
    let newInfo = this.getNewFileInfo()
    this.newName = newInfo.newPathObj.name
    this.ext = newInfo.newPathObj.ext
    this.newPath = newInfo.newPath
    this.errorCount = 0
  }
  static directoryFiles (currentDirectory, newDirectory) {
    return fs.readdirAsync(currentDirectory).map((file) => {
      let filePath = path.join(currentDirectory, file)
      return new Rename(file, filePath, newDirectory)
      // creating an array with each element an instance of the Rename class representing one file
    })
  }
  getNewFileInfo(){
    let originalPathObj = path.parse(this.originalPath)
    let newName = originalPathObj.name + '_EDITED_' +
                  date.getFullYear() + '-' +
                  this.formatTwoDigits(date.getMonth() + 1) + '-' +
                  this.formatTwoDigits(date.getDate()) + '_' +
                  this.formatTwoDigits(date.getHours()) + '-' +
                  this.formatTwoDigits(date.getMinutes())
    let newPathObj = {root: originalPathObj.root, ext: originalPathObj.ext}
    newPathObj.name = newName
    newPathObj.dir = newDir
    let newPath = path.format(newPathObj)
    return {newPathObj, newPath}
  }

  appendAndMoveFile(){
    return this.appendFile()
    .then(() => {
      return this.moveFile()
    })
  }

  appendFile(){
    let append = new Append(this.originalName, this.originalPath, this.newName, this.newPath, this.ext)
    return append.appendFile()
    .catch((error) =>{
      this.errorCount ++
      console.log(error)
    })
  }

  moveFile(){
    return fs.renameAsync(this.originalPath, this.newPath)
      .catch((error) =>{
        this.errorCount ++
        return console.log(error)
      })
  }

  formatTwoDigits (number) {
    return number.toLocaleString('en-US', {minimumIntegerDigits: 2})
  }

}
module.exports = Rename
