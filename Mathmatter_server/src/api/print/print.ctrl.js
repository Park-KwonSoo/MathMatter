const Print = require("../../models/print");
const Profile = require("../../models/profile");
const setPrint = require("../../util/setPrint");

const jwt = require('jsonwebtoken');

/**
 *  POST    setType
 */
exports.setType = async (ctx, next) => {
    const { type } = ctx.request.body;
    ctx.params = type;
};


/**
 *  POST    setPrint
 *  by Type
 */
exports.setPrint = async (ctx, next) => {
    //타입을 결정하기 위해 url parameter에서 값을 가져온다.
    const { type } = ctx.params;

    //로그인한 유저의 정보를 받아오기 위한 토큰
    const token = ctx.cookies.get('access_token');

    if(!token) {
        return;
    }

    try{
        //로그인한 유저의 ID를 찾는다.
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const profile = await Profile.findByUserId(userId);
        //타입에 따라 생성된 프린트
        let print;
        //pamas의 type(1, 2, 3)에 따라 내신형, 수능형, 유형별로 결정된다.
        switch (type) {
            case '1':
                print = await setPrint.setTypeN(ctx.request.body);
                break;
            case '2':
                print = await setPrint.setTypeS(ctx.request.body);
                break;
            default:
                print = await setPrint.setTypeT(ctx.request.body);
                break;
        }

        //새로 생성된 프린트를 데이터베이스에 저장한다.
        const newPrint = await new Print({
            typeOfPrint : print.typeOfPrint,
            typeOfExam : print.typeOfExam,
            numberOfQuestion : print.numberOfQuestion,
            questionList : print.questionList,
            difficulty : print.difficulty
        });

        //해당 프로필의 list에 새 프린트를 넣어주고
        await profile.addPrintList(newPrint);
        //업데이트 해주면서
        await Profile.updateOne({ userId }, profile, {
            new : true
        });
        //프린트 정보까지 저장한다.
        await newPrint.save();

        ctx.body = profile;
    } catch(e) {
        ctx.throw(500, e);
    }
};

exports.printing = async (ctx) => {

};