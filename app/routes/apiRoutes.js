const Router = require('express-promise-router');
const router = new Router();
const asyncMiddleware = require('./../middleswares/asyncMiddleware');
const { getExamsList, getExam, addExam, updateExam, deleteExam } = require('../services/exam/index');
// var { verifyToken } = require('./../services/auth');
const { login, signup, authenticate } = require('../services/user/index');
const { PUBLIC_API } = require('./../constants/index');

router.get('/', function (req, res) {
  setTimeout(() => {
    res.send({ hi: 'hello world!' });
  }, 5000);
});

router.post('/login', asyncMiddleware(login, PUBLIC_API));
router.post('/signup', asyncMiddleware(signup, PUBLIC_API));
router.post('/authenticate', asyncMiddleware(authenticate, PUBLIC_API));
router.get('/exams', asyncMiddleware(getExamsList));
router.get('/exam/:id', asyncMiddleware(getExam));
router.post('/exam', asyncMiddleware(addExam));
router.put('/exam/:id', asyncMiddleware(updateExam));
router.delete('/exam/:id', asyncMiddleware(deleteExam));
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
