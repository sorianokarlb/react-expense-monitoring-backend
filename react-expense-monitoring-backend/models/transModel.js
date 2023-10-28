import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    transactionName: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    transactionPrice: {
        type: Number,
        required: true
    },
    addedBy: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const transactions = mongoose.model('transactions', transactionSchema);

export default transactions;