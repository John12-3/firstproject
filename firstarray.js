let clarys = process.argv;
let n = parseInt(clarys[2]);

let arr = []; // to make the array
for (let i = 0; i < n; i++) {
	let val = parseInt(clarys[i + 3]);
	arr.push(val);
}

// to push the array content
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}
