// (async function () {
// 	for (i = 0; i < 200000000000000; i++) {
// 		if (i == 20000000) {
// 			console.log("Yesssssss!");
// 		}
// 	}
// 	console.log("Its plenty");
// })();
const fs = require("fs");
// fs.readFile("./doc.txt", (e, t) => {
// 	console.log(t.toString());
//     console.log('first')
// });
console.log(fs.readFileSync("./doc.txt"))
console.log('first')