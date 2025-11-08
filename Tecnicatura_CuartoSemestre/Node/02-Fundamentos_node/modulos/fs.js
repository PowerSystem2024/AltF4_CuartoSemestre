
const fs = require('fs');

function leer (ruta, cb) {
    fs.readFile(ruta, (err, data) => {
        console.log (data.toString());
    });
}

leer(`${__}/archivo.txt`, console.log);

function escribir (ruta, contenido, cb) {
    fs.writeFile(ruta, contenido, function (err) {;
        if (err) {
            console.error('No se pudo escribir el archivo', err);
        }else {
            console.log('Se escribió correctamente');
        }
    });
}

