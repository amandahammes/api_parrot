// import { Request, Response, NextFunction} from 'express'
// import * as jwt from 'jsonwebtoken'
// import config from '../config/config'

// import { User } from '../entity/User'



// export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
//   const token = <string>req.headers['auth']
//   let jwtPayload 

//   try {
//     jwtPayload = <any> jwt.verify(token, config.jwtSecret)
//     res.locals.jwtPayload = jwtPayload
//   }catch(error: any) {
//     res.status(401).send()
//   }

  
// const {user} = jwtPayload
// console.log(jwtPayload)
// const newToken = jwt.sign({user}, config.jwtSecret, {
//   expiresIn: '5h'
// })

// res.setHeader('token', newToken)

// next()
// }


import { Request, Response, NextFunction} from 'express'
import * as jwt from 'jsonwebtoken'
import { nextTick } from 'process'
import config from '../config/config'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers['auth']
  let jwtPayload

  try {
    jwtPayload = <any> jwt.verify(token, config.jwtSecret)
    res.locals.jwtPayload = jwtPayload
  }catch(error: any) {
    res.status(401).send()
  }

  
const { idUser, email } = jwtPayload
const newToken = jwt.sign({idUser, email}, config.jwtSecret, {
  expiresIn: '1h'
})

res.setHeader('token', newToken)

next()
}

