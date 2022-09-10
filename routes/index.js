const router = require("express").Router()
const customerRoute = require("./customer")
const transactionRoute = require("./transaction")

router.use("/customer", customerRoute)
router.use("/transaction", transactionRoute)

module.exports = router