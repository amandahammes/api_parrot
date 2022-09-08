import bcrypt from 'bcrypt';
import { userRepository } from './../repositories/userRepository';
import { BadRequestError } from './../helper/api-errors';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export class LoginController {
    async login (req:Request, res:Response){
        const { email, password } = req.body

        const user = await userRepository.findOneBy({email})

		if(!user) {
			throw new BadRequestError("E-mail or password are wrong!")
		}

        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass){
            throw new BadRequestError("E-mail or password are wrong!")
        }

        const token = jwt.sign({id: user.idUser}, process.env.JWT_PASS ?? '', {expiresIn: '8h'})

        const {password: _, ...userLogin} = user
        return res.json({
            user: userLogin,
            token: token,
        })
    }

}