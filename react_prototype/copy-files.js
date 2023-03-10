/* eslint-disable */
const fs = require('fs');

function callback(dataToCopy, err) {
    if (err) throw err;
    console.log(`${dataToCopy} was copied to destination`);
}

fs.cp('../data', 'build/data', { recursive: true }, (err) => callback('data folder', err))
fs.cp('../assets', 'build/assets', { recursive: true }, (err) => callback('assets folder', err))
