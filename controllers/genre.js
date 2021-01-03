const { genres } = require('../models');
const { users } = require('../models');
const sequelize = require('sequelize');
const email = require('../middleware/email');


class GenreController {
    static async getGenre(req, res, next) {
        try {
            let foundGenre = await genres.find();
            if (!foundGenre) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Genre not found'
                })
            } else {
                res.status(200).json({
                    status: 'Success',
                    message: "Here are all the genres' name.",
                    data: foundGenre
                })
            }
        } catch (error) {
            next(error);
        }
    }
    static async addGenre(req, res, next) {
        const { genre, description } = req.body;
        try {
            let foundGenre = await genres.findOne({ genre: genre });
            if (foundGenre) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Genre already added.'
                })
            } else {
                let newGenre = await genres.create(req.body)
                res.status(200).json({
                    status: true,
                    message: 'Genre added.',
                    data: newGenre
                })
            }
        } catch (error) {
            next(error);
        }
    }
    static async editGenre(req, res, next) {
        const id = req.params.id;
        const { genre, description } = req.body;
        try {
            let foundGenre = await genres.findOne({ where: { id } })
            if (!foundGenre) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Genre not found.'
                })
            } else {
                let updated = await genres.update(
                    req.body,
                    {where: { id }}
                )
                res.status(200).json({
                    status: true,
                    message:'Genre updated.',
                    data: updated,
                })

            }
        } catch (error) {
            next(error);
        }
    }
    static async deleteGenre(req, res, next) {
        const { id } = req.params.id
        try {
            let foundGenre = await genres.destroy(id);
            if (!foundGenre) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Genre not found.'
                })
            } else {
                res.status(200).json({
                    status: true,
                    message: 'Genre successfully deleted.',
                    data: foundGenre
                })
            }
        } catch (error) {
            next(error);
        }
    }
    static async findGenre(req, res, next) {
        const id = req.params.id;
        
        try {

        } catch (error) {
            next(error);
        }
    }
    static async searchGenre(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}

module.exports = GenreController;