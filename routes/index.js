const { Router } = require('express');
const routes = Router;
const userRoute = require('./users');
const booksRoute = require('./books');
const genresRoute = require('./genres');

routes.get('/', (req, res)=> {
    res.status(200).json({
        status: true,
        message: 'Hi, book lovers! Welcome to our home page! Hope you find the book you are looking for. Have a good day!'
    })
})

routes.use('/user', userRoute);
routes.use('/book', booksRoute);
routes.use('/genre', genresRoute);

module.exports = routes;