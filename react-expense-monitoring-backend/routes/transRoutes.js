import express from "express";
const router = express.Router();
import { getAllTransaction, addTransaction } from "../controllers/transactionController.js";

router.get('/alltransaction', getAllTransaction);
router.post('/addtransaction', addTransaction);

export default router;