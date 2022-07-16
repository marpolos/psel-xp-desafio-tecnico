import express from 'express';
import cors from 'cors';
import contasRoutes from './routes/contas.routes';
import middleError from './middlewares/middleError';
import ativosRoutes from './routes/ativos.routes';
import investimentosRoutes from './routes/investimentos.routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/contas', contasRoutes);
app.use('/ativos', ativosRoutes);
app.use('/investimentos', investimentosRoutes);
// Aqui vai o middle de erro para qualquer problema;
app.use(middleError);

export default app;