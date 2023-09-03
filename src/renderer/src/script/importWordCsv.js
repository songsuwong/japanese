const csv = require('csvtojson');
const fs = require('fs');
const csvFilePath = './src/renderer/src/assets/word.csv';
const excludeCsvPath = './src/renderer/src/assets/excludeList.csv';

const wordJson = await csv()
.fromFile(csvFilePath)
.then((json) => {
  try {
    return json
  } catch (err) {
    console.log('convert lang csv to json error: ', err);
    return reject(err);
  }
});

const excludeJson = async(newExclude) => {
  var excludeJson = await csv()
  .fromFile(excludeCsvPath)
  .then((json) => {
    try {
      return json
    } catch (err) {
      console.log('convert lang csv to json error: ', err);
      return reject(err);
    }
  });
  excludeJson.push(newExclude)

  const items = excludeJson
  const replacer = (key, value) => value === null ? '' : value 
  const header = Object.keys(items[0])
  const newCsv = [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')
  
  fs.writeFileSync(
    excludeCsvPath,
    newCsv,
    'utf-8',
    (err) => {
      console.log('save csv to json occurs error: ', err);
      return reject(err);
    }
  );
}

const getExcludeJson = async() => {
  var excludeJson = await csv()
  .fromFile(excludeCsvPath)
  .then((json) => {
    console.log(json)
    try {
      return json
    } catch (err) {
      console.log('convert lang csv to json error: ', err);
      return reject(err);
    }
  });
  console.log(excludeJson)
  return excludeJson
}

export default { 
  wordJson,
  excludeJson,
  getExcludeJson
}