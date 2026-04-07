import { Router } from "express";
import clientesController from "../controllers/clientesController.js";


const clientesRoutes = Router();

clientesRoutes.post('/',clientesController.criar);

export default clientesRoutes;