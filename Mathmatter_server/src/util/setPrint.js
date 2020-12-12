const Question = require('../models/question');

/**
 * 내신형 문제 생성
 */
exports.setTypeN = async function(object) {
    //나이, 학기, 문제수, 중간/기말고사
    const { semester, numberOfQuestion, typeOfExam, difficulty } = object;
    let { age } = object;

    //19살 = 고3이 넘어가면 전부 고3
    if(age > 19) {
        age = 19;
    };
    
    //과목은 학년 + 학기
    const subject = 10 * age + semester;

    //해당 subject의 값을 가진 모든 객체들에서 랜덤으로 numberOfQuestion만큼 추출한다
    const questionList = await setRandomQuestion(await Question.find({
        subject
    }), numberOfQuestion, difficulty);

    const print = {
        typeOfPrint : 1,
        typeOfExam,
        numberOfQuestion,
        questionList,
        difficulty
    };

    console.log(print);
    return print;
};

/**
 * 수능형 문제 생성
 */
exports.setTypeS = async function(object) {
    //모의고사는 오직 30문제로 구성되고, 학년과 달에 의해서만 영향을 받는다.
    const { age, month } = object;

    let subject;
    //고3보다 작으면 과목은 1학기, 2학기밖에 없다
    if(age < 19) {
        subject = age * 10;
        switch(month) {
            case 3:
            case 4:
            case 5:
            case 6:
                subject += 1;
                break;
            default :
                subject += 2;
                break;
        }
    } else {
        subject = 190;
        switch(month) {
            case 3:
            case 4:
            case 5:
            case 6:
                subject += 2;
                break;
            default :
                subject += 3;
                break;
        }
    }

    //과목이 최소 subject범위의 모든 문제들을 가져옴
    const questionList = await setRandomQuestion(await Question.find({
        subject : { $lte : subject}
    }), 30, 0);

    const print = {
        typeOfPrint : 2,
        typeOfExam : 3,
        numberOfQuestion : 30,
        questionList,
        difficulty : 0
    }

    return print;

};

/**
 * 유형별 문제 생성
 */
exports.setTypeT = async function(object) {
    //유형별 문제는 문제수, 문제 유형, 난이도, 그리고 이후 과목을 포함하는가 여부를 받아와서 문제를 설정한다.
    const { numberOfQuestion, questionType, difficulty, includeMore} = object;

    let questionList;
    //만약 받아온다면, questionType이 있는 모든 문제들을 받아와서 출력한다.
    if(includeMore) {
        //questionType이 하나라도 포함된 문제들을 모두 출력한다.
        questionList = await setRandomQuestion(await Question.find({
            questiontype : questionType
        }), numberOfQuestion, difficulty);
    } else {    //만약 이후 과정의 문제를 받길 원하지 않는다면
        //questionType이 최대가 되고 그 값을 포함 하는 문제들을 받아온다.
        questionList = await setRandomQuestion(await Question.find({
            $and :
            [{ questiontype : { $not : { $gt : questionType }}},
            { questiontype : questionType }]
        }), numberOfQuestion, difficulty);
    }
    
    const print = {
        typeOfPrint : 3,
        typeOfExam : 0,
        numberOfQuestion,
        questionList,
        difficulty
    }

    return print;
};

//questionList에서 numberOfQuestion만큼 랜덤으로 문제를 뽑는다.
const setRandomQuestion = async function(questionList, numberOfQuestion, difficulty) {
    //difficulty에 따라서 난이도1, 난이도2, 난이도3, 난이도4의 배율이 달라짐
    let dif1, dif2, dif3, dif4;
    switch(difficulty){
        case 1:
            dif1 = Math.floor(numberOfQuestion * 0.5);
            dif2 = Math.floor(numberOfQuestion * 0.4);
            dif3 = Math.floor(numberOfQuestion * 0.1);
            dif4 = 0;
            break;
        case 2:
            dif1 = Math.floor(numberOfQuestion * 0.3);
            dif2 = Math.floor(numberOfQuestion * 0.5);
            dif3 = Math.floor(numberOfQuestion * 0.2);
            dif4 = 0;
            break;
        case 3:
            dif1 = Math.floor(numberOfQuestion * 0.1);
            dif2 = Math.floor(numberOfQuestion * 0.2);
            dif3 = Math.floor(numberOfQuestion * 0.5);
            dif4 = Math.floor(numberOfQuestion * 0.2);
            break;
        case 4:
            dif1 = 0;
            dif2 = Math.floor(numberOfQuestion * 0.1);
            dif3 = Math.floor(numberOfQuestion * 0.4);
            dif4 = Math.floor(numberOfQuestion * 0.5);
            break;
        //수능형 선택 시(difficulty : 0) 30문제로 고정됨
        default :
            dif1 = 3;
            dif2 = 14;
            dif3 = 9;
            dif4 = 4;
            break;
    }
    
    //questionList의 difficulty별로 분류
    const dif1_list = await questionList.filter(function(Question) {
        return Question.difficulty == 1
    });
    const dif2_list = await questionList.filter(function(Question) {
        return Question.difficulty == 2
    });
    const dif3_list = await questionList.filter(function(Question) {
        return Question.difficulty == 3
    });
    const dif4_list = await questionList.filter(function(Question) {
        return Question.difficulty == 4
    });

    //numberOfQuestion을 맞추기 위해, 해당 배율을 다 적용하고 남은 값을 dif2에 더한다
    dif2 += numberOfQuestion - (dif1 + dif2 + dif3 + dif4);
    

    //결과값을 저장할 array
    let result = [];

    let random = Math.floor(Math.random() * dif1_list.length);
    //리턴할 배열에 해당 문제가 있으면 넣지 않고 다시 랜덤한 값을 정한다
    let isNotExist = true;
    //중복된 값을 제거하여 출력 리스트에 문제를 넣음
    let i = 0;
    while(i < dif1) {
        for(let j = 0; j < result.length; j++){
            if (result[j] == dif1_list[random]) {
                isNotExist = false;
                break;
            }
        }
        
        if(isNotExist) {
            result.push(dif1_list[random]);
            i++;
        } else {
            random = Math.floor(Math.random() * dif1_list.length);
        }

        isNotExist = true;
    }

    
    //dif2_list
    random = Math.floor(Math.random() * dif2_list.length);
    isNotExist = true;
    i = 0;
    while(i < dif2) {
        for(let j = 0; j < result.length; j++){
            if (result[j] == dif2_list[random]) {
                isNotExist = false;
                break;
            }
        }
        
        if(isNotExist) {
            result.push(dif2_list[random]);
            i++;
        } else {
            random = Math.floor(Math.random() * dif2_list.length);
        }

        isNotExist = true;
    }

    
     //dif3_list
    random = Math.floor(Math.random() * dif3_list.length);
    isNotExist = true;
    i = 0;
    while(i < dif3) {
       for(let j = 0; j < result.length; j++){
            if (result[j] == dif3_list[random]) {
                isNotExist = false;
                break;
            }
        }
        
        if(isNotExist) {
            result.push(dif3_list[random]);
            i++;
        } else {
           random = Math.floor(Math.random() * dif3_list.length);
        }
         isNotExist = true;
    }

      //dif4_list
      random = Math.floor(Math.random() * dif4_list.length);
      isNotExist = true;
      i = 0;
      while(i < dif4) {
          for(let j = 0; j < result.length; j++){
              if (result[j] == dif4_list[random]) {
                  isNotExist = false;
                  break;
              }
          }
          
          if(isNotExist) {
              result.push(dif4_list[random]);
              i++;
          } else {
            random = Math.floor(Math.random() * dif4_list.length);
          }

          isNotExist = true;
      }

    return result;
}