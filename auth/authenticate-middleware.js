const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    const secret = process.env.JWT_SECRET || 'Something super secret here'
    jwt.verify(authorization, secret, function(error, decodeToken) {
      if (error) {
        res.status(401).json({ message: 'Invalid token'})
      } else {
        req.token = decodeToken;
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'You shall not pass.'})
  };
}; 

module.exports = {
  authenticate
}
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };
