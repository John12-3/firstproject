// read a file, captilize every word, write the file

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

// node firstfiles.js --src=f1.txt --des=f2.txt
// console.log(args.src);
// console.log(args.des);

// read from source
let stext = fs.readFileSync(args.src, "utf-8");
// console.log(stext);

let dtext = stext.toUpperCase();
// console.log(dtext);

// Writ file on f2.txt
fs.writeFileSync(args.des, dtext, "utf-8");
