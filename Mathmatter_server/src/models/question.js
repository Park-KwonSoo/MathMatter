const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema ({
    subject : { type : Number, required : true },
    questiontype : [Number],
    body : String,
    answer : String,
    solution : String,
    difficulty : Number
});

QuestionSchema.methods.getSubject = function () {
    return this.subject;
};

QuestionSchema.methods.getQuestionType = function () {
    return this.questiontype;
};

QuestionSchema.methods.getQuestion = function() {
    return this.body;
};

QuestionSchema.methods.getAnswer = function() {
    return this.answer;
};

QuestionSchema.methods.getSolution = function() {
    return this.solution;
};

QuestionSchema.methods.getDifficulty = function() {
    return this.difficulty;
};

module.exports = mongoose.model("Question", QuestionSchema);