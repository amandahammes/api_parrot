import { Router } from "express";
import login from "./login"
import post from "./post"
import user from "./user"

const routes = Router()

routes.use("/user", user)
routes.use("/post", post)
routes.use('/login', login)

export default routes