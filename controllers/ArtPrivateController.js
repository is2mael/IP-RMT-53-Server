const { Art, User } = require("../models/");

exports.HomePrivate = async (req, res, next) => {
    try {
        let data = await Art.findAll()
        if (!data) {
            throw { name: "Not Found", message: "Data Not Found" }
        }
        res.status(200).json({ message: "Success", data : data })
    } catch (err) {
        next(err)
    }
}

exports.PostArt = async (req, res, next) => {
    let { title, description, price, artis, imageUrl, UserId, OriginId, quantity } = req.body    
    try {
        let art = await Art.create({ ...req.body, UserId: req.user.id })
        res.status(201).json({ art })
    } catch (err) {
        next(err)
    }
}

exports.DetailsArt = async (req, res, next) => {
    let { id } = req.params
    try {
        let art = await Art.findByPk(id)
        if (!art) {
            throw { name: "Not Found", message: "Data Not Found" }
        }
        res.status(200).json({ message: "Success", data : art })
    } catch (err) {
        next(err)
    }
}

exports.UpdateArtById = async (req, res, next) => {
    let { id } = req.params;
    try {
        let art = await Art.findByPk(id)
        if (!art) {
            throw { name: "Not Found", message: "Data Not Found" }
        }
        await art.update(req.body)
        res.status(200).json({ message: "Success", data : art })
    } catch (err) {
        next(err)
    }
}

exports.DeleteArt = async (req, res, next) => {
    let { id } = req.params
    try {
        let data = await Art.findByPk(id)
        if (!data) {
            throw { name: "Not Found", message: "Data Not Found" }
        }
        await data.destroy()
        res.status(200).json({ message: `${data.name} has been deleted` })
    } catch (err) {
        next(err)
    }
}

//upload or update foto lewat imgboxx
exports.UpdateArt = async (res, req, next) => {
    try {
        
    } catch (err) {
        next(err)
    }
}