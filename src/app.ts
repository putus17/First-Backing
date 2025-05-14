import express, { Express} from 'express';
import cors from 'cors'
import userRouter from './routes/user.routes';
import taskRouter from './routes/task.routes';

// Initialize Express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

//Root route
app.get('/', (req, res) => {
  res.send(
    `

    Status: Online
    Uptime: ${Math.floor(process.uptime())} seconds
        `);
    });

     export default app;