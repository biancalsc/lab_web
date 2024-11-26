import { Router } from "express";
import { EventoController } from "../controller";


const router = Router();

// Rota para listar todos os usuários ou um específico, usando query params, por exemplo ?id=ID
//router.get("/objetivo", UserController.getUserDataById);

router.get("/list", EventoController.list);

// Rota para criar um novo usuário
router.post("/", EventoController.create);

// Rota para atualizar um usuário específico
router.put("/update/:_id", EventoController.update);

// Rota para deletar um usuário específico
router.delete("/delete/:_id", EventoController.delete);

//router.put("/atualizarpeso/:id", UserController.updatePeso);

export default router;

//commit