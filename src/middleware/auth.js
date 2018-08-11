import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secreteKey = process.env.SECRET_KEY;

const verifyUserToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.headers.auth;
  if (token) {
    jwt.verify(token, secreteKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 'fail',
          message: 'You do not have permission to use this resources',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      status: 'fail',
      message: 'Please login',
    });
  }
};
export default verifyUserToken;
