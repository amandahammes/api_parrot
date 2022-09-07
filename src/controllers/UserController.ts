import { PostController } from './PostController';
import { postRepository } from './../repositories/postRepository';
import { userRepository } from './../repositories/userRepository';
import { User } from './../entity/User';
import { Post } from '../entity/Post';
import { Request, Response } from "express"
import { validate } from 'class-validator';



export class UserController {
    
	static createUser = async (req: Request, res: Response) => {
		const { name, email, apartment, role, password  } = req.body

		try {
			const newUser = userRepository.create({ name, email, apartment, password, role })

			const errors = await validate(newUser)
        if(errors.length > 0) {
          return res.status(400).send(errors)
        }

			newUser.hashPassword()
			await userRepository.save(newUser)

			return res.status(201).json(newUser)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}


	static editUser = async (req: Request, res: Response) => {
		const { name, apartment, email, role } = req.body
		const idUser : number = parseInt(req.params.id)
		let user : User

		try {
			user = await userRepository.findOneOrFail({where: {idUser: Number(idUser)}})
		} catch (error) {
				return res.status(404).send("User not found")
		}

		if(name) {
			user.name = name
		}
		
		if(email) {
				user.email = email
			}
			
		if(apartment) {
			user.apartment = apartment
		}

		if(role) {
			user.role = role
		}
		
		const errors = await validate(user)

        if (errors.length > 0) {
            return res.status(400).send(errors)
        }

        try {
            await userRepository.save(user)    
        } catch (error) {
            return res.status(409).send("Email already in use")
        }

        return res.status(201).send("edited user")
    }	

	static userById = async (req: Request, res: Response) => {
        const idUser = req.params.idUser
				// console.log(id)
        let user: User

        try {
            user = await userRepository.findOneOrFail({where: {idUser: Number(idUser)}})
        } catch (error: any) {
            return res.status(404).send("User not found")            
        }
      
        return res.send(user)
    }

	static allUser = async (req: Request, res: Response) => {      
        const users = await userRepository.find({
            select: [ "idUser", "name", "email", "apartment" ]
        })

        return res.send(users)
    }	

		static deleteUser = async (req: Request, res: Response) => {
			const idUser = req.params.id

			
			let user: User

			try {
				user = await userRepository.findOneOrFail({where: {idUser: Number(idUser)}})
			} catch (error: any) {
				return res.status(404).send('User not found')
			}

			userRepository.delete(idUser)

			return res.status(204).send()
	}


	

}