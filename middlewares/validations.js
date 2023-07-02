import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  body('fullName', 'Enter name').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid avatar link').optional().isURL(),
];

export const streamerCreateValidation = [
  body('name', 'Enter streamer name').isLength({ min: 3 }).isString(),
  body('description', 'Enter streamer description').isLength({ min: 3 }).isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),           //изображение может быть и не быть
];