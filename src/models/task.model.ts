import mongoose, { Schema } from 'mongoose';
import { ITask } from '../types/task';

const taskSchema: Schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,

    },
    description: {
        type: String,
        trim: true,
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
    },
});

export default mongoose.model<ITask>('Task', taskSchema);
