import express from 'express';
import InvestimentosController from '../controllers/investimento.controller';

const investimentoRoutes = express.Router();

// const investimentosController = new InvestimentosController();
investimentoRoutes.put('/vender', InvestimentosController.venderAtivo);

export default investimentoRoutes;