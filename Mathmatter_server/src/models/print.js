const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PrintSchema = new Schema ({
    questionList : Object
});

PrintSchema.method.getQuestionList = function() {
    return this.questionList;
};

module.exports = mongoose.model("Print", PrintSchema);