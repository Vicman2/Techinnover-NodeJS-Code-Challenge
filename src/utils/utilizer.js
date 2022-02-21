

let uniqueOperations = []

const filterUniqueRequest = (theArray) =>{

    if(theArray.length === 1){
        // This means that the last element is unique
        uniqueOperations.push(theArray[0]) // So push the element to the unique operation
        let valueToReturn = [...uniqueOperations] // Destructure the unique because we want to empty the global array
        uniqueOperations = [] // Getting to accept request
        return valueToReturn
    }

    if(theArray.length === 0){
        let valueToReturn = [...uniqueOperations] // Destructure the unique because we want to empty the global array
        uniqueOperations = [] // Getting to accept request
        return valueToReturn
    }

    // Get the first element in the array
    let firstEventInArray = theArray[0]
    //Convert the date to seconds
    let theTimeInSec = convertDateToSecs(firstEventInArray.date);

   // Where all the duplicates including the first element is stored
    let theDuplicateIndex = [0]

    // Fetch all those duplicates and push their duplicates to the theDuplicateIndex array
    theArray
        .forEach((eachOperatiion, theIndex )=> {
            let theOtherTimeInSec = convertDateToSecs(eachOperatiion.date)
            
            if(theIndex ==! 0 && Math.abs(theOtherTimeInSec - theTimeInSec) <= 3){
                theDuplicateIndex.push(theIndex) 
            }

        })

    const theUnTreated = theArray
        .filter((eachElem, anoIndex) =>theDuplicateIndex.includes(anoIndex) )

    // Push the first element to the array
    uniqueOperations.push(theArray[0])

    return filterUniqueRequest(theUnTreated)
}


const convertDateToSecs = (theDate) => {
    let timeInMilSeconds = (new Date(theDate)).getTime()
    return timeInMilSeconds * 0.001
}

module.exports = {
    convertDateToSecs
}