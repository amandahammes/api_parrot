import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entity/*.{ts,js}`],
    migrations: [`${__dirname}/**/migration/*.{ts,js}`]
})


// para seeders
// const options: DataSourceOptions & SeederOptions = {
//     type: 'mysql',
//     host: process.env.DB_HOST,
//     port: port,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     entities: [`${__dirname}/**/entity/*.{ts,js}`],
//     migrations: [`${__dirname}/**/migration/*.{ts,js}`],
//     seeds: []
// }

// export const AppDataSource = new DataSource(options)
