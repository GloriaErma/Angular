// definición variable.
var a=5;
var b=9;

if (a) {
    let a=4;
    var b=1;
    console.log(a);
    console.log(b);
}
// RUN:  node let.js
console.log(a);
console.log(b);