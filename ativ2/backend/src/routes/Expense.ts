import { Router } from "express";
import { DespesaController } from "../controller";


const router = Router();

// Rota para listar todos os usuários ou um específico, usando query params, por exemplo ?id=ID
//router.get("/objetivo", UserController.getUserDataById);

router.get("/list", DespesaController.listar);

// Rota para criar um novo usuário
router.post("/", DespesaController.criar);

// Rota para atualizar um usuário específico
router.put("/update/:_id", DespesaController.atualizar);

// Rota para deletar um usuário específico
router.delete("/delete/:_id", DespesaController.deletar);


export default router;