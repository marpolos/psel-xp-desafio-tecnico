import express from 'express';
import ContaController from '../controllers/contas.controller';
import { validateCliente, validateCriarConta } from '../middlewares/validateSchemas';
import validateToken from '../middlewares/validateToken';

const contasRoutes = express.Router();

contasRoutes.get('/:id', validateToken, ContaController.getById);
contasRoutes.get('/', validateToken, ContaController.getAll);
contasRoutes.put('/saque', validateToken, validateCliente, ContaController.atualizarConta);
contasRoutes.put('/deposito', validateToken, validateCliente, ContaController.atualizarConta);
contasRoutes.post('/', validateCriarConta, ContaController.createConta);
contasRoutes.post('/login', ContaController.loginConta);

export default contasRoutes;