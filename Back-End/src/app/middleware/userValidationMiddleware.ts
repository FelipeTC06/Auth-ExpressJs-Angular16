import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateUser = [
  check('name').isString().notEmpty().withMessage('The name field is required'),
  check('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('The email field is required'),
  check('password').isLength({ min: 8 }).withMessage('The password must have at least 8 characters.').notEmpty().withMessage('The password field is required'),
];

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const validateUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId: number = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  next();
}

const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Algo deu errado.' });
}

export default { validateUser, handleValidationErrors, validateUserId, handleErrors }