import app from './infra/express_app';
import accountRoutes from './routes/account_routes';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;


app.use('/user', accountRoutes);



app.listen(port, () => {
  console.log(`Server running on port ${port}\n http://localhost:${port}`);
});
