const jwt = require("jsonwebtoken")

module.exports = {
    tokenGenerate: async (admin, secret)=>{
        const token = await jwt.sign(admin, secret, {expiresIn: '20s'})
        return token
    },
    tokenVerify: async (token, secret) => {
        const Verified = await jwt.verify(token, secret, (err, jwt) => {
            if(err){
                return err
            }
        })
        return Verified
    }
}