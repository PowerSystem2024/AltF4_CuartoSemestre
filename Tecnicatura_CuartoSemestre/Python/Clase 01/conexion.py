
import psycopg2
from logger_base import logging
import psycopg2.pool

class Conexion:
    _MIN_CON = 1
    _MAX_CON = 5
    _DATABASE = 'postgres'
    _USERNAME = 'postgres'
    _PASSWORD = 'dracoluli14'
    _DB_PORT = '5432'
    _HOST = '127.0.0.1'

    _pool = None

    @classmethod
    def obtenerPool(cls):
        if cls._pool is None:
            try:
                cls._pool = psycopg2.pool.SimpleConnectionPool(cls._MIN_CON, cls._MAX_CON,
                                                               host=cls._HOST,
                                                               database=cls._DATABASE,
                                                               user=cls._USERNAME,
                                                               password=cls._PASSWORD,
                                                               port=cls._DB_PORT)
                logging.info('Se ha creado el pool de conexiones')
                return cls._pool
            except Exception as e:
                logging.error(f'Ocurrió un error al crear el pool: {e}')
                return None
        return cls._pool

    @classmethod
    def obtenerConexion(cls):
        pool = cls.obtenerPool()
        if pool:
            return pool.getconn()
        return None

    @classmethod
    def liberarConexion(cls, conn):
        if conn:
            pool = cls.obtenerPool()
            pool.putconn(conn)

    @classmethod
    def cerrarConexiones(cls):
        pool = cls.obtenerPool()
        if pool:
            pool.closeall()
            logging.info('Se han cerrado todas las conexiones del pool')