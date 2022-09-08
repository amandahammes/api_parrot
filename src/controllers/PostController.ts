import { userRepository } from './../repositories/userRepository';
import { Post } from './../entity/Post';
import { Request, Response } from "express"
import { postRepository } from "../repositories/postRepository"
import { loginMiddleware } from '../middlewares/loginMiddleware';
import { User } from "../entity/User"
import { trace } from 'console';

export class PostController {
	static create = async (req: Request, res: Response) => {
		const { content } = req.body

		try {
			const newPost = postRepository.create({ content , user: req.user})

			await postRepository.save(newPost)

			return res.status(201).json(newPost)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}
    
    // static listById = async(req:Request, res: Response) => {
    //     const idUser = req.user.idUser
    //     const usuario = await userRepository.findOneBy({idUser})
    //     console.log(usuario, idUser)
    //     if(!usuario){
    //         //pesquisar numero do status
    //         return res.status(404).json("usuario não encotrado")
    //     }
    //     // const user_idUser = idUser
        

    //     try {
    //         const post = await userRepository.findOne({where: idUser: parseInt(idUser)},{
    //             relations: {posts: true,},)
                        
    //         return res.status(200).send(post)
    //     } catch (error) {
    //         return res.status(404).json("usuario não encotrado")
    //     }
    
        
    // }
    
    static edit = async (req:Request, res: Response) => {
        const id: any = req.params.id
        const { content } = req.body
        let post: Post
        
        try {
            post = await postRepository.findOneOrFail({where: id})
        } catch (error) {
            return res.status(404).send("Post not found")
        }
        
        if(content){
            post.content = content
        }
        
        return res.status(204).send("Post modified")
    }
    
    async listAll (req: Request, res: Response) {
        const posts = await postRepository.find({
            relations: {
                user: true
            },
            select: {
                user: {
                    idUser: true,
                    name: true,
                    email: true,
                    apartment: true,
                }
            }
        })
    }
        
}