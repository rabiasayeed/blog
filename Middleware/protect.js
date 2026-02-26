const {verifyUserToken} = require('../Services/auth')
function checkUser(cookieName){
    return (req, res, next)=>{
        try {
            const token = req.cookies;
            
            if (!token){
                return next();
            }
            const user = verifyUserToken(token.token);
            req.user = user;
            
        
        } catch (error) {
        }
        return next()
    }

}

module.exports = checkUser