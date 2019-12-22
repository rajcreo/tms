const { get } = require('lodash');
const client = require('./../../db/index');
var { createToken } = require('./../auth');

module.exports = {
  login: async ({ username, password }) => {
    let token = null;
    let user = null;
    try {
      const query = `SELECT id, name, email, city from "Users" where email='${username}' AND password='${password}'`;
      console.debug('query::', query);
      const res = await client.query(query);
      user = get(res, 'rows.0', null);
      if (user) token = createToken(user);
    } catch (e) {
      console.error(e);
    }

    return { token, user };
  },

  signup: async ({ name, email, password, city }) => {
    let token = null;
    let user = null;

    try {
      const query = `SELECT count(email) from "Users" where email='${email}'`;
      const res = await client.query(query);
      const count = get(res, 'rows.0.count', null);

      if (count === '0') {
        const query = `INSERT INTO "Users" (name, email, password, city ) VALUES ('${name}', '${email}', '${password}', '${city}') RETURNING id, name, email, city`;
        const res = await client.query(query);
        user = get (res, 'rows.0', null);
        token = createToken(user);
      } else {
        console.log('Error......');
      }
    } catch (e) {
      console.error(e);
    }

    return { token, user };
  },
};
