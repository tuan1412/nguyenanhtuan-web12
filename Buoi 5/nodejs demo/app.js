const express = require('express');
const fileSystem = require('./fileSystem');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// khai bao 1 engine cua app
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
// dat view engine cua app la 'handlebars'
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    // cai truyen sau home thuc chat la object short hand properties
    const name = 'Nguyen Anh Tuan';
    res.render('home', {
        name
    });
});

app.get('/ask', function (req, res) {
    res.render('ask');
})

app.post('/api/question', function(req, res) {
    console.log(req.body)
})

app.use(express.static('public'))

app.listen(8000, function (err) {
    if (err) console.log(err)
    else console.log('Server is up');
})