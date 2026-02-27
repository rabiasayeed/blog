const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

const generateUserToken = (user)=>{
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
    const token = jwt.sign(payload,secret);
    return token;
}

const verifyUserToken = (token)=>{
    const user = jwt.verify(token,secret);
    return user;
}

module.exports = {generateUserToken, verifyUserToken}