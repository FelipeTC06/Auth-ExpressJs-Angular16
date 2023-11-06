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

const updateUser = async (userId: number, newName: string): Promise<IUser> => {
    try {
        const user = await userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new Error(`Usuário com ID ${userId} não encontrado.`);
        }

        user.name = newName;

        await userRepository.save(user);

        return user;
    } catch (error: any) {
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
}

const deleteUser = async (userId: number): Promise<IUser> => {
    try{
        const user = await userRepository.findOne({
            where: {
                id: userId,
            }
        })

        if (!user) {
            throw new Error(`Usuário com ID ${userId} não encontrado.`);
        }

        await userRepository.delete(user);

        return user;

    } catch (error: any) {
        throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
}

export default { getUsers, createUser, getUserById, updateUser, deleteUser };