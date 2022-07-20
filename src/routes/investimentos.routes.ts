import express from 'express';
import InvestimentosController from '../controllers/investimentos.controller';

const investimentoRoutes = express.Router();

// const investimentosController = new InvestimentosController();
investimentoRoutes.put('/vender', InvestimentosController.venderAtivo);
investimentoRoutes.post('/comprar', InvestimentosController.comprarAtivo);

export default investimentoRoutes;