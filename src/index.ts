import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from "./routes/authRoutes";



dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, resp) => {
    resp.send('AquéApp Backend is running!')
});

app.use("/api", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});
