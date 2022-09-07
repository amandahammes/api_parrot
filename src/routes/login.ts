import { Router } from 'express'
import AuthController from '../controllers/LoginController'
// import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.post('/', AuthController.login)

router.post('change-password', AuthController.changePassword)

export default router