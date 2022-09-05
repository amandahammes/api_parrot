import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"

export class UserController {
	async create(req: Request, res: Response) {
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
}