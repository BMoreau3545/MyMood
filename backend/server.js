import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import blacklistRoutes from './routes/blacklistRoutes.js';
import cohortAssignRoutes from './routes/cohortAssignRoutes.js';
import cohortRoutes from './routes/cohortRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();
 
const app = express();
const port = 3000;

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(cors());

app.use('/alert', alertRoutes);
app.use('/auth', authRoutes);
app.use('/blacklist', blacklistRoutes);
app.use('/cohort_assign', cohortAssignRoutes);
app.use('/cohort', cohortRoutes);
app.use('/mood', moodRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});