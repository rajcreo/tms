const { get } = require('lodash');
const { verifyToken } = require('./../services/auth');


module.exports = (resolver, isPublic) => async (req, res) => {
  try {
    let user = {};
    if (!isPublic) user = verifyToken(get(req, 'headers.token', ''));
    const data = await resolver({
      body: req.body,
      params: req.params,
      query: req.query,
      user,
    });

    setTimeout(() => {
      res.send({ data, success: true });
    }, 3000);
  } catch (e) {
    console.error('error:', e.message);
    res.send({
      success: false,
      message: e.message,
    });
  }
};
