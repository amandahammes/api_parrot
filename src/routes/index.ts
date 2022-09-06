import { Router } from "express";
import post from "./post"
import user from "./user"

const routes = Router()

routes.use("/user", user)
routes.use("/post", post)

export default routes