
import { Router } from 'express'
import {
    createTask,
    getAllTasks,
    getTaskById,
    deleteTask,
    updateTask
} from '../controllers/task.controller'

const router = Router()
//Create new task
router.post('/', createTask)

//Get all tasks
router.get('/', getAllTasks);

//Get task by ID
router.get('/:id', getTaskById);



//Update task
router.put('/:id', updateTask);


//Delete user
router.delete('/:id', deleteTask);


export default router;
