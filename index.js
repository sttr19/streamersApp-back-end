import express from "express";
import cors from "cors";
import mongoDB from "mongoose";
import {
  registerValidation,
  loginValidation,
  streamerCreateValidation,
} from "./middlewares/validations.js";
import checkAuth from "./middlewares/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as StreamerController from "./controllers/StreamerController.js";

mongoDB
  .connect(
    "mongodb+srv://stastroshko:TLlYCOOGEqoUo9ql@cluster0.dmyi1rt.mongodb.net/app-streamers"
  )
  .then(() => console.log("DB ok!"))
  .catch((err) => console.log("DB error!", err));

const app = express();

app.use(express.json()); //читает в теле запроса json формат (при POST)
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello world!");
});

////регистрация пользователя

app.post("/register", registerValidation, UserController.register);

///авторизация пользователя

app.post("/login", loginValidation, UserController.login);



///добавление нового стриммера

app.post(
  "/streamers",
  checkAuth,
  streamerCreateValidation,
  StreamerController.create
);


///получить всех стриммеров 

app.get("/streamers", loginValidation, StreamerController.getAll);


app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK!");
});
