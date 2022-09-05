import {Router} from "express"
import { UserController } from "../controllers/UserController"

const routes = Router()

//create new user
routes.post("/", UserController.create)
//editar usuário

//deletar usuário

//listar por id

//listar todos


export default routes
