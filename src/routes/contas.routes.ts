import express from 'express';
import ContaController from '../controllers/conta.controller';
import { Request, Response, NextFunction } from 'express';
import ContaService from '../services/conta.service';
const contasRoutes = express.Router();

//const contaController = new ContaController();

contasRoutes.get('/:id', ContaController.getById);
contasRoutes.get('/', ContaController.getAll);

// const contaService = new ContaService();
/* contasRoutes.get('/12', async (_req: Request, res: Response): Promise<Response> => {
    const data = await contaService.getAll();
    return res.json(data);
}); */
export default contasRoutes;