const Write = require('../../models/write');

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

        const write = await new Write ({
            userId,
            title,
            body
        });

        //작성한 글을 데이터베이스에 저장하고
        await write.save()

        const { _id } = write;
        const SavedWrite = await Write.findById(_id);
        
        //방금 작성한 글에 대한 정보를 보인다.
        ctx.body = SavedWrite;
        
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
 *  GET my Writing List
 */
exports.getMyWriting = async( ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token)  return;

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const myWrite = await Write.find({ userId }).sort({ 'postId' : -1 });

        ctx.body = myWrite;

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
 *  PATCH   Editing
 */
exports.editWriting = async(ctx) => {
    const token = ctx.cookies.get('access_token');
    if(!token)  return;

    try {
        const { postId } = ctx.params;
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        const write = await Write.findByPostId(postId);

        if(write.userId != userId) {
            ctx.status = 401;
            return;
        }

        const { title, body } = ctx.request.body;

        if(title != "") 
            await Write.updateOne({ postId }, { title }, {
                new : true
            });

        if(body != "") 
            await Write.updateOne({ postId }, { body }, {
                new : true
            });
        

        ctx.body = await Write.findByPostId(postId);

    }   catch(e) {
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
        //삭제할 글의 postID
        const { postId } = ctx.params;
        //삭제할 글을 불러온다.
        const write = await Write.findByPostId(postId);
        //만약 로그인한 사용자와 삭제하려는 글의 작성자가 일치하지 않는다면, 삭제를 못한다.
        if(write.userId != userId) {
            ctx.status = 401;
            return;
        }

        //글 데이터베이스에서 해당 글 삭제
        await Write.deleteOne({postId});
        
        ctx.body = null;

    } catch(e) {
        ctx.throw(500, e);
    }
}