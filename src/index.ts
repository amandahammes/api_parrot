import express, {Request, Response} from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import routes from "./routes"

AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.json())

    app.use(routes)

    return app.listen(3003, () => {
        console.log("Server started on 3003.")
    })
})
.catch((error) => console.log(error))