var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    content: String,
    answerCandidates: [String],
    correctAnswerIndex: [Number]
});

var QuestionLibrarySchema = new Schema({
    name: { type: String, unique: true, index: true },
    displayName: String,
    questions: [QuestionSchema]
});

mongoose.model('QuestionLibrary', QuestionLibrarySchema);
