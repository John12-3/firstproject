// t1 = Read a file(disk)
// t2 = Calculate primes (CPU)

// t2 will be done after t1, which is not good
// node firstcallback1.js --src=big.data --n=25000

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

console.log(args.src);

// ! task1
let t1 = Date.now();
console.log("Task1 Starting at " + (t1 % 100000));
let data = fs.readFileSync(args.src);

let t2 = Date.now();
console.log("Task1 Finished at " + (t2 % 100000));
console.log(t2 - t1);
// ! task1 Done

//! Task2
let t3 = Date.now();
console.log("Task1 Starting at " + (t3 % 100000));
function isprime(x) {
	let isprime = true;

	for (let div = 2; div < x; div++) {
		if (x % div === 0) {
			isprime = false;
			break;
		}
	}

	return isprime;
}
let arr = [];
for (let i = 2; i < args.n; i++) {
	let isPrime = isprime(i);
	if (isPrime == true) {
		arr.push(i);
	}
}
let t4 = Date.now();
console.log("Task1 Finished at " + (t4 % 100000));
console.log(t4 - t3);

console.log(t4 - t1);
