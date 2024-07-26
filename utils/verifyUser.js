import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if(!token){
    res.send('we need token');
  }else{
    jwt.verify(token,"mysecret",(err,decoded)=>{
      if(err){
        res.json({auth:false,message:"u failed to auth"})
      }else{
        req.id = decoded.id;
        next();
      }
    })
  }
};