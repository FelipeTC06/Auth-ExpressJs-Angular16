import { Request, Response, Router, NextFunction } from 'express';
import User from '../entities/User';
import userValidationMiddleware from '../middleware/userValidationMiddleware';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';

const userRouter = Router();

userRouter.post(
    '/',
    userValidationMiddleware.validateUser,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser = req.body;
            await UserRepository.createUser(user);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
);

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: IUser[] = await UserRepository.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id', userValidationMiddleware.validateUserId, async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);

    try {
        const user: IUser = await UserRepository.getUserById(userId);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

userRouter.put('/:id', userValidationMiddleware.validateUserId, async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    const newName: string = req.body.name;

    try {
        const newUser: IUser = await UserRepository.updateUser(userId, newName);
        res.status(200).json(newUser);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

userRouter.delete('/:id', userValidationMiddleware.validateUserId, async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);

    try {
        const deletedUser = await UserRepository.deleteUser(userId);
        res.status(200).json(deletedUser);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

userRouter.use(userValidationMiddleware.handleErrors);

export default userRouter;
