const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Profile = require('../../models/profile');

/**
 *  GET UserId
 *  if UserId Exists : return false
 */
exports.checkId = async(ctx) => {
    const { userId } = ctx.params;  //아이디가 존재하는지 확인

    try {
        const existUser = await User.findByUserId(userId);

        if(existUser) {
            //ctx.status = 400;
            ctx.body = existUser;
            console.log("아이디가 이미 존재합니다.")
            return false;
        }  else {
            ctx.body = null;
            console.log("사용 가능한 아이디입니다.")
            return true;
        }

    }   catch(e) {
        return ctx.throw(500, e);
    }
}

/**
 *  GET UserEmail
 *  if UserEmail Exists : return false
 */
exports.checkEmail = async(ctx) => {
    const { email } = ctx.params;

    try {
        const existUser = await Profile.findByEmail(email);

        if(existUser) {
            // ctx.status = 400;
            ctx.body = existUser;
            console.log("이미 존재하는 이메일입니다.");
            return false;
        }   else {
            ctx.body = null;
            console.log("사용 가능한 이메일입니다.")
            return true;
        }

    }   catch(e) {
        return ctx.throw(500, e);
    }
}


/**
 *  POST    Register
 *  user ID
 *  Passwrod
 */
exports.register = async (ctx) => {
    //userId와 password를 받아온다/
    const { userId, email, password } = ctx.request.body;

    //joi를 이용하여 유효성을 검증한다
    const schema = Joi.object().keys({
        userId : Joi.string().min(5).max(15).required(),
        email : Joi.string().email(),
        password : Joi.string().required()
    });

    //유효성을 검증
    const result = schema.validate(ctx.request.body);

    //유효하지 않다면 400에러
    if(result.error) {
        ctx.status = 400;
        return;
    }

    //이미 존재하는 회원인지 확인하게 위해 mongoDB의 UserSchema에서 해당 회원을 확인
    const existUser = await User.findByUserId(userId);
    const existEmail = await Profile.findByEmail(email);

    //만약 유저가 있다면 409 에러
    if(existUser || existEmail) {
        ctx.status =409;
        return;
    }

    //입력 값이 유효하고, 이미 존재하는 회원이 없다면 회원가입을 진행한다.
    try {
        //userId값을 가진 유저와 해당 유저의 프로필을 만들고
        const user = new User ({
            userId
        });
        const profile = new Profile ({
            userId,
            email
        });
        
        //패스워드를 해쉬 처리한 후
        await user.setPassword(password);

        //mongoDB에 저장한다
        await user.save();
        await profile.save();

        //잘 저장되었으면 해당 유저의 정보를 출력
        console.log(user);
        console.log(profile);

        ctx.body = "회원가입 성공";
    } catch(e) {
        //예상치 못한 에러 발생 시 500
        return ctx.throw(500, e);
    }
}

/**
 *  POST    Login
 *  user ID
 *  Password
 */
exports.login = async (ctx) => {
    //로그인을 할 때 기본적인 양식이 맞는지를 검사한다.
    const { userId, password } = ctx.request.body;

    //로그인을 할 때 아이디 또는 패스워드를 입력하지 않으면 401 에러
    if(!userId || !password) {
        ctx.status = 401;
        return;
    }

    //아이디가 유효한지 검사한다.
    try {
        const user = await User.findByUserId(userId);

        //만약 해당하는 유저가 없다면 에러코드 401
        if(!user) {
            ctx.status = 401;
            return;
        }

        //유저가 있더라도 비밀번호가 매칭되는지 검사해야 한다.
        const isPasswordTrue = await user.checkPassword(password);
        if(!isPasswordTrue) {
            ctx.status = 401;
            return;
        }

        //로그인 성공 시 쿠키 생성
        try {
            //토큰을 생성한 후
            const token = await user.generateToken();

            //페이지의 쿠키를 로그인한 토큰으로 설정한다.
            ctx.cookies.set('access_token', token, {
                httpOnly : true,
                maxAge : 1000 * 60 * 60 * 24 * 7
            });

            ctx.body = "로그인 성공";
        } catch(e) {
            return ctx.throw(500, e);
        }

    } catch(e) {
        return ctx.throw(500, e);
    }

}

/**
 *  POST Logout
 */
exports.logout = async (ctx) => {
    ctx.cookies.set('access_token', null, {
        httpOnly : true,
        maxAge : 0
    });
    
    try {
        ctx.body = "로그아웃 성공";
    }   catch(e) {
        return ctx.throw(500, e);
    }
}

/**
 *  POST WithDraw
 */
exports.withdraw = async (ctx) => {
    //현재 로그인 되어 있다면 탈퇴를 진행할 수 있다.
    const token = ctx.cookies.get('access_token');
    if(!token) {
        return;
    }
    
    //토큰을 디코드해서 ID를 받아오고 그 ID를 삭제한다.
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    try {
        await User.deleteOne({ userId });
        await Profile.deleteOne({ userId });
        ctx.body = "탈퇴 성공";
    } catch(e) {
        return ctx.throw(500, e);
    }

}

/**
 *  GET USER PROFILE
 */
exports.check = async(ctx) => {
    const token = ctx.cookies.get('access_token');

    if(!token)  return;

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    try {
        ctx.body = await Profile.findByUserId(userId);
    } catch(e) {
        return ctx.throw(500, e);
    }
}