const { sequelize, customer } = require("../models")
const { QueryTypes } = require("sequelize")

class CustomerController {
    static async createCustomer (req, res) {
        try {
            const { Name } = req.body
            const data = { Name }

            const newCustomer = await customer.create(data)
            res.status(201).json({
                status: 201,
                message: "Sukses Tambah Customer",
                data: newCustomer
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    }

    static async listCustomer(req, res) {
        try {
            const query = `
                select "AccountId", "Name", "TotalPoin" from customers
            `
            const customers = await sequelize.query(query, {
                type: QueryTypes.SELECT
            })

            res.status(200).json({
                status: 200,
                message: "Sukses Get Customer",
                data: customers
            })

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    }
}

module.exports = CustomerController