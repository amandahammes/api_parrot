import { NextFunction, Request, Response } from "express";
import { userRepository } from './../repositories/userRepository';
import jwt from "jsonwebtoken";
import config from '../config/config'


type JwtPayLoad = {
    idUser: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    
    if (!authorization){
        return res.status(403).json({message: "O Usuário não está logado!"});
    }

    const token = authorization.split(" ")[1];

    const { idUser }  = jwt.verify(token, config.jwtSecret) as JwtPayLoad;

    const user = await userRepository.findOneOrFail({where: {idUser: Number(idUser)}});

    if(!user) {
        return res.status(403).json({message: "Não Autorizado"});
    }
    
    const { password:_, ...loggedUser } = user;

    req.user = loggedUser

    next();
}