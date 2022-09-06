import express from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"

AppDataSource.initialize().then(() => {
    const app = express()
    app.use(express.json())

    app.use(routes)

    return app.listen(3443, () => {
        console.log("Server started on 3443.")
    })
})
.catch((error) => console.log(error))