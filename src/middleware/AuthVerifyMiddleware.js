var jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    let Token = req.headers['token-key']

    jwt.verify(Token, "SecretKey123", function(err,decoded){
        if(err){
            res.status(401).json({status:"Unauthorized"})
        }
        else {
            //get username from decoded token and add with req header
            let username = decoded['data']['UserName']
            req.headers.username=username;
            next();
        }
    })
}