import express from 'express';
import cors from 'cors';
import routes from '../routes';

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

// Rota raiz para teste
app.get('/', (req, res) => {
  res.json({ message: 'Conserta Felix API - Server is running!' });
});

// API routes
app.use('/api', routes);

export default app;