import express from 'express';
import InvestimentosController from '../controllers/investimentos.controller';
import { validateInvestimentos } from '../middlewares/validateSchemas';

const investimentoRoutes = express.Router();

// const investimentosController = new InvestimentosController();
investimentoRoutes.put('/vender', validateInvestimentos, InvestimentosController.venderAtivo);
investimentoRoutes.post('/comprar', validateInvestimentos, InvestimentosController.comprarAtivo);
investimentoRoutes.get('/', InvestimentosController.listaInvestimentos);

export default investimentoRoutes;