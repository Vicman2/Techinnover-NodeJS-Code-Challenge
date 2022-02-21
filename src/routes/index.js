const express = require("express");

const router = express.Router()

const analyticsRoute = require("./analyticsRoute")


const rootRouter = () => {
    router.use(
        "/analytics", 
        analyticsRoute()
    )

    return router
}

module.exports = rootRouter