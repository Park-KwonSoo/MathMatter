const jwt = require("jsonwebtoken");

function decodedToken(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (error, decoded) => {
                if(error) {
                    reject(error);
                }
                resolve(decoded);
            })
        }
    )
}

exports.jwtMiddleware = async (ctx, next) => {
    const token = ctx.cookies.get("access_token");

    if(!token) {
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = {
            _id : decoded._id,
            userId : decoded._userId
        };
        const now = Math.floor(Date.now() / 1000);


    } catch(e) {
        return next();
    }

};
