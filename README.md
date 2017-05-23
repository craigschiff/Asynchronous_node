The script can be run with npm start.

The four files start in the 'files/original' directory.

The main script is run from index.js. The script calls on two modules, the Rename module, which does the moving from one directory to the other, and the Append module, which adds the content to each file. The Append module is called from the Rename module.

The script first calls on the directoryFiles class method in Rename to iterate over the directory and get the list of files. The method then calls 'new Rename' on each file so each file represents an instance of the Rename class. An array of each instance is returned by the directoryFiles method.

The appendAndMoveFile function for each Rename instance is called next. The function first calls the append method  which creates an instance of the Append class and then calls on the appendData instance method to append the data. The Append method returns a promise, and when that is complete the appendAndMoveFile function calls the move method to move the file. Each individual file is called asynchronously, so while one file is moving another file may be appended, but the error check and outputting results is not done until all move and append promises have been fulfilled. This is executed via Promise.all in the index.js script.

 Tests can also be run with npm test. These primarily test the key Rename functions to ensure return values are as expected and data is accurate. The fs functions are generally not the focus of the tests since as a standard and widely used library I trust these work as expected.
