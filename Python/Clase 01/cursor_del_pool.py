
from conexion import Conexion
from logger_base import logging

class CursorDelPool:
    def __init__(self):
        self._conexion = None
        self._cursor = None

    def __enter__(self):
        logging.debug('Inicio del bloque with (cursor)')
        self._conexion = Conexion.obtenerConexion()
        self._cursor = self._conexion.cursor()
        
        return self._cursor

    def __exit__(self, tipo_excepcion, valor_excepcion, detalle_excepcion):
        logging.debug('Se ejecuta el método __exit__')
        if valor_excepcion:
            self._conexion.rollback()
            logging.error(f'Ocurrió una excepción, se hace rollback: {valor_excepcion} {tipo_excepcion} {detalle_excepcion}')
        else:
            self._conexion.commit()
            logging.debug('Se realiza el commit')
        
        self._cursor.close()
        Conexion.liberarConexion(self._conexion)