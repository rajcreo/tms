const { get } = require('lodash');
const client = require('../../db/index');
var { createToken } = require('../auth');

module.exports = async ({ name, email, password, city }) => {
  let token = null;
  let user = null;

  const query = `SELECT count(email) from "Users" where email='${email}'`;
  const res = await client.query(query);
  const count = get(res, 'rows.0.count', null);

  if (count === '0') {
    const query = `INSERT INTO "Users" (name, email, password, city ) VALUES ('${name}', '${email}', '${password}', '${city}') RETURNING id, name, email, city`;
    const res = await client.query(query);
    user = get(res, 'rows.0', null);
    token = createToken(user);
  } else {
    throw new Error('Email already registered!');
  }

  return { token, user };
};
