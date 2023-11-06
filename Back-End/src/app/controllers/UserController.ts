import { Request, Response, Router } from 'express';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';

const userRouter = Router();

userRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
    const user: IUser = req.body;
    await UserRepository.createUser(user);
    return res.status(200).send(user);
});

userRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
    const users: IUser[] = await UserRepository.getUsers();
    return res.status(200).json(users);
});


userRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id);
    const user: IUser = await UserRepository.getUserById(userId);
    return res.status(200).send(user);
})

userRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id);
    const newName: string = req.body.name;
    const newUser: IUser = await UserRepository.updateUser(userId, newName);
    return res.status(200).send(newUser);
})

userRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id);
    const deletedUser = await UserRepository.deleteUser(userId);
    return res.status(200).send(deletedUser);
})

export default userRouter;