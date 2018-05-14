const express = require('express');
const fileSystem = require('./fileSystem');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');

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
    let questionList = fs.readFileSync('./questionList.json','utf-8');
    questionList = JSON.parse(questionList)
    let newQuestion = {
        questionContent: req.body.question,
        id: questionList.length + 1,
        yes: 0,
        no: 0
    }

    questionList.push(newQuestion);

    fs.writeFileSync('./questionList.json', JSON.stringify(questionList), 'utf-8');
    
    res.redirect(`/question/${newQuestion.id}`)
})

app.get('/question/:id', function(req, res) {
    let idQuestion = req.params.id;
    let questionList = fs.readFileSync('./questionList.json','utf-8');
    questionList = JSON.parse(questionList)
    let questionFound = questionList.find(item => item.id == idQuestion);
    res.render('question', {
        question: questionFound, 
        totalVote: questionFound ? questionFound.yes + questionFound.no : 0
    });
})

app.get('/answer', function(req, res) {
    let questionList = fs.readFileSync('./questionList.json','utf-8');
    questionList = JSON.parse(questionList)
    let random = Math.round(Math.random() * questionList.length);
    let questionFound = questionList[random];
    res.render('answer', {
        question: questionFound
    })
})

app.post('/api/question/:id/vote', function(req, res) {
    let idQuestion = req.params.id;
    let type = req.query.type;
    let questionList = fs.readFileSync('./questionList.json','utf-8');
    questionList = JSON.parse(questionList)
    let index = questionList.findIndex(item => item.id == idQuestion);
    if (type == 'yes') {
        questionList[index].yes+= 1;
    }else {
        questionList[index].no+= 1;
    }
    fs.writeFileSync('./questionList.json', JSON.stringify(questionList), 'utf-8');
    res.redirect(`/question/${questionList[index].id}`)
    
})

app.get('/list', function(req, res) {
    const data = [
        {name: 'Nguyễn Anh Tuấn', id: 1},
        {name: 'Nguyễn Thế Tùng', id: 2},
        {name: 'Đàm Tuấn Anh', id: 3},
        {name: 'Đỗ Phúc Sơn', id: 4}
    ]
    res.render('list', {data});
})



app.use(express.static('public'))

app.listen(8000, function (err) {
    if (err) console.log(err)
    else console.log('Server is up');
})