import { Router } from "express";
import controller from "../controllers/UserController";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/:id", controller.delete); // Adicione :id para a rota de delete
router.put("/:id", controller.update); // Adicione :id para a rota de update

export default router;
