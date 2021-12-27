// t1 = Read a file(disk)
// t2 = Calculate primes (CPU)

// node firstcallback.js --src=f1.txt --des=f2.txt --n=5000

// t2 is done in parallel with t1

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

// ! Task 1 Area begins
let t1 = Date.now();
console.log("Starting task1 at " + (t1 % 100000));

// let data = fs.readFileSync(args.src,"utf-8");
fs.readFile(args.src,function(data){
    let t2 = Date.now();
    console.log("Finishing task1 at " + (t2 % 100000));
    console.log(t2 - t1);
})


function isPrime(x) {
	let isprime = true;

	for (let div = 2; div < x; div++) {
		if (x % dix === 0) {
			isprime = false;
			break;
		}
	}

	return isprime;
}

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
