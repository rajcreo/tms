const { verifyToken } = require('../auth');

module.exports = async ({ token }) => {
  if (!token) throw new Error('Invalid Token');
  const user = verifyToken(token);
  return { token, user };
};
