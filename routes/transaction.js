const router = require("express").Router()
const { TransactionController } = require("../controllers")

router.post("/", TransactionController.createTransaction)
router.get("/", TransactionController.listTransaction)

module.exports = router