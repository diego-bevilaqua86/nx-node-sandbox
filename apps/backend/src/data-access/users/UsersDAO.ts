import { randomUUID } from 'crypto';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const USER_DB: Array<User> = [];

export const add = (user: Omit<User, 'id'>): User => {
  const userId = randomUUID();
  USER_DB.push({ ...user, id: userId });
  return { ...user, id: userId };
};

export const fetchAll = (): Array<User> => {
  return [...USER_DB];
};

export const fetchById = (userId: string): User | undefined => {
  const user = USER_DB.find(byId(userId));
  return user;
};

export const patch = (userId: string, user: Partial<User>): User | undefined => {
  const userIdx = USER_DB.findIndex(byId(userId));
  if (userIdx !== -1) {
    return USER_DB.splice(userIdx, 1, { ...USER_DB.at(userIdx), ...user })[0];
  }
  return undefined;
};

export const remove = (userId: string): User | undefined => {
  const userIdx = USER_DB.findIndex(byId(userId));
  if (userIdx !== -1) {
    return USER_DB.splice(userIdx, 1)[0];
  }
  return undefined;
};

/**
 * Retorna função que filtra usuários em função do ID passado como parâmetro.
 */
const byId = (userId: string) => (user: User) => user.id === userId;
