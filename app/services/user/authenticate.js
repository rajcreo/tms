const { verifyToken } = require('../auth');

module.exports = async ({ body }) => {
  const { token } = body;
  if (!token) throw new Error('Invalid Token');
  const user = verifyToken(token);
  return { token, user };
};
