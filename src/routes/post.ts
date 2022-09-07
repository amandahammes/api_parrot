// import { checkJwt } from './../middlewares/checkJwt';
import { UserController } from './../controllers/UserController';
import { Router } from "express"
import { PostController } from "../controllers/PostController"

const routes = Router()


//create post 
routes.post('/:id',  PostController.createPost)
//edit post
routes.put("/:id", PostController. allPost)
//get by id
routes.get("/:id", UserController.userById)

export default routes
