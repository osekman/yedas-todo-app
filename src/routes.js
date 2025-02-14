const express = require('express');

const mw = require('./middlewares');

const router = express.Router()


const authController = require('./controllers/AuthController');
const userController = require('./controllers/UserController');
const taskController = require('./controllers/TaskController');
const tagController = require('./controllers/TagController');


router.get('/', (req, res) => {
    // HTML dosyasını gönderiyoruz
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//user
router.get(`/api/user`, mw.adminMiddleware, userController.read);
router.post(`/api/user`, mw.adminMiddleware, userController.create);
router.put(`/api/user`, userController.update);
router.delete(`/api/user`, mw.adminMiddleware, userController.delete);

//görev işlemleri
router.get(`/api/task`, taskController.read);
router.post(`/api/task`, taskController.create);
router.put(`/api/task`, taskController.update);
router.delete(`/api/task`, taskController.delete);

//tag işlemleri
router.get(`/api/tag`, tagController.read);
router.post(`/api/tag`, tagController.create);
router.put(`/api/tag`, tagController.update);
router.delete(`/api/tag`, tagController.delete);

// hesap sayfası için
router.get(`/api/user/account`, userController.account);

//auth login
router.get(`/api/auth/test`, authController.test);
router.get(`/api/auth/login`, authController.login);

router.post(`/api/auth/login`, authController.login);


router.use(function (req, res, next) {
    res.status(404).end('Aradığınız sayfa bulunamadı!');
});

module.exports = router;