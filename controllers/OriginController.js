const { Origin } = require('../models')

exports.OriginAll = async (req, res, next) => {
    try {
        let origin = await Origin.findAll()
        
    } catch (err) {
        next(err)
    }
}