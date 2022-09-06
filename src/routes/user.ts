import {Router} from "express"
import { UserController } from "../controllers/UserController"

const routes = Router()

//create new user
routes.post("/", UserController.create)
//editar usuário
routes.put("/:id", UserController.edit)
//deletar usuário

//listar por id
routes.get("/:id", UserController.listId)
//listar todos
routes.get("/", UserController.listAll)

export default routes
