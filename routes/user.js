const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/users');
const { authentication, authorization } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer')

router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.put('/edit/:id', authentication, upload.single('image'), usersController.editUsers)

module.exports = router;
