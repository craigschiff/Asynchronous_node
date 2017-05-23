const Promise = require('bluebird')
var Rename = Promise.promisifyAll(require('./lib/rename'))
const path = require('path')
let originalDirectory = './files/original'
let newDir = 'files/moved'

const script = (originalDirectory, newDir) => {
  let executeFiles = []
  Rename.checkDirectoryExists(newDir)
  .then(() => {
    let files = Rename.directoryFiles(originalDirectory, newDir)
    .then((files) => {
      for (let i = 0; i < files.length; ++i) {
        executeFiles.push(files[i].appendAndMoveFile())
      }
      Promise.all(executeFiles)
      .then(() => {
        return checkErrors(files)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  })
}


const checkErrors = (files) => {
  let errors = 0
  let errorFiles = []
  files.forEach((file) => {
    if (file.errors){
      errors += file.errors
      errorFiles.push(file.originalName)
    }
  })
  outputToConsole(errors, errorFiles, files)
}

const outputToConsole = (errors, errorFiles, files) => {
  if (!errors){
    let output = `renamed ${files.length} files, with 0 errors`
    console.log(output)
    return output
  } else if (errors == 1){
    let output = `renamed ${files.length - 1} files, with 1 error (${errorFiles[0]})`
    console.log(output)
    return output
  } else {
    let output = `renamed ${files.length - errors} files, with ${errors} errors (${errorFiles.join(', ')})`
    console.log(output)
    return output
  }
}

script(originalDirectory, newDir)
