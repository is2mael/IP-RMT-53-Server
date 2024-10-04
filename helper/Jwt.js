const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY; 

exports.generateToken = ({ id, email }) => {
    return jwt.sign({ id, email }, secretKey)
}

exports.verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}
