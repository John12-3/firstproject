// t1 = Read a file(disk)
// t2 = Calculate primes (CPU)
// t3 = Write a file (disk)
// t4 = Calculate square of prime (CPU)

// node firstlackofcallback.js --src=f1.txt --des=f2.txt --n=5000

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);
// console.log(args.src);
// console.log(args.des);
// console.log(args.n);

// ! Task 1 Area begins
let t1 = Date.now();
console.log("Starting task1 at " + (t1 % 100000));
let srctext = fs.readFileSync(args.src, "utf-8");
// console.log(srctext);

let t2 = Date.now();
console.log("Finishing task1 at " + (t2 % 100000));
console.log(t2 - t1);
// ! Task 1 Area ends

// ! Task 2 Area begins
let t3 = Date.now();
console.log("Starting task at " + (t3 % 100000));

function isPrime(x) {
	let isprime = true;

	for (let div = 2; div < x; div++) {
		if (x % div === 0) {
			isprime = false;
			break;
		}
	}

	return isprime;
}

let arr = []; // make an array
for (let i = 2; i < args.n; i++) {
	let isprime = isPrime(i);
	if (isprime === true) {
		arr.push();
	}
}
let t4 = Date.now();
console.log("Ending task at " + (t4 % 100000));

// ! Task 2 Area ends
console.log(t4 - t3);

console.log(t4 - t1);
