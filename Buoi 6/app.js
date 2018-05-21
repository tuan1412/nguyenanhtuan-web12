const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const questionRouter = require('./route/questionRouter.js')
const mongooes = require('mongoose');
const QuestionModel = require('./models/question.model.js');

mongooes.connect('mongodb://localhost/quyetde', (err) => {
    if (err) console.log(err)
    else console.log('DB connect success');
})

let app = express();

app.use('/question', questionRouter);
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', (req, res, next) => {
        QuestionModel.find({}, (err, questions) => {
            if (err) console.log(err);
            req.questionList = questions;
            if (req.questionList.length <= 0) res.render('home', {question: null})
            else next();
        })
    }, (req, res) => {
    res.render('home', {
        question: req.questionList[Math.floor(Math.random() * req.questionList.length)]
    })
});

app.get('/ask', (req, res) => {
    res.render('ask');
})

app.post('/api/question', (req, res) => {
    const newQuestion = {
        content: req.body.question
    }
    QuestionModel.create(newQuestion, (err, questionCreated) => {
        if (err) console.log(err)
        else res.redirect(`/question/${questionCreated.id}`);
    });
})


app.use(express.static('public'));

app.listen(8000, function (err) {
    if (err) console.log(err)
    else console.log('Server is up');
})