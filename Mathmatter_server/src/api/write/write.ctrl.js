const Write = require('../../models/write');
const Reply = require('../../models/write');
const Profile = require('../../models/profile');

const jwt = require('jsonwebtoken');

/**
 *  POST    Writing
 */
exports.writing = async (ctx) => {
    const token = ctx.cookies.get('access_token');

    if(!token) {
        return;
    }

    try {
        //제목과 내용을 입력하면 그것으로 받아옴
        const { title, body } = ctx.request.body;
        
        //작성자의 ID를 받아온다
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const profile = await Profile.findByUserId(userId);

        const write = await new Write ({
            userId,
            title,
            body
        });

        //작성한 글을 데이터베이스에 저장하고
        await write.save()

        const { _id } = write;
        const profileSaveWrite = await Write.findById(_id);

        //프로필 작성자 목록에 글 추가 해준다
        await profile.addWriteList(profileSaveWrite);
        await Profile.updateOne({ userId }, profile, {
            new : true
        });
        
        //방금 작성한 글에 대한 정보를 보인다.
        ctx.body = profileSaveWrite;
        
    } catch(e) {
        ctx.throw(500, e);
    }
    
}

/**
 *  PATCH   Reply
 */
exports.replying = async (ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token)  return;

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const { body } = ctx.request.body;

        const { postId } = ctx.params;
        const write = await Write.findByPostId(postId);

        await write.addReplying({
            userId,
            body
        });

        await Write.updateOne({ postId }, write, {
            new : true
        });

        ctx.body = write;

    }   catch(e) {
        ctx.throw(500, e);
    }
}

/**
 * GET  all Writing
 */
exports.seeAllWriting = async (ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token)  return;

    try {
        const allWriting = await Write.find().sort({ 'postId' : -1 });
        
        ctx.body = allWriting;

    }   catch(e) {
        ctx.throw(500, e);
    }
}

/**
 *  GET     Writing
 */
exports.seeWriting = async (ctx) => {
    //로그인한 사용자만 글을 읽을 수 있다.
    const token = ctx.cookies.get('access_token');
    if(!token) return;
    
    //postID를 가진 글을 읽는다.
    try {
        const { postId } = ctx.params;
        const write = await Write.findByPostId(postId);

        ctx.body = write;
    } catch(e) {
        ctx.throw(500, e);
    }

}

/**
*   DELETE Writing
*/
exports.deleteWriting = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token)  return;

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const profile = await Profile.findByUserId(userId);

        //삭제할 글의 postID
        const { postId } = ctx.params;
        //삭제할 글을 불러온다.
        const write = await Write.findByPostId(postId);
        const { _id } = write;

        //만약 로그인한 사용자와 삭제하려는 글의 작성자가 일치하지 않는다면, 삭제를 못한다.
        if(write.userId != userId) {
            ctx.status = 401;
            return;
        }


        //프로필의 글 목록에서 해당 postID를 가진 글을 삭제한 후 업데이트
        await profile.deleteWrite(_id);
        await Profile.updateOne({ userId }, profile, {
            new : true
        });

        //글 데이터베이스에서 해당 글 삭제
        await Write.deleteOne({_id});
        
        ctx.body = null;

    } catch(e) {
        ctx.throw(500, e);
    }
}