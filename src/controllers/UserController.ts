import { userRepository } from './../repositories/userRepository';
import { User } from './../entity/User';
import { Request, Response } from "express"
import { validate } from 'class-validator';

export class UserController {
    
	static create = async (req: Request, res: Response) => {
		const { name, email, apartment, role, password  } = req.body

		try {
			const newUser = userRepository.create({ name, email, apartment, password, role })

			await userRepository.save(newUser)

			return res.status(201).json(newUser)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	static edit = async (req: Request, res: Response) => {
		const { name, apartment, email, role } = req.body
		const idUser : number = parseInt(req.params.idUser)
		let user : User

		try {
			user = await userRepository.findOneByOrFail({ idUser: Number(idUser) })
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

	static listId = async (req: Request, res: Response) => {
        const idUser = req.params.idUser
        let user: User

        try {
            user = await userRepository.findOneByOrFail({ idUser: Number(idUser) })
        } catch (error) {
            return res.status(404).send("User not found")            
        }
       
        return res.send(user)
    }

	static listAll = async (req: Request, res: Response) => {      
        const users = await userRepository.find({
            select: [ "idUser", "name", "email", "apartment" ]
        })

        return res.send(users)
    }	
}