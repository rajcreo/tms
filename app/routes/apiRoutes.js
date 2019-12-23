const Router = require('express-promise-router');
const router = new Router();
const asyncMiddleware = require('./../middleswares/asyncMiddleware');
// var { verifyToken } = require('./../services/auth');
const { login, signup } = require('../services/user/index');

router.get('/', function (req, res) {
  res.send({ hi: 'hello world!' });
});

router.post('/login', asyncMiddleware(login));
router.post('/signup', asyncMiddleware(signup));
router.post('/authenticate', asyncMiddleware(signup));

module.exports = router;


// router.post('/authenticate', (req, res) => {
//   const { token } = req.body;
//   const user = verifyToken(token);
//   res.send({
//     user,
//     success: true,
//     message: 'login successful',
//   });
// });
