import { Post } from './../entity/Post';
import { Request, Response } from "express"
import { postRepository } from "../repositories/postRepository"

export class PostController {
	static createPost = async (req: Request, res: Response) => {
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

    // static editPost = async (req:Request, res: Response) => {
    //     const id: any = req.params.idPost
    //     const { content } = req.body
    //     let post: Post
        
    //     try {
    //         post = await postRepository.findOneOrFail({where: id})
    //     } catch (error) {
    //         return res.status(404).send("Post not found")
    //     }
        
    //     if(content){
    //         post.content = content
    //     }
        
    //     return res.status(204).send("Post modified")
    // }

    async listById (req: Request, res: Response){
        const idAtual = req.user.idUser;
        const userPosts = await postRepository.find({
            where:{
                    user:{
                            idUser:idAtual
                    }
        }});
        return res.json(userPosts)
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
    }})

        return res.status(200).json(posts)
    }
        
}