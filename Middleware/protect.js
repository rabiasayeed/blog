const {verifyUserToken} = require('../Services/auth')//mports verifyUserToken from the auth service.This function verifies the token (JWT) and returns user data.
function checkUser(cookieName){//Creates a function called checkUser.
    return (req, res, next)=>{
        try {
            const token = req.cookies;//Gets cookies from the request.
            
            if (!token){//If no cookies exist:Skip authentication and move to next middleware.
                return next();
            }
            const user = verifyUserToken(token.token);//Sends the token to verifyUserToken.The function decodes the JWT and returns user data
            req.user = user;//Saves the user information in req.user.
            
        
        } catch (error) {
        }
        return next()
    }

}

module.exports = checkUser