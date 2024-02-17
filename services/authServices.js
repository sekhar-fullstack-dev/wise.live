const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mockUser = {
    username: 'user',
    password: 'adminpassword',
    email: 'user1@example.com'
};

const decodeBasicAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return null;
        }
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        req.username = username;
        req.password = password;
        next();
    } catch (e) {
        throw e;
    }
    
};

const extractToken = (req,res,next)=>{
    try {
      const header = req.headers['authorization'];
      var cookies;
      if(req.cookies && req.cookies.session_token){
        cookies = req.cookies.session_token;
      }
      if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
      } else if(typeof cookies !== 'undefined') {
        req.token = cookies;
        next();
      }
      else{
        res.status(403).send('A token is required for authentication');
      }
    } catch (error) {
      Error(res, error);
    }
  }

const authenticateUser = (req, res, next)=>{
    try {
        extractToken(req, res, ()=>{
            const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
            if(decoded){
                if(decoded.role >=100){
                    req.user = decoded;
                    next();
                }
                else{
                    res.status(400).send({status:400,error:"You don't permission to access these resources",msg:"",data:{}})
                }
            }
            else{
                res.status(400).send({status:400,error:"Invalid token",msg:"",data:{}})
            }
        })
    } catch (e) {
        throw e;
    }
}

const authenticateBasicAuth = (req, res, next) => {
    try {
        decodeBasicAuth(req, res, ()=>{
            if (req.username === mockUser.username && req.password === mockUser.password) {
                req.auth = true;
            }
            else{
                req.auth = false;
            }
            next();
        })
    } catch (e) {
        throw e;
    }
};

const createToken = (payload) => {
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: '48h' };
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

module.exports = {
    decodeBasicAuth,
    authenticateBasicAuth,
    authenticateUser,
    createToken
};


