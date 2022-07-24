import express from 'express';
import AtivosController from '../controllers/ativos.controller';

const ativosRoutes = express.Router();

ativosRoutes.get('/:id', AtivosController.getById);
ativosRoutes.get('/', AtivosController.getAll);
ativosRoutes.get('/cliente/:id', AtivosController.getByIdCliente);

export default ativosRoutes;