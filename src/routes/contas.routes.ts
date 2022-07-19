import express from 'express';
import ContaController from '../controllers/conta.controller';
import { validateCliente, validateCriarConta } from '../middlewares/validateSchemas';
import validateToken from '../middlewares/validateToken';
// import { Request, Response, NextFunction } from 'express';
// import ContaService from '../services/conta.service';
const contasRoutes = express.Router();

// const contaController = new ContaController();

contasRoutes.get('/:id', validateToken, ContaController.getById);
contasRoutes.get('/', validateToken, ContaController.getAll);
// Aqui escolhi usar put porque estou fazendo update na conta já existente.
contasRoutes.put('/saque', validateToken, validateCliente, ContaController.atualizarConta);
contasRoutes.put('/deposito', validateToken, validateCliente, ContaController.atualizarConta);
contasRoutes.post('/', validateCriarConta, ContaController.createConta);
contasRoutes.post('/login', ContaController.loginConta);

// const contaService = new ContaService();
/* contasRoutes.get('/12', async (_req: Request, res: Response): Promise<Response> => {
    const data = await contaService.getAll();
    return res.json(data);
}); */
export default contasRoutes;