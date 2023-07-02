import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";              //user data model in DB

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save(); //saving to DB

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "keyReg",
      {
        expiresIn: "31d",
      }
    );

    const { passwordHash, ...userData } = user._doc; //убираем passwordHash из ответа сервера
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    ); //сравнение пароля в запросе с паролем в БД

    if (!isValidPass) {
      return res.status(400).json({ message: "Wrong login or password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "keyReg",
      {
        expiresIn: "31d",
      }
    );

    const { passwordHash, ...userData } = user._doc; //убираем passwordHash из ответа сервера
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to login",
    });
  }
};



