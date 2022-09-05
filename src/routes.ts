import { Router } from "express";
import { SubjectController } from "./controllers/UserController";

const routes = Router()

routes.post('/subject', new SubjectController().create)

export default routes