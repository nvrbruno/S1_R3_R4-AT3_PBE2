import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoController.criar);

export default pedidoRoutes;