const {readFile, writeFile} = require("fs")
const path = require("path")

const { promisify } = require("util")

const asyncReadFile = promisify(readFile)
const asyncWriteFile = promisify(writeFile)

// Resolve the path
const resolvedDataPath = path.resolve("src", "database", "events.json");

class AnalyticServices{


    async addToDB(dataToAdd){

        let thePureArray = await  this.getAll()

        thePureArray.push({...dataToAdd, id: thePureArray.length +1})
        await asyncWriteFile(resolvedDataPath,JSON.stringify(thePureArray))

    }

    async getAll(){
        const allData = await asyncReadFile(resolvedDataPath,"utf8")
        
        const thePureArray = JSON.parse(allData)

        return thePureArray
    }
}



module.exports = new AnalyticServices()