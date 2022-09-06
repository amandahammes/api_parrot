import { userRepository } from './../repositories/userRepository';
import { User } from './../entity/User';
import { Request, Response } from "express"

export class UserController {
    
	static create = async (req: Request, res: Response) => {
		const { name, email, apartment, password  } = req.body

		try {
			const newUser = userRepository.create({ name, email, apartment, password })

			await userRepository.save(newUser)

			return res.status(201).json(newUser)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	static edit = async (req: Request, res: Response) => {
		const id: number = parseInt(req.params.iduser, 10)
		const { name, email, apartment } = req.body
		let user: User

		try {
			user = await userRepository.findOneByOrFail({id})
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
	}	

	static listId = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.iduser, 10)
        let user: User

        try {
            user = await userRepository.findOneByOrFail({id})
        } catch (error) {
            return res.status(404).send("User not found")            
        }
       
        return res.send(user)
    }

	static listAll = async (req: Request, res: Response) => {      
        const users = await userRepository.find({
            select: ["name", "email", "apartment" ]
        })

        return res.send(users)
    }	
}


// static del = async (req:Request, res: Response) => {
	// 	const id: any = req.params.id
	// 	let user: User

	// 	try {
	// 		user = await userRepository.findOneOrFail(id)
	// 	} catch (error) {
	// 		return res.status(404).send("User not found.")
	// 	}
		
	// 	userRepository.delete(id)

	// 	return res.status(204).send()
	// }