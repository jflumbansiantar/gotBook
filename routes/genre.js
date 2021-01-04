const { Router } = require('express');
const router = Router();
const { GenreController } = require('../controllers/genre')
const { BookController } = require('../controllers/movies');
const { authentication, authorization } = require('../middlewares/auth');

//Books
router.get('/', GenreController.getGenre)
router.post('/add', authentication, authorization, GenreController.addGenre)
router.get('/find/title', BookController.searchGenre)
router.get('/find/:id', authentication, BookController.findGenre)
router.put('/update/:id', authentication, authorization, GenreController.editGenre)
router.delete('/delete/:id', authentication, authorization, GenreController.deleteGenre)

module.exports = router;