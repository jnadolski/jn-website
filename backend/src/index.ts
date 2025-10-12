import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import aiRouter from './routes/ai';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/ai', aiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
