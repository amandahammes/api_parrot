import {Router} from "express"
import { UserController } from "../controllers/UserController"

const routes = Router()

//create new user
routes.post("/", new UserController().create)


export default routes
