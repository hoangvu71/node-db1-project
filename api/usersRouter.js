const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const names = await db("accounts")
        res.json(names)
    } catch(error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const name = await db("accounts").where("id", req.params.id);
        res.json(name)
    } catch(error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const name = {
            name: req.body.name,
            budget: req.body.budget
        }
        const [newName] = await db("accounts").insert(name)
        const getName = await db("accounts").where("id", newName).first()
        res.json(getName)
    } catch(error) {
        next(error)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const name = {
            name: req.body.name,
            budget: req.body.budget
        }
        const updatedName = await db("accounts").where("id", req.params.id).update(name)
        const getUpdatedName = await db("accounts").where("id", req.params.id)
        res.json(getUpdatedName)
    } catch(error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await db("accounts").where("id", req.params.id).del()
        res.status(202).end()
    } catch(error) {
        next(error)
    }
})
module.exports = router