const expect = require('chai').expect
const Promise = require('bluebird')
var Rename = Promise.promisifyAll(require('../lib/rename'))
let originalDirectory = './files/original'
let newDir = 'files/moved'


describe('static directoryFiles', function() {
  let result = Rename.directoryFiles(originalDirectory, newDir)
  const randomIndex = (array) => {
    return Math.floor(Math.random() * (array.length - 1))
  }

  it('Should iterate through each file in the directory', () => {
    return result.then((files) =>{
      expect(files.length).to.equal(4)
    })
  });
  it('Should return an array where each element is an instance of the Remain class', function(){
    return result.then((files) =>{
      expect(files[randomIndex(files)]).to.be.an.instanceOf(Rename)
    })

  });
});

describe ('getNewFileInfo', () => {
  let fileName = 'my-json-file'
  let filePath = 'files/original/my-json-file.json'
  let date = new Date()
  let file = new Rename(fileName, filePath, newDir)
  let newInfo = file.getNewFileInfo()
  it('Should return a newPath object and a newPath string', () => {
    expect(newInfo.newPath).to.be.a('string')
    expect(newInfo.newPathObj).to.be.an('object')
  })
  it('The new path should include the new directory', () => {
    expect(newInfo.newPathObj.dir).to.equal(newDir)
  })
  it('The new name month, date, hours, and minutes should be two digits and year four digits', () => {
    expect(newInfo.newPathObj.name.length - fileName.length).to.equal(24)
  })
  it('Should include accurate information', () => {
    let name = newInfo.newPathObj.name
    expect(name).to.include('2017')
    expect(name).to.include('05')
    expect(name).to.include(date.getMinutes())
    expect(name).to.include(date.getHours())
    expect(name).to.include("_EDITED_")
  })

})
