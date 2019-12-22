var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send({ abcd: 'abcd' });
});

router.post('/login', (req, res, next) => {
  res.send({
    success: true,
    message: 'login successful'
  });
});


module.exports = router;
