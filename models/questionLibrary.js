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

QuestionLibrarySchema.statics.getAll = function(cb) {
    this.find({}, { name: 1, displayName: 1, '_id': 0 }, cb);
};

QuestionLibrarySchema.statics.findByName = function(examName, cb) {
    this.findOne({ name: examName }, cb);
};

mongoose.model('QuestionLibrary', QuestionLibrarySchema);
