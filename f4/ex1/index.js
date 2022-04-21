import {Operation} from './module.js';
// const Operation = require('./module');

const myArgs = process.argv;
if (myArgs.length!=4){
    console.log("Wrong number of arguments.");
    process.exit(1);
}
var operation = new Operation(Number(myArgs[2]),Number(myArgs[3]));
console.log(operation.sum());