const fs = require('fs')

// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

//     for (var i = 0; i < 6; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));

//     return text;
// }

// console.log(makeid());

var ola = "OLA.png"

let d = new Date();
var pathExtension = () => {
    let extension = ola.split(".");
    return extension[(extension.length - 1)]
}
do {
    target_path = './public/userImages/' + d.toJSON().replace(/([0-9-]+)T([0-9]+):([0-9]+)(\S+)/, "$1_$2-$3") + "_" + (Math.floor(Math.random() * (9 - 1)) + 1) + "." + pathExtension();
} while (fs.existsSync(target_path));

console.log(target_path)