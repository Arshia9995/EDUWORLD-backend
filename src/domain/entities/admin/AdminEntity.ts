import { ObjectId } from 'mongoose';

export interface AdminEntity {
  _id?: ObjectId;
  email: string;
  password: string;
}
