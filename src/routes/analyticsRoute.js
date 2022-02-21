const express = require("express");
const router = express.Router()

const AnalyticsCtrl = require("../controllers/analyticsCtrl");
const { AddAnalyticsSchema } = require("../validators/AnalyticsSchema");

const Validator = require("../validators/index")



const analyticsRoute = () => {

    router.post(
        "/", 
        Validator(AddAnalyticsSchema,"body"),
        AnalyticsCtrl.addAnalytics
    )
    router.get(
        "/",
        AnalyticsCtrl.fetchAnalytics
    )

    return router
}

module.exports = analyticsRoute