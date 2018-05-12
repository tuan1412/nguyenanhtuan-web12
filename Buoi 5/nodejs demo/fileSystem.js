const fs = require('fs');

// let obj = {
//     a: 5,
//     b: 10
// }

// console.log('Begin write file!');
// fs.writeFile('test.txt', JSON.stringify(obj), function(err) {
//     if (err){
//         console.log('Error');
//         return;
//     }
//     console.log('Write file success');
// });

// console.log('End write file');

// fs.readFile('./test.txt', function(err, data) {
//     if (err){
//         console.log('Error');
//         return;
//     }
//     console.log('Read file success ' + data);
// })

// let dataSync = fs.readFileSync('./test.txt', 'utf-8');
// let dataFile = JSON.parse(dataSync);
// console.log(dataFile);

const writeFile = function(filename, data) {
    fs.writeFileSync(filename, data);
}

const readFileSync = function(path) {
    return fs.readFileSync(filename, 'utf-8');
}

const readFile = function(path, onReadFileDone) {
    fs.readFile(path, 'utf-8', function(err, data) {
        onReadFileDone(data);
    })
}

module.exports = {
    writeFile,
    readFileSync,
    readFile
}