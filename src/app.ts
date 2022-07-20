import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import contasRoutes from './routes/contas.routes';
import middleError from './middlewares/middleError';
import ativosRoutes from './routes/ativos.routes';
import investimentosRoutes from './routes/investimentos.routes';
import { validateInvestimentos, validateAtivos } from './middlewares/validateSchemas';
import validateToken from './middlewares/validateToken';

// Problema na validação: https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/

const app = express();
app.use(cors());

app.use(express.json());

app.use('/contas', contasRoutes);

app.use('/ativos', validateAtivos, ativosRoutes);

app.use('/investimentos', validateInvestimentos, investimentosRoutes);

// Aqui vai o middle de erro para qualquer problema;
app.use(middleError);

export default app;