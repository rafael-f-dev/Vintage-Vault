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
         if (user) {
            return res.send({ok:false, data:"Invalid credentials"});
         }

         const hash = await argon2.hash(password);
         const newUser = {
            email,
            password: hash,
         }
         const userCreated = await Users.create(newUser);
         const token = jwt.sign(userCreated.toJSON(), jwt_secret, { expiresIn: "1h" })
         return res.send({ok:true, data:"Registered successfully", token, userId: userCreated._id});
      }
      catch (err) {
        return res.send({ok:false, data:"Something went wrong", err});
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
            res.send({ok:true, data: "Welcome back", token, userId: user._id, email });
         } else return res.send({ ok:false, data:"Invalid credentials"});
      }
      catch (err) {
         return res.send({ok:false, data:"Something went wrong"}, err);
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

   async delete (req, res) {
      let { email, password} = req.body;

      if (!email || !password) {
         return res.send({ ok: false, data: "Email and password are required." });
      }

      try{
          const user = await Users.findOne({email});

          if (!user) {
            return res.send({ ok: false, data: "User not found." });
          }

          const match = await argon2.verify(user.password, password);
          if (!match) {
            return res.send({ ok: false, data: "Invalid credentials." });
          }

          await Users.deleteOne({ email });
          res.send({ ok: true, data: "User removed successfully." });
      }
      catch(err){
          res.send({err});
      }
  }

  async update (req, res) {
    let { updateData } = req.body;
    const userId = req.params.userId;
    try{
      const updatedUser = await Users.findByIdAndUpdate(userId, updateData, {
         new: true, 
         runValidators: true
      });
      if (!updatedUser) {
      return res.status(404).send({ ok: false, data: "User not found" });
      }
      res.send({ ok: true, data: "User details updated successfully"});
    } catch (err) {
      res.send({err});
    }
  }

   async getUser (req,res) {
     try {
      const user = await Users.findById(req.params.id);
      if (!user) return res.send({ok: false, data: "User not found"});
      res.send(user);
     } catch (err){
      res.send({err});
     }
   };

}

module.exports = new User();