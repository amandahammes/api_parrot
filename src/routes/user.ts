import {Router} from "express"
import { UserController } from "../controllers/UserController"

const routes = Router()

//create new user
routes.post("/", UserController.create)
//editar usuário
routes.put("/:id([0-9]+)", UserController.edit)
//listar por id
routes.get("/:id", UserController.listId)
//listar todos
routes.get("/", UserController.listAll)

export default routes
