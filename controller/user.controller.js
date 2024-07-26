import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import db from "../config/db.js";

export const updateUser = async (req, res, next) => {};

export const deleteUser = async (req, res, next) => {};


export const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    db.query(
      "SELECT * from user where id = ?",
      id,
      (err, result)=> {
        if(err){
          res.json({
            status:false,
            message:"something went wrong"
          })
        }else{
          res.status(200).json({
            status:true,
            result
          })
        }
      }
    )
  } catch (error) {
    res.json({
      status:false,
      message:error.message})
  }
};