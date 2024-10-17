const Users = require("../models/users.js");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;

class User {

   async register(req,res) {
        const { email, password, password2 } = req.body;
        if (!email || !password || !password2)
            return res.send({ok:false, data:"All fields required"});
        if (password !== password2) 
            return res.send({ok:false, data:"Passwords must match"});
        if (!validator.isEmail(email))
            return res.send({ok:false, data:"Email invalid"});
      try {
         const user = await Users.findOne({ email });
         if (user) res.send({ok:false, data:"Invalid credentials"});
         const hash = await argon2.hash(password);
         const newUser = {
            email,
            password: hash,
         }
         await Users.create(newUser);
         res.send({ok:true, data:"Registered successfully"});
      }
      catch (err) {
        res.send({ok:false, data:"Something went wrong", err});
      }
   }

   async login(req,res) {
         const { email, password } = req.body;
         if (!email || !password) 
            return res.send({ok:false, data:"All fields required"});
         if (!validator.isEmail(email)) 
            return res.send({ok:false, data:"Email invalid"});
      try {
         const user = await Users.findOne({ email });
         if (!user) return res.send({ok:false, data:"Invalid credentials"});
         const match = await argon2.verify(user.password, password);
         if (match) {
            const token = jwt.sign(user.toJSON(), jwt_secret, { expiresIn: "1h" })
            res.send({ok:true, data: "Welcome back", token, email });
         } else return res.send({ ok:false, data:"Invalid credentials"});
      }
      catch (err) {
         res.send({ok:false, data:"Something went wrong"}, err);
      }
   }

   async verify_token(req,res) {
      const token = req.headers.authorization;
      jwt.verify(token, jwt_secret, (err, succ) => {
         err ?
         res.send({ok:false, data:"Something went wrong"})
         : res.send({ok:true, succ});
      });

   }

}

module.exports = new User();