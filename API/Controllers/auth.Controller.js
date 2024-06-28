import { errorHandler } from "../utils/error.js";
import User from "./../Models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const hashPass = bcryptjs.hashSync(password, 10);
    const user = new User({ userName, email, password: hashPass });
    await user.save();
    res.json({ message: "Sign up successful" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    next(errorHandler(400, "All field are required"));
  }
  try {
    const valideUser = await User.findOne({ email });
    if (!valideUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, valideUser.password);
    if (!validPassword) return next(errorHandler(400, "Invalid password"));
    const token = jwt.sign(
      {
        id: valideUser._id,
      },
      process.env.JWT_KEY
    );
    console.log(valideUser._doc);
    const { password: pass, ...rest } = valideUser._doc;

    res
      .status(200)
      .cookie("access-token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access-token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
