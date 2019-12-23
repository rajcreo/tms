const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const privateKEY = fs.readFileSync(path.join(__dirname, './../../config/private.key'), 'utf8');
const publicKEY = fs.readFileSync(path.join(__dirname, './../../config/public.key'), 'utf8');


const i = 'Rohit Sharma'; // issuer
const s = 'public'; // subject
const a = 'http://rohitsharma.xyz'; // audience
const options = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '12h',
  algorithm: 'RS256',
};

module.exports = {
  createToken: (payload) => jwt.sign(payload, privateKEY, options),
  verifyToken: (token) => jwt.verify(token, publicKEY, options),
};
