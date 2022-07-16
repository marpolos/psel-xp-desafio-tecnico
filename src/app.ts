import express from 'express';
import contasRoutes from './routes/contas.routes';
import cors from 'cors';
import middleError from './middlewares/middleError';
import ativosRoutes from './routes/ativos.routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/contas', contasRoutes);
app.use('/ativos', ativosRoutes);
// Aqui vai o middle de erro para qualquer problema;
app.use(middleError);

export default app;