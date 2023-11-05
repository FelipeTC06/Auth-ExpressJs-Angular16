import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../app/entities/User"
import { CreateUsersTable1674307725393 } from './migrations/1699217461224-CreateUsersTable'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "admin",
    database: "auth-express-angular",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUsersTable1674307725393],
    subscribers: [],
})
