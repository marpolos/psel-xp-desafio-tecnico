import express from 'express';
import cors from 'cors';
import contasRoutes from './routes/contas.routes';
import middleError from './middlewares/middleError';
import ativosRoutes from './routes/ativos.routes';
import investimentosRoutes from './routes/investimentos.routes';
import { validateInvestimentos, validateAtivos } from './middlewares/validateSchemas';

const app = express();
app.use(express.json());

app.use(cors());

app.use('/contas', contasRoutes);

app.use('/ativos', validateAtivos, ativosRoutes);

app.use('/investimentos', validateInvestimentos, investimentosRoutes);

// Aqui vai o middle de erro para qualquer problema;
app.use(middleError);

export default app;