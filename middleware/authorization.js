const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const {JWT_SECRET} = require('../config/key')




const verifyToken = async (req, res, next) => {
  
//   const {authorization } = req.headers;
//     if(!authorization){
//         return res.status(401).json({error:"You must login to access this page" })
//     }
//     try {
//  const token = authorization.replace('Bearer', '')

// const verify =  jwt.verify(token , process.env.JWT_SECRET, async (payload)=>{
     
// const {_id} = payload

// const userdata = await User.findById(_id)
//         req.user = userdata
//         next()
//     })
        
//     } catch (error) {
//      res.status(400).json('Invalid token')   
//     }
    
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
 
jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    return res.status(401).send({
      message: "Unauthorized!"
    });
  }
  req.userId = decoded._id;
  next();
});



};


module.exports = { verifyToken  }