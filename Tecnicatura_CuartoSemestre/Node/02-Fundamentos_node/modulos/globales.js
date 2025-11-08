
/*console.log();
console.error();
setTimeout(() => {});
setTinternal(() => {});
setImmediate(() => {});*/

//console.log(setInvalInterval);

/*let i =0;
let intervalo = setInterval(() => {
    console.log('Hola Mundo');
    i++;
    if (i === 3 {
        clearInterval(intervalo);
    }
}, 1000);*/

let i = 0;
let intervalo = setInterval(() => {
    console.log('Hola Mundo');
    i++;
    if (i === 3) {
        clearInterval(intervalo);
    }
    i++;
}, 1000);
