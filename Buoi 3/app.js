const express = require('express');
const path = require('path');
const repo = require('./repo');

let app = express();

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
})

app.get('/web:id', (req, res) => {
    const id = req.params.id;
    repo.readData(id, data => {
        let html = '<ul>';
        data.forEach(x => html+= `<li>${x}</li>`);
        res.send(html + '</ul>');        
    });
});


app.listen(8000, function(err) {
    if (err) console.log(err)
    else console.log('Server is up');
})