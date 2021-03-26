function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(array) {
    let obj = [];
    
    array.forEach(employee => {
        let newEmployee = createEmployeeRecord(employee);
        obj.push(newEmployee);
    });
    
    return obj;
}

function createTimeInEvent(record, timeStamp) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(timeStamp.substring(timeStamp.length - 4, timeStamp.length)),
        date: timeStamp.substring(0, 10)
    }

    record['timeInEvents'].push(timeIn);
    return record;
}

function createTimeOutEvent(record, timeStamp) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(timeStamp.substring(timeStamp.length - 4, timeStamp.length)),
        date: timeStamp.substring(0, 10)
    }

    record['timeOutEvents'].push(timeOut);
    return record;
}

function hoursWorkedOnDate(record, recordDate) {
    let clockIn = record["timeInEvents"].find(obj => obj.date === recordDate)
    let clockOut = record["timeOutEvents"].find(obj => obj.date === recordDate)
    return (clockOut.hour - clockIn.hour)/100;
}

function wagesEarnedOnDate(record, recordDate) {
    let hoursWorked = hoursWorkedOnDate(record, recordDate)
    return hoursWorked * record["payPerHour"];
}

function allWagesFor(record) {
    let dateArray = [];
    let wageArray = [];
  
    function addDateToArray(obj) {
      dateArray.push(obj.date)
    }
  
    function addWagesToArray(dateWorked) {
      wageArray.push(wagesEarnedOnDate(record, dateWorked))
    }
  
    record["timeInEvents"].forEach(addDateToArray)
    dateArray.forEach(addWagesToArray)
  
    let sum = (accumulator, currentValue) => accumulator + currentValue;
  
    return wageArray.reduce(sum);
}

function findEmployeeByFirstName(srcArray, inputName) {
    return srcArray.find(obj => obj.firstName === inputName)
}

function calculatePayroll(employeeRecords) {
    let employeeWages = []
    employeeRecords.forEach(record => employeeWages.push(allWagesFor(record)));

    let sum = (accumulator, currentValue) => accumulator + currentValue;
    return employeeWages.reduce(sum);
}