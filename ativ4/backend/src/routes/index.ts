import { Router, Request, Response } from "express";
import Evento from "./Evento";



const router = Router();

router.use("/evento", Evento)

router.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default router;
