const fs = require("fs");
const path = require("path");

// fs.readdir(__dirname + "/imges", (err, files) => {
//   if (err) console.log(err);
//   else {
//     console.log("\nCurrent directory filenames:");
//     files.forEach((file, i) => {
//       fs.rename(
//         __dirname + "/imges/" + file,
//         __dirname + "/imges/" + i + ".jpg"
//       ,(err) => {
//           console.log(err)
//       });
//     });
//   }
// });

// fs.writeFile(
//   path.join(__dirname, "/count.txt"), "1" ,'utf8',
//   (err) => {
//     console.log(err);
//   }
// );

// fs.readFile(
//   path.join(__dirname, "/count.txt"), 'utf8',
//   (err, data) => {
//     console.log(err);
//     console.log(data);
//     return data;
//   }
// );