import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "admin",
    database: "auth-express-angular",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})
