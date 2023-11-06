import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const findUserById = async (userId: number): Promise<IUser | undefined> => {
    const user = await userRepository.findOne({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error(`Usuário com ID ${userId} não encontrado.`);
    }
    return user;
}

function handleUserError(error: any, action: string): never {
    throw new Error(`Erro ao ${action} usuário: ${error.message}`);
}

const getUsers = async (): Promise<IUser[]> => {
    return userRepository.find();
}

const createUser = async (user: IUser): Promise<IUser> => {
    return userRepository.save(user);
}

const getUserById = async (userId: number): Promise<IUser> => {
    const user = await findUserById(userId);
    if (!user) {
        handleUserError(new Error(`Usuário com ID ${userId} não encontrado.`), 'buscar');
    }
    return user;
}

const updateUser = async (userId: number, newName: string): Promise<IUser> => {
    const user = await findUserById(userId);
    if (!user) {
        handleUserError(new Error(`Usuário com ID ${userId} não encontrado.`), 'atualizar');
    }
    user.name = newName;
    await userRepository.save(user);
    return user;
}

const deleteUser = async (userId: number): Promise<IUser> => {
    const user = await findUserById(userId);
    if (!user) {
        handleUserError(new Error(`Usuário com ID ${userId} não encontrado.`), 'deletar');
    }
    await userRepository.delete(user);
    return user;
}

export default { getUsers, createUser, getUserById, updateUser, deleteUser };
