let fs = require('fs')
let inputFile1 = './files/original/my-json-file.json'
let inputFile2 = './files/original/second-json-file.json'


let applicant = {
  company: 'DigiFi',
  name: 'Craig Schiff'
}


fs.writeFile(inputFile1, JSON.stringify(applicant), function(error){
  if (error) {
    return console.log(error)
  }
  console.log("Successfully added to file 1")
})
fs.writeFile(inputFile2, JSON.stringify(applicant), function(error){
  if (error) {
    return console.log(error)
  }
  console.log("Successfully added to file 2")
})

//   .then(() => {
//     console.log("Successfully added to file")
//   })
//   .catch((error) => {
//     console.log(error)
//   })
//
// // , function(error)
