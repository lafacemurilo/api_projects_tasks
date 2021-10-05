import mongoose, { Mongoose } from 'mongoose';
require('dotenv/config');

export const connect = async (): Promise<Mongoose> => {
  return await mongoose.connect(process.env.MONGO_PROJECTS_URL ?? '');
};


export const close = (): Promise<void> => mongoose.connection.close();
