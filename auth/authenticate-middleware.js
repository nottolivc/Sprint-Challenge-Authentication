const jwt = require('jsonwebtoken');


const jwtToken = process.env.JWT_SECRET || 'super secret thing here';


// auth middleware function
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (error, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    })
  } else {
    return res.status(401).json({
      error: 'you shall not pass!',
    })
  }
}

module.exports = {
  authenticate,
  jwtToken
};
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };

