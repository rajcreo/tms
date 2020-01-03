const { get } = require('lodash');
const client = require('../../db/index');
const utils = require('./../../utils');
const { createToken } = require('../auth');

module.exports = async ({ name, email, password, city = '', phone }) => {
  console.log('phone:::::', phone);
  if (!utils.isValidName(name)) throw new Error('Invalid Name');
  if (!utils.isValidEmail(email)) throw new Error('Invalid Email');
  if (!utils.isValidPass(password)) throw new Error('Invalid Password');
  if (!utils.isValidPhone(phone)) throw new Error('Invalid Phone number');

  let token = null;
  let user = null;

  const query = `SELECT count(*) from "Users" where email='${email}' OR phone='${phone}'`;
  const res = await client.query(query);
  const count = get(res, 'rows.0.count', null);

  if (count === '0') {
    const query = `INSERT INTO "Users" (name, email, password, city, phone ) VALUES ('${name}', '${email}', '${password}', '${city}', ${phone}) RETURNING id, name, email, city`;
    const res = await client.query(query);
    user = get(res, 'rows.0', null);
    token = createToken(user);
  } else throw new Error('Email or Phone already registered!');

  return { token, user };
};
