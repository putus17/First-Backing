import { Request, Response } from 'express';
import Task from '../models/task.model';
import { ITask } from '../types/task';
import { handleError, isValidObjectId } from '../utils/validation';

// GET all tasks
export const getAllTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await Task.find().lean();
        res.status(200).json(tasks);
    } catch (error) {
        handleError(res, error);
    }
};

// GET task by ID
export const getTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    if (!isValidObjectId(taskId, res)) return;

    try {
        const task = await Task.findById(taskId).lean();
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        handleError(res, error);
    }
};

// CREATE a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, dueDate, completed } = req.body;

        // Check required fields (completed can be false, so check against undefined)
        if (!title  ) {
            res.status(400).json({ message: 'Title is required field' });
            return;
        }

        const newTask = new Task({ title, description, dueDate, completed });
        const savedTask = await newTask.save();

        const { _id } = savedTask;
        res.status(201).json({ _id, title, description, dueDate, completed });
    } catch (error) {
        handleError(res, error);
    }
};



// UPDATE a task
export const updateTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    if (!isValidObjectId(taskId, res)) return;

    try {
        const { title, description, dueDate, completed } = req.body;

        // Ensure at least one field to update is provided
        if (!title && !description  &&! dueDate  && !completed ) {
            res.status(400).json({ message: 'No update fields provided' });
            return;
        }

        // Build update object dynamically
        const updateData: Partial<ITask> = {};
        if (title) updateData.title = title;
        if (description ) updateData.description = description;
        if (dueDate ) updateData.dueDate = dueDate;
        if (completed ) updateData.completed = completed;

        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true }).lean();
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        handleError(res, error);
    }
};


// DELETE a task
export const deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    if (!isValidObjectId(taskId, res)) return;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};