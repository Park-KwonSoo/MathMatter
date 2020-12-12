const { number } = require('joi');
const Question = require('../models/question');

/**
 * 내신형 문제 생성
 */
exports.setTypeN = async function(object) {
    //나이, 학기, 문제수, 중간/기말고사
    let { age, semester, numberOfQuestion, typeOfExam } = object;

    //19살 = 고3이 넘어가면 전부 고3
    if(age > 19) {
        age = 19;
    };
    
    //과목은 학년 + 학기
    const subject = 10 * age + semester;

    //해당 subject의 값을 가진 모든 객체들에서 랜덤으로 numberOfQuestion만큼 추출한다
    const getQuestionList = await Question.find({ subject });
    const questionList = setRandomQuestion(getQuestionList, numberOfQuestion);

    const print = {
        typeOfPrint : 1,
        typeOfExam,
        numberOfQuestion,
        questionList
    };

    return print;
};

/**
 * 수능형 문제 생성
 */
exports.setTypeS = async function(object) {

};

/**
 * 유형별 문제 생성
 */
exports.setTypeT = async function(object) {

};

//questionList에서 numberOfQuestion만큼 랜덤으로 문제를 뽑는다.
const setRandomQuestion = function(questionList, numberOfQuestion) {
    //결과값을 저장할 array
    let result = [];

    for(let i = 0; i < numberOfQuestion; i++) {
        result.push(questionList[Math.floor(Math.random() * questionList.length)]);
    }
    
    return result;
}