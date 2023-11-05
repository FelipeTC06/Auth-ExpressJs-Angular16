import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

const createUser = (user: IUser): Promise<IUser> => {
    return userRepository.save(user);
}

const getUserById = async (userId: number): Promise<IUser> => {
    try {
        const user = await userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new Error(`Usuário com ID ${userId} não encontrado.`);
        }

        return user;
    } catch (error: any) {
        throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
}

export default { getUsers, createUser, getUserById };