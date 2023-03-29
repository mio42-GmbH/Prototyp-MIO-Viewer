import { m } from 'fs'

function callback(dataToCopy, err) {
    if (err) throw err;
    console.log(`${dataToCopy} was copied to destination`);
}

cp('../data', 'dist/data', { recursive: true }, (err) => callback('data folder', err))
