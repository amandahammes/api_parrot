import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'
import { userRepository } from './../repositories/userRepository';
import { postRepository } from './../repositories/postRepository';

export class PostController {


    static createPost = async (req: Request, res: Response) => {
        const token = <string>req.headers["auth"]
        let idUser

        try {
            const jwtPayload = <any>jwt.verify(token, config.jwtSecret)
            idUser = jwtPayload.userId
        } catch (error) {
            return res.status(401).send
        }

        const user = await userRepository.findOneBy({idUser})
        const { content } = req.body

        if (!user) return res.status(404).json({message: 'User not found'})

        const newPost = postRepository.create({
            content,
            user
        })

        await postRepository.save(newPost)

        return res.status(201).json({message: 'Post created successfully'})
    }

    static allPost = async (req: Request, res: Response) => {
        const posts = await postRepository.find({
            relations: {
                user: true
            },
            select: {
                user: {
                    idUser: true,
                    name: true,
                    apartment: true
                }
            }
        })
        return res.send(posts)
    }

    static allPostByUserId = async (req: Request, res: Response) => {
        const idUser: number = parseInt(req.params.idUser, 10)
        const user = userRepository.findOneBy({idUser})

        if (!user) return res.status(404).json({message: 'User not found'})

        const posts = await postRepository.find({
            where: {
                user: {
                    idUser: idUser
                }
            }
        })
        return res.send(posts)
        const e = "profile";
    }
}