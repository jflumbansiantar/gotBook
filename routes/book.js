const { Router } = require('express');
const router = Router();
const { GenreController } = require('../controllers/genre')
const { BookController } = require('../controllers/movies');
const { authentication, authorization } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer')


//Books
router.get('/:page', BookController.getBook)
router.post('/add', authentication, authorization, upload.single('picture'), BookController.addBook)
router.get('/find/title', BookController.searchBook)
router.get('/find/:id', authentication, BookController.findBook)
router.put('/update/:id', authentication, authorization, upload.single('picture'), BookController.editBook)
router.delete('/delete/:id', authentication, authorization, BookController.deleteBook)

module.exports = router;
