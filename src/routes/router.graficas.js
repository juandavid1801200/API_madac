import { Router } from "express";
import { graficas, obtenerUltimoResultado } from "../controllers/graficas.controller.js";

const routerGraficas=Router()

routerGraficas.post("/grafica/:identificacion",graficas)
routerGraficas.post("/ultimo/:identificacion",obtenerUltimoResultado)

export default routerGraficas