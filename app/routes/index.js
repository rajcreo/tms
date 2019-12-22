var express = require('express');
var router = express.Router();
var { verifyToken } = require('./../services/auth');
const { login, signup } = require('./../services/login/index');

router.get('/', function (req, res) {
  res.send({ hi: 'hello world!' });
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { user, token } = await login({ username, password });

  res.send({
    user,
    token,
    success: !!token,
    message: token ? 'Success' : 'user not found',
  });
});

router.post('/signup', async (req, res) => {
  const { name, email, password, city } = req.body;
  const { user, token } = await signup({ name, email, password, city });

  res.send({
    user,
    token,
    success: !!token,
    message: token ? 'Success' : 'User exists',
  });
});

router.post('/authenticate', (req, res) => {

  const { token } = req.body;

  const user = verifyToken(token);

  res.send({
    user,
    success: true,
    message: 'login successful'
  });
});


module.exports = router;
