const { books } = require('../models');
const { users } = require('../models');
const sequelize = require('sequelize');
const email = require('../middleware/email');

class BookController {
    static async getBook(req, res, next) {
        try {
            let foundBook = await books.find();
            if (!foundBook) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'There is no book at the moment.'
                })
            } else {
                res.status(200).json({
                    status: true,
                    message: 'Here are the books',
                    data: foundBook
                })
            }
        } catch (error) {
            next(error);
        }
    }
    static async addBook(req, res, next) {
        const { title, author, year, pages, description } = req.body;
        const userId = req.userData
        try {
            let foundUser = await users.findOne({ email: process.env.ADMIN_EMAIL })
            let foundBook = await books.findOne({ title: title })

            if (!foundUser) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'You are not authorized'
                })
            } else if (foundBook) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Book has already added.'
                })
            } else {
                let newBook = await books.create(req.body)
                res.status(200).json({
                    status: true,
                    message: 'Book added.',
                    data: newBook
                })
            }
        } catch (error) {
            next(error);
        }
    }
    static async editBook(req, res, next) {
        const { title, author, year, pages, description } = req.body;
        const userId = req.userData;
        const id = req.params.id;
        try {
            let foundBook = await books.findOne({ where: { title } });

            if (!foundBook) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Book not found'
                })
            } else {
                let updated = await books.update(
                    req.body,
                    { where: { id } }
                )
                res.status(200).json({
                    status: true,
                    message: 'Book updated.',
                    data: updated
                })
            }
        } catch (error) {
            next(error);
        }
    }
    static async deleteBook(req, res, next) {
        const id = req.params.id;
        try {
            const deleteBook = await books.destroy(id);
            
            if (!deleteBook) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Book not found'
                })
            } else {
                res.status(200).json({
                    status: true,
                    message: 'Book deleted.',
                    data: deleteBook
                })
            }
        } catch (error) {
            next(error);
        }
    }
    static async findBook(req, res, next) {
        const id = req.params.id;
        try {
            let foundBook = await books.findOne({
                id: id,
            })
            if (!foundBook) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Book not found'
                })
            } else {
                res.status(200).json({
                    status: true,
                    message: 'Book found.',
                    data: foundBook
                })
            }
        } catch (error) {
            next(error);
        }
    }
    static async searchBook(req, res, next) {
        const { search } = req.body;
        try {
            const found = await books.findAll({
                where: {
                    title: {
                        [Op.like]: '%' + search + '%'
                    }
                }
            });
            if (found) {
                res.status(200).json({
                    status: true,
                    msg: 'Book found',
                    data: search
                });
            } else {
                res.status(400).json({
                    status: 'failed',
                    msg: "Book not found!"
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BookController;