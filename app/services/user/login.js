const { get } = require('lodash');
const client = require('../../db/index');
var { createToken } = require('../auth');

module.exports = async ({ username, password }) => {
  let token = null;
  let user = null;
  try {
    const query = `SELECT id, name, email, city from "Users" where email='${username}' AND password='${password}'`;
    console.debug('query::', query);
    const res = await client.query(query);
    user = get(res, 'rows.0', null);
    if (user) token = createToken(user);
    else throw new Error('Wrong username & password combination!');
  } catch (e) {
    throw new Error(e.message);
  }
  return { token, user };
};
