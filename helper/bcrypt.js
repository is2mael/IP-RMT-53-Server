const bcrypt = require('bcryptjs');
const saltRaound = 10;

exports.encrypt = (password) => {
    return bcrypt.hashSync(password, saltRaound)
}

exports.compasre = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}