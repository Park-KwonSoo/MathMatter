const Profile = require('../../models/profile');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

/**
 *  PATCH   setProfile
 *  Birth -> Age
 *  Phone Number
 *  Email
 *  Name
 */
exports.setProfile = async (ctx) => {
    const token = ctx.cookies.get('access_token');

    if(!token) {
        return;
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        
        //유효성 검증
        const schema = Joi.object().keys({
            birth : Joi.date().required(),
            phoneNumber : Joi.number().required(),
            email : Joi.string().email(),
            userName : Joi.string()
        });

        const result = schema.validate(ctx.request.body);

        if(result.error) {
            ctx.status = 400;
            return;
        }

        const birth = new Date(ctx.request.body.birth);
        const now = new Date();
        const age = now.getFullYear() - birth.getFullYear() + 1;

        //로그인한 유저의 프로필을 찾아서 업데이트 해준다.
        await Profile.updateOne({ userId }, ctx.request.body, {
            new : true
        });
        const profile = await Profile.updateOne({ userId }, {
            age : age
        }, {
            new : true
        })


        console.log(profile);
        ctx.body = "프로필 설정 성공";

    } catch(e) {
        return ctx.throw(500, e);
    }
 }

/**
 *  GET Profile
 *  Get User Profile
 */
exports.getProfile = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token) {
        return;
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        const profile = await Profile.findByUserId(userId);
        
        ctx.body = {
            userId : profile.userId,
            userName : profile.userName,
            birth : profile.birth,
            age : profile.age,
            email : profile.email,
            phoneNumber : profile.phoneNumber,
        };
    } catch(e) {
        ctx.status = 500;
        return;
    }
}


/**
 *  GET Print List
 * 
 */
exports.getPrintList = async (ctx) => {
    const token = ctx.cookies.get('access_token');

    if(!token) {
        return;
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        const profile = await Profile.findByUserId(userId);

        ctx.body = profile.getPrintList();
        
        console.log("success to get Print List");
    } catch(e) {
        return ctx.throw(500, e);
    }
}

/**
 *  GET Write LIST
 *  GET user Writing List
 */
exports.getWriteList = async (ctx) => {
    const token = ctx.cookies.get('access_token');

    if(!token) {
        return;
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        
        const profile = await Profile.findByUserId(userId);

        const writeList = profile.getWriteList();

        let titleList = [];

        for(let i = 0; i < writeList.length; i++) {
            titleList.push(writeList[i].title);
        }


        ctx.body = titleList;

    } catch(e) {
        ctx.stauts = 500;
        return;
    }
}
 