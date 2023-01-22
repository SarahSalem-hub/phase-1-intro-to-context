// Your code here


let createEmployeeRecord = (array) => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

function createEmployeeRecords(array) {
  let employeeRecords = [];
  array.forEach((e) => {
    console.log(e);
    employeeRecords.push(createEmployeeRecord(e));
  });

  return employeeRecords;
}


function createTimeInEvent(empObj, dateStamp) {
  let dateArray = dateStamp.split(" ");
  let newTimeIn = {
    type: "TimeIn",
    hour: parseInt(dateArray[1]),
    date: dateArray[0],
  };

  empObj.timeInEvents.push(newTimeIn);

  return empObj;
}

function createTimeOutEvent(empObj, dateStamp) {
  let dateArray = dateStamp.split(" ");
  let newTimeOut = {
    type: "TimeOut",
    hour: parseInt(dateArray[1]),
    date: dateArray[0],
  };

  empObj.timeOutEvents.push(newTimeOut);

  return empObj;
}

function hoursWorkedOnDate(empObj, date) {
  let hours;
  let timeInEvents = empObj.timeInEvents;
  let timeOutEvents = empObj.timeOutEvents;

  timeInEvents.forEach((timeIn) => {
    timeOutEvents.forEach((timeOut) => {
      if (timeIn.date === date && timeOut.date === date) {

        hours = (timeOut.hour - timeIn.hour)/100;
      }
    });
  });
  return hours;
}

function wagesEarnedOnDate(empObj, date){

    let empHours = hoursWorkedOnDate(empObj, date)
    return empHours * empObj.payPerHour
}


function allWagesFor(empObj){
    let allWages= 0
    let timeInEvents = empObj.timeInEvents;

    timeInEvents.forEach((e)=> {
        allWages += wagesEarnedOnDate(empObj,e.date)
    })

    return allWages
  
}

function calculatePayroll(empArray){
    let all = 0
    empArray.forEach((emp) => {
      all += allWagesFor(emp)
    })
       return all
}
