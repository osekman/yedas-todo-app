const express = require('express');

const router = express.Router()


const authController = require('./controllers/AuthController');
const userController = require('./controllers/UserController');


router.get('/', (req, res) => {
    // HTML dosyasını gönderiyoruz
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//user
router.get(`/api/user`, userController.login);
router.post(`/api/user`, userController.login);
router.put(`/api/user`, userController.login);
router.delete(`/api/user`, userController.login);

router.get(`/api/user/account`, userController.account);

//auth login
router.get(`/api/auth/test`, authController.test);
router.get(`/api/auth/login`, authController.login);

router.post(`/api/auth/login`, authController.login);


router.use(function (req, res, next) {
    res.status(404).end('Aradığınız sayfa bulunamadı!');
});

module.exports = router;