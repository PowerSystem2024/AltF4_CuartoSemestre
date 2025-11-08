
console.log('Inicio del programa');

setTimeout(() => {
    console.log('Primer timeout (3 segundos)');
}, 3000);

setTimeout(() => {
    console.log('Segundo timeout');
}, 0);

setTimeout(() => {
    console.log('Tercer timeout');
}, 0);

console.log('Fin del programa');
