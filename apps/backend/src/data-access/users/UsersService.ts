import { Request, Response } from 'express';
import { User, add, fetchAll, fetchById, patch, remove } from './UsersDAO';

export const addUser = (req: Request<unknown, User, Omit<User, 'id'>, unknown>, res: Response<User, unknown>) => {
  return res.status(200).json(add(req.body));
};

export const fetchAllUsers = (
  req: Request<unknown, Array<User> | { message: string }, unknown, unknown>,
  res: Response<Array<User> | { message: string }, unknown>
) => {
  return res.status(200).json(fetchAll());
};

export const fetchUserById = (
  req: Request<{ id: string }, User | undefined, unknown, unknown>,
  res: Response<User | undefined, unknown>
) => {
  return res.status(200).json(fetchById(req.params.id));
};

export const patchUser = (
  req: Request<{ id: string }, User | undefined, Partial<User>, unknown>,
  res: Response<User | undefined, unknown>
) => {
  return res.status(200).json(patch(req.params.id, req.body));
};

export const removeUser = (
  req: Request<{ id: string }, User | undefined, unknown, unknown>,
  res: Response<User | undefined, unknown>
) => {
  return res.status(200).json(remove(req.params.id));
};
