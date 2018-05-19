const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const QuestionSchema = new Schema({
    content: { type: String, required: true },
    yes: {type: Number, default: 0}, 
    no: {type: Number, default: 0}
})

module.exports = mongooes.model('Question', QuestionSchema);
