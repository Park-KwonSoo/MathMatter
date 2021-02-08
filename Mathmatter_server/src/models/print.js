const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PrintSchema = new Schema ({
    //내신형 , 수능형 , 유형별 타입을 선택함
    typeOfPrint : { type : String, required : true },
    //중간고사인지, 기말고사인지, 모의고사인지, 시험 대비가 아닌지	 등을 저장
    typeOfExam : Number,
    //문제 개수를 저장
    numberOfQuestion : Number,
    //문제 목록들을 저장
    questionList : { type : Object, required : true },
    difficulty : Number,
    //생성 일시 저장
    createdDate : { type : Date, default : Date.now, required : true}
});

PrintSchema.method.getQuestionList = function() {
    return this.questionList;
};

module.exports = mongoose.model("Print", PrintSchema);