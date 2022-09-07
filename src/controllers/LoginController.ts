import { Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import { userRepository } from '../repositories/userRepository'
import { User } from '../entity/User'
import config from '../config/config'
import { validate } from 'class-validator';




class AuthController {
  static login =async (req: Request, res: Response) => {
    let { email , password } = req.body

    if(!(email && password)) {
      return res.status(404).send()
    }

    
    let user: User

    try {
      user = await userRepository.findOneOrFail({where: {email: email}})
    } catch (error: any) {
      return res.status(401).send('User not found!')
    }

    if(!user.checkPasswordValid(password)){
      return res.status(401).send('Password or user not found!')
    }
  
    const { password:_ , ...loggedUser } = user
    const token = jwt.sign(
      {user: user.id},
      config.jwtSecret,
      { expiresIn: "1h"})


    return res.send(token)
  }

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId

    const {oldPassword, newPassword} = req.body
    if(!(oldPassword && newPassword)) {
      return res.status(400).send()
    }

    
    let user: User

    try {
      user = await userRepository.findOneOrFail({where: id})
    } catch (error: any) {
      return res.status(401).send('User not found!')
    }

    if(!user.checkPasswordValid(oldPassword)){
      return res.status(401).send('old password not match')
    }

    user.password = newPassword
    const errors = await validate(user)
    if(errors.length > 0) {
      return res.status(400).send(errors)
    }

    user.hashPassword()
    userRepository.save(user)

    return res.status(204).send('Password changed')
  }
}

export default AuthController