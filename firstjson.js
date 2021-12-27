// node firstjson.js --des=teams.json

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);
// console.log(args.des);

// JSON = Javascript Object Notation
// JSON means saving data in the same format as of javascript objects

// let student = {
// 	name: "John",
// 	age: 20,
// };

// let student1 = {
// 	name: "Jaya",
// 	age: 31,
// };

// // An Array of objects
// // adding both the javascript objects
// // Way 1 of making the array objects
// //! JavaScript Object not JSON Student
// let students = [student, student1];

// // Converting the Javascript object into Javascript Object Notation
// let json = JSON.stringify(students);

// fs.writeFileSync(args.des, json, "utf-8");

let s1 = {
	name: "John",
	age: 20,
};
// S1 is an Object
// Name and Age are the properties or the data members

console.log(s1);
console.log(s1.age);

// Ages arrays
// let narr = [10, 20, 30];
// console.log(narr[0]);
// console.log(narr[1]);
// console.log(narr[2]);

// Names array
// let namarr = ["John", "Stephen", "Jaya"];
// console.log(namarr[0]);

// ! ARRAY OF OBJECTS
// let arrofObjects = [
// 	{
// 		name: "John",
// 		age: 20,
// 	},
// 	{
// 		name: "Stephen",
// 		age: 21,
// 	},
// 	{
// 		name: "Jaya",
// 		age: 22,
// 	},
// ];
// console.log(arrofObjects[0].name);
// console.log(arrofObjects[0].age);

// console.log(arrofObjects[1].name);
// console.log(arrofObjects[1].age);
