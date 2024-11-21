const express = require("express");
const {createTransaction,fetchUserTransactions,updateTransactionStatus,fetchTransactionById} = require("../controllers/transactionController");
const { resourceAccess } = require("../controllers/authController");
const router = express.Router();

router.post("/create",createTransaction);
router.get("/:id",fetchUserTransactions);
router.patch("/update/:id", updateTransactionStatus);
router.get("/single/:id", fetchTransactionById);

module.exports = router;