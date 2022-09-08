import { Router } from "express";
import { LoginController } from './../controllers/LoginController';
import { UserController } from "../controllers/UserController"
import { PostController } from "../controllers/PostController"
import { loginMiddleware } from '../middlewares/loginMiddleware';

const routes = Router()

//login
routes.post("/login", new LoginController().login)
//criar novo usuário
routes.post("/user", UserController.createUser)
//editar usuário
routes.put("/user/:idUser",loginMiddleware, UserController.editUser)
//listar todos usuários
routes.get("/user", loginMiddleware, UserController.listAll)
////create new post
routes.post("/post", loginMiddleware, PostController.createPost)
//get all posts
routes.get("/post/getall", new PostController().listAll)
//get all posts by id
routes.get("/post/user", loginMiddleware, new PostController().listById)

export default routes