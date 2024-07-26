import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const signup = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    db.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
      if (err) {
        return next(err);
      }

      if (results.length > 0) {
        return res.status(409).json({ message: "User already present with this email" });
      }

      db.query(
        "INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
        [first_name, last_name, email, hashedPassword],
        (err, results) => {
          if (err) {
            return next(err);
          }
          res.status(201).json({ message: "User created successfully!" });
        }
      );
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  db.query("SELECT * from user where email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcryptjs.compare(password,result[0].password,(error,response)=> {
        if(response){
          const id = result[0].id;
          const token = jwt.sign({id}, "mysecret",{
            expiresIn: 100000,
          });
          res.json({auth: true, token:token, result:result});

        }else{
          res.json({auth: false,message:"Wrong credentials"});
        }
      })
    } else {
      res.json({auth: false,message:"No user exists!"});
    }
  });
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

