const jwt = require("jsonwebtoken")

module.exports = {
    tokenGenerate: async (admin, secret)=>{
        const token = await jwt.sign(admin, secret)
        return token
    },
    tokenVerify: async (token, secret) => {
        const Verified = await jwt.verify(token, secret)
        return Verified
    }
}