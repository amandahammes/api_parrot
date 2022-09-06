import {Router} from "express"
import { PostController } from "../controllers/PostController"

const routes = Router()

//create new post
routes.post("/", PostController.create)
//edit post
routes.put("/:id([0-9]+)", PostController.edit)
//delete post
routes.delete("/:id([0-9]+)", PostController.del)
//get by id
routes.get("/:id([0-9]+)", PostController.listById)

export default routes
