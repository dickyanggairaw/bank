const router = require("express").Router()
const { CustomerController } = require("../controllers")

router.post("/", CustomerController.createCustomer)
router.get("/", CustomerController.listCustomer)

module.exports = router