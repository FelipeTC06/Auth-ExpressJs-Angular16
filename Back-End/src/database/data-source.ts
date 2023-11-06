import { config } from "process"
import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../app/entities/User"
import envVariables from "../config/confi"
import { CreateUsersTable1674307725393 } from './migrations/1699217461224-CreateUsersTable'


export const AppDataSource = new DataSource({
    type: "mysql",
    host: envVariables.host,
    port: envVariables.port,
    username: envVariables.username,
    password: envVariables.password,
    database: envVariables.database,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUsersTable1674307725393],
    subscribers: [],
})
