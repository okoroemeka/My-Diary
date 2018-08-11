import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnection from '../model/config';

class Users {
  static signUp(req, res) {
    const checkUserQuery = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email.trim()],
    };
    const query = {
      text: 'INSERT INTO users(firstname,lastname,email,password) VALUES($1, $2, $3, $4) RETURNING *',
      values: [req.body.firstname.trim(), req.body.lastname.trim(), req.body.email.trim(), bcrypt.hashSync(req.body.password.trim(), 10)],
    };
    if ((req.body.firstname === undefined && req.body.firstname.trim().length === 0)
    && (req.body.lastname === undefined && req.body.lastname.trim().length === 0)
    && (req.body.email === undefined && req.body.email.trim().length === 0)
    && (req.body.password === undefined && req.body.password.trim().length === 0)) {
      return res.status(400).send({
        status: 'fail',
        message: 'all fields are required',
      });
    } if (req.body.password.trim() !== req.body.confirmPassword.trim()) {
      return res.status(400).send({
        status: 'fail',
        message: 'please confirm your password and retype again',
      });
    } if (req.body.password.trim().length < 6) {
      return res.status(400).send({
        status: 'fail',
        message: 'password length must be more than 6',
      });
    }
    dbConnection.query(checkUserQuery)
      .then((users) => {
        if (users.rowCount !== 0) {
          return res.status(409).send({
            status: 'fail',
            message: 'user already exist',
          });
        }
        return dbConnection.query(query)
          .then((newUser) => {
            res.status(201).send({
              status: 'success',
              message: 'user created, you can now log in',
              data: {
                firstname: newUser.rows[0].firstname,
                lastname: newUser.rows[0].lastname,
                email: newUser.rows[0].email,
              },
            });
          });
      })
      .catch(err => res.status(500).send({
        status: 'error',
        mesage: 'internal server error, please try again',
      }));
  }

  static signIn(req, res) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email.trim()],
    };

    dbConnection.query(query)
      .then((user) => {
        if (user.rowCount === 0) {
          return res.status(400).send({
            status: 'fail',
            message: 'please Sign up',
          });
        }
        if (bcrypt.compareSync(req.body.password.trim(), user.rows[0].password)) {
          const token = jwt.sign(
            {
              user_id: user.rows[0].id,
              firstname: user.rows[0].firstname,
              email: user.rows[0].email,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: '24hr',
            },
          );
          return res.status(200).send({
            status: 'success',
            message: 'welcome to My Dairy',
            token,
          });
        }

        return res.status(400).send({
          status: 'fail',
          message: 'wrong email or password',
        });
      })
      .catch(err => res.status(500).send(err));
  }
}
export default Users;
