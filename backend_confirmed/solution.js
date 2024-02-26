const fs = require('fs');
const readline = require('readline');

// Get the id from the command line arguments
const id = process.argv[2];
console.log(id)
// Create a readline interface to read the file line by line
const rl = readline.createInterface({
  input: fs.createReadStream('input.json'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    if (obj.id === id) {
      console.log(obj.name);
      rl.close();
    }
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
  }

});

// Log the object found with the given id is  
rl.on('close', () => {
  console.log('Object with id ' + id );
});
// Log an error if the object with the given id is not found
rl.on('error', () => {
  console.log('error while searching object with id'  + id );
});

