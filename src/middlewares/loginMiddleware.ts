import { UnauthorizedError } from './../helper/api-errors';
import { NextFunction, Request, Response } from "express";
import { userRepository } from './../repositories/userRepository';
import jwt from "jsonwebtoken";

type JwtPayLoad = {
    id: number
}

export const loginMiddleware = async (req:Request, res:Response, next: NextFunction) => {
    const {authorization} = req.headers

    if (!authorization){
        throw new UnauthorizedError("Unauthorizated")
    }
    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad
    
    const user = await userRepository.findOneOrFail({where:{idUser: id}})
    
    if(!user) {
        throw new UnauthorizedError("Unauthorizated")
    }

    const { password:_, ...loggedUser } = user;

    req.user = loggedUser
    
    next();

}