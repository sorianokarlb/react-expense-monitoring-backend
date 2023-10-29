import express from "express";
const router = express.Router();
import { getAllTransaction, addTransaction } from "../controllers/transactionController.js";

router.get('/alltransaction', getAllTransaction);
router.put('/addtransaction', addTransaction);

export default router;