import app from './infra/express_app';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}\n http://localhost:${port}`);
});
