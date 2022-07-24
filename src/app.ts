import express from 'express';
import cors from 'cors';
import 'express-async-errors';
// import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.json';
import contasRoutes from './routes/contas.routes';
import middleError from './middlewares/middleError';
import ativosRoutes from './routes/ativos.routes';
import investimentosRoutes from './routes/investimentos.routes';
import validateToken from './middlewares/validateToken';
// import swaggerConfig from './docs/swagger.config';

// Problema na validação: https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* const swaggerDoc = swaggerJSDoc(swaggerConfig);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc)); */

app.use('/contas', contasRoutes);

app.use('/ativos', validateToken, ativosRoutes);

app.use('/investimentos', validateToken, investimentosRoutes);

// Aqui vai o middle de erro para qualquer problema;
app.use(middleError);

export default app;
