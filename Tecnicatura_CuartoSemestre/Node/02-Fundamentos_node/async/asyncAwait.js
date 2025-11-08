async function hola(nombre) {
    return new Promise(function (resolve, reject) {
         setTimeout(function () {
             console.log('Hola ' + nombre);
             resolve(nombre);
         }, 1000);
    });
};

async function hablar(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout( function() {
            console.log('Bla bla bla...');
            resolve(nombre);
        }, 1000);
    });
}

async function adios(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
        console.log('Adios ' + nombre);
        resolve();
    }, 1000);
});

} 

//await hola('Lucas')

async function main() {
    let nombre = await hola('Lucas');
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
    console.log('El proceso ha terminado');
}

console.log('Empezamos el proceso...');
main();
console.log('Esta es la sgunda instruccion');