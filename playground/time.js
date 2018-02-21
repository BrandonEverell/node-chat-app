let moment = require('moment');

// let date = new Date();
let date = moment();
console.log(date.format('h:mm a'))

// 6:01 am

let someTimestamp = moment().valueOf();
console.log(someTimestamp)

let createdAt = 1234
let date = moment(createdAt);
console.log(date.format('h:mm a'))
