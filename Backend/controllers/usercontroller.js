import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import transporter from '../config/emailconfig.js'

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, dob } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (user) {
        return res.send({ status: "failed", message: "Email already exists" });
    }

    if (name && email && password && dob) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const doc = new UserModel({
                name: name,
                email: email,
                password: hashPassword,
                dob: dob
            });

            await doc.save();

            const saved_user = await UserModel.findOne({ email: email });

            const token = jwt.sign(
                { userID: saved_user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "5d" }
            );

            res.status(201).send({
                status: "success",
                message: "Registered Successfully",
                token: token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: "failed",
                message: "Unable to Register"
            });
        }
    } else {
        res.send({ status: "failed", message: "All fields are required" });
    }
};


  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "Login Success",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({ status: "failed", message: "You are not registered yet" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };

}
export default UserController;
