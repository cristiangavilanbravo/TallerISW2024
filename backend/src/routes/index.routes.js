"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import encargoRoutes from "./encargo.routes.js";
import mecanicoRoutes from "./mecanico.routes.js";


const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/encargo", encargoRoutes) 
    .use("/mecanicos", mecanicoRoutes);

export default router;
