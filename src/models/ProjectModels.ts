import mongoose, { Model, Schema } from 'mongoose';
export interface Projects {
  id: string;
  title: string;
  tasks?: [];
}

const schema = new Schema<Projects>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    tasks: [],
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const ProjectsModel: Model<Projects> = mongoose.model(
  'projects-tasks',
  schema
);
