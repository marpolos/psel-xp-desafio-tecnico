import express from 'express';
import routes from './routes/ativos.routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.use(middleError);

export default app;