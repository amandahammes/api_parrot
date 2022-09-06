import { Request, Response } from "express"
import { postRepository } from "../repositories/postRepository"
import { Post } from "../entity/Post"

export class PostController {
	static create = async (req: Request, res: Response) => {
		const { content } = req.body

		try {
			const newPost = postRepository.create({ content })

			await postRepository.save(newPost)

			return res.status(201).json(newPost)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}
    
    static listById = async(req:Request, res: Response) => {
        const posts = await postRepository.find({select:["id", "content"]})

        return res.send(posts)
    }

    static del = async (req:Request, res: Response) => {
        const id: any = req.params.id
        let post: Post
        
        try {
            post = await postRepository.findOneByOrFail(id)
        } catch (error) {
            return res.status(404).send("User not found.")
        }
        
        postRepository.delete(id)
        
        return res.status(204).send()
    }
    
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
    
}
