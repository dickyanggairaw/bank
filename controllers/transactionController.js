const { transaction, sequelize, customer } = require("../models")
const { QueryTypes } = require("sequelize")

class TransactionController {
    static async createTransaction(req, res) {
        try {
            const {
                AccountId,
                TransactionDate,
                Description,
                DebitCreditStatus,
                Amount
            } = req.body

            const dataCustomer = await customer.findOne({
                where: {
                    AccountId
                }
            })
            let lastAmount = 0
            const dataTransaction = await transaction.findOne({
                where: {
                    AccountId
                },
                order: [["AccountId", "DESC"]]
            })

            if(dataTransaction){
                lastAmount = dataTransaction.Amount
            }

            let data = {
                AccountId,
                TransactionDate,
                Description
            }
            let poin = 0
            if(Description === "Beli Pulsa"){
                if(Amount >= 0 && Amount <= 10000){
                    poin = Amount/1000 * 0
                }else if(Amount >= 10001 && Amount <=30000){
                    poin = Amount/1000 * 1
                }else if(Amount > 30000){
                    poin = Amount/1000 * 2
                }
            }

            if(Description === "Bayar Listrik"){
                if(Amount >= 0 && Amount <= 50000){
                    poin = Amount/2000 * 0
                }else if(Amount >= 50001 && Amount <=100000){
                    poin = Amount/2000 * 1
                }else if(Amount > 100000){
                    poin = Amount/2000 * 2
                }
            }

            if(DebitCreditStatus === "D"){
                data.Debit = Amount
                lastAmount - Amount
            }else {
                data.Credit = Amount
                lastAmount += Amount
            }
            console.log(lastAmount)
            data.Amount = lastAmount

            poin += dataCustomer.TotalPoin
            sequelize.transaction(async (t) => {
                const updateCustomer = customer.update({
                    TotalPoin: poin
                }, {
                    where: {
                        AccountId
                    },
                    transaction: t
                })

                const newTransaction = transaction.create(data, {
                    transaction: t
                })

                const resultTransaction = await Promise.all([newTransaction, updateCustomer])

                res.status(201).json({
                    status: 201,
                    message: "Sukses Tambah Transaction",
                    data: resultTransaction[0]
                })
            })

            
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    }

    static async listTransaction(req, res){ 
        try {
            const {
                AccountId,
                StartDate,
                EndDate
            } = req.query

            const query = `
                select * from transactions where "AccountId" = $1 and "TransactionDate" >= $2 and "TransactionDate" <= $3
            `

            let transactions = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                bind: [AccountId, StartDate, EndDate]
            })

            transactions.forEach(t => {
                if(!t.Debit) t.Debit = "-"
                if(!t.Credit) t.Credit = "-"
            })

            res.status(200).json({
                status: 200,
                message: "Sukses Get Transaction",
                data: transactions
            })

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    }
}

module.exports = TransactionController