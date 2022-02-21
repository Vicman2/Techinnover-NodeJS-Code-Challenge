const analyticServices = require("../services/analyticServices")
const { convertDateToSecs } = require("../utils/utilizer")



class AnalyticsCtrl{

    async addAnalytics(req, res){
        try {
            
            // This is the request body
            const reqData = req.body
            
            const thePureArray = await analyticServices.getAll()
            const theReversedArray = [...thePureArray].reverse()
    
            // The total number saved 
            let ingested = 0
            
            // Fetching for the last clickEvent
            for(let i = 0; i<reqData.length;i++){
                // Get the event type for each one
                const theEventType = reqData[i].eventType
                const theUser = reqData[i].user
    
                // Get the last object in the array having same eventType
                const theLastEvent = theReversedArray
                    .find(eachEvent => eachEvent.eventType === theEventType &&  eachEvent.user === theUser)
            
                // If the last event exists
                if(theLastEvent){
                    // Check the time difference
                    let theTimeDifference = convertDateToSecs(theLastEvent.date) 
                        - convertDateToSecs(new Date())
                    // If it is greater than 3 modify the array and save to file
    
                    // Data to save
                    let dataToSave = {
                        user: theUser, 
                        eventType: theEventType, 
                        date: new Date(), 
                    }
                    if( Math.abs(theTimeDifference) >3 && theLastEvent.eventType === "click"){
                        // Save to file
                        await analyticServices.addToDB(dataToSave)
    
                        // Increment the number saved
                        ingested++
                    }else if(Math.abs(theTimeDifference) >5 && theLastEvent.eventType === "pageView"){
                        // Save to file
                        await analyticServices.addToDB(dataToSave)
    
                        // Increment the number saved
                        ingested++
                    }else if(theLastEvent.eventType !== "pageView" && theLastEvent.eventType !== "click"){
                        // Save to file
                        await analyticServices.addToDB(dataToSave)
    
                        // Increment the number saved
                        ingested++
                    }
                }else{
                    let dataToSave = {
                        user: theUser, 
                        eventType: theEventType, 
                        date: new Date(), 
                    }
    
                    await analyticServices.addToDB(dataToSave);
    
                    // Increment the number saved
                    ingested++
                }
                
            }
            let toReturn = ingested;
            ingested = 0
            
            res.status(200).send({ingested:toReturn})
        } catch (error) {
            console.log(error)
            res.status.send({message: "Server error"})
        }
       
    }

    async fetchAnalytics(req, res){
        try {
            const fetched = await analyticServices.getAll()
            res.status(200).send(fetched)
        } catch (error) {
            console.log(error)
            res.status.send({message: "Server error"})
        }
    }
}


module.exports = new AnalyticsCtrl()