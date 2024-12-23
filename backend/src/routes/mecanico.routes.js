import { Router } from "express"; 
import { getMecanicosController } from "../controllers/mecanico.controller.js";  

const router = Router();


router.get("/", getMecanicosController);

export default router; 