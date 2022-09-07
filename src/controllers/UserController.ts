import { BadRequestError } from './../helper/api-errors';
import { userRepository } from './../repositories/userRepository';
import { User } from './../entity/User';
import { Request, Response } from "express"
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';

export class UserController {
    
	static createUser = async (req: Request, res: Response) => {
		const { name, email, apartment, role, password  } = req.body

		const emailExists = await userRepository.findOneBy({email})

		if(emailExists) {
			throw new BadRequestError("email already exist")
		}

		const hashPassword = await bcrypt.hash(password, 10)

		try {
			const newUser = userRepository.create({ name, email, apartment, password: hashPassword, role })
			await userRepository.save(newUser)
			const {password: _, ...user} = newUser
			return res.status(201).json(user)

		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	static editUser = async (req: Request, res: Response) => {
		const { name, apartment, email, role, password } = req.body
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
		
		if(password){
			const newPassword = bcrypt.hashSync(password, 10)
			user.password = newPassword
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

	// async listId (req: Request, res: Response) {
    //     let idUser: any = req.params.idUser
    //     let user: User

    //     try {
    //         user = await userRepository.findOneOrFail({ where: { idUser: Number(idUser) } })
    //     } catch (error) {
    //         return res.status(404).send("User not found")            
    //     }
       
    //     return res.send(user)
    // }

	// async getOneById(req: Request, res: Response) {
    //     const idUser: number = parseInt(req.params.iduser, 10)

    //     let user: User

    //     try {
    //         user = await userRepository.findOneOrFail({ where: { idUser: Number(idUser) } })
    //     } catch (error) {
    //         return res.status(404).send("User not found")            
    //     }
       
    //     return res.send(user)
    // }


	static listAll = async (req: Request, res: Response) => {      
        const users = await userRepository.find({
            select: [ "idUser", "name", "email", "apartment" ]
        })
        return res.send(users)
    }	
}