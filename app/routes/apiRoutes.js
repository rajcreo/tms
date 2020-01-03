const Router = require('express-promise-router');
const router = new Router();
const asyncMiddleware = require('./../middleswares/asyncMiddleware');
const exams = require('../services/exam/index');
// var { verifyToken } = require('./../services/auth');
const { login, signup, authenticate } = require('../services/user/index');
router.get('/', function (req, res) {
  res.send({ hi: 'hello world!' });
});

router.post('/login', asyncMiddleware(login));
router.post('/signup', asyncMiddleware(signup));
router.post('/authenticate', asyncMiddleware(authenticate));
router.get('/exams', asyncMiddleware(exams.getExamsList));
router.get('/exam/:id', asyncMiddleware(exams.getExam));
router.post('/exam', asyncMiddleware(exams.addExam));
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
