const jwt = require("jsonwebtoken")

module.exports = {
    tokenGenerate: async (admin, secret) => {
        const token = await jwt.sign(admin, secret, { expiresIn: '1d' })
        return token
    },
    tokenVerify: async (token, secret) => {
        let pass = true
        const Verify = await jwt.verify(token, secret, (err, jwt) => {
            if (err) {
                pass = true
                return err
            }
        })
        return Verify
    }
}