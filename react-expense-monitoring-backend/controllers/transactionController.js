import asyncHandler from 'express-async-handler';
import Transaction from '../models/transModel.js';

const getAllTransaction = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
});

const addTransaction = asyncHandler(async (req, res) => {
    const { transactionName, transactionType, transactionPrice, addedBy } = req.body;

    const trans = await Transaction.create({
        transactionName,
        transactionType,
        transactionPrice,
        addedBy
    });
})

export { getAllTransaction, addTransaction };
