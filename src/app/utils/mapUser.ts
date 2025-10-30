import { User, UserResponse } from '../models/user.model';

export function mapUser(user: UserResponse): User {
  return user;
}
