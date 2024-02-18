const { argv } = require("node:process");
const fs = require("fs");
const { jsonrepairTransform } = require('jsonrepair/stream')


const readFile = async (userId, filePath) => {
const inputStream = fs.createReadStream(filePath)

inputStream
  .pipe(jsonrepairTransform())
  .on('data', (chunk)=> { 
    const parsedChunk =  JSON.parse(chunk.toString())
    if(parsedChunk.id == userId) {
       inputStream.close();
    }
  })
  .on('error', (err) => console.error(err))
  .on('finish', () => console.log('done'))


};
main = async () => {
  const id = argv[2];
  if (isNaN(id)) {
    throw new Error(
      `third argument should be a number instead we have got ${id}`
    );
  } else {
    readFile(id,"input.json");
  }
};
main();
