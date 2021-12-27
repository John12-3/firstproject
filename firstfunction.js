let clargs = process.argv;

let n = parseInt(clargs[2]);

for (let i = 2; i <= n; i++) {
	let isPrime = isprime(i);
	if (isPrime == true) {
		console.log(i);
	}
}

function isprime(x) {
	let isprime = true;
	for (let div = 2; div * div <= x; div++) {
		if (x % div == 0) {
			isprime = false;
			break;
		}
	}

	return isprime;
}
