const jwt = require('jsonwebtoken');

function createToken(user) {
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET || 'Something super secret here';

  const options = {
    expiresIn: '7d',
  };
;
  return jwt.sign(payload, secret, options);
}



module.exports = {
  createToken
};
