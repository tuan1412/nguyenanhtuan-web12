const request = require('request');

const readData = function(id, onReadFileDone) {
    request(`https://btvn-web12.herokuapp.com/api/web${id}`, (err, res, body) => {
        if (err) console.log(err);
        const {success, data} = JSON.parse(body);
        onReadFileDone(data);
    });
}

module.exports = {
    readData
}
