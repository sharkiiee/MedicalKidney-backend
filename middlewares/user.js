const {Users} = require("../database/db")

function userMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    Users.findOne({
        username:username,
        password:password
    })
    .then(function(value){
        if(value){
            next()
        }else{
            res.status(403).json({
                message:"Un-authorized input please check the inputs"
            })
        }
    })
}

module.exports = {
    userMiddleware
}