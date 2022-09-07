import {Router} from "express"
import { UserController } from "../controllers/UserController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { checkJwt } from "../middlewares/checkJwt"
// import { checkRole } from "../middlewares/checkRole"

const routes = Router()


//create new user
routes.post("/", UserController.createUser)
//editar usuário
routes.put("/:id", UserController.editUser)
//listar por id
//listar todos
routes.get("/",[checkJwt], UserController.allUser)
//delete user
routes.delete("/:id",  UserController.deleteUser)




export default routes
