import express from 'express';
import routes from '../routes';

const app = express();
app.use(express.json());

// Rota raiz para teste
app.get('/', (req, res) => {
  res.json({ message: 'Conserta Felix API - Server is running!' });
});

// API routes
app.use('/api', routes);

export default app;
