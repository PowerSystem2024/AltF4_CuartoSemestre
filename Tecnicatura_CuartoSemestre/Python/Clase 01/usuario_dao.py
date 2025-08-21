
from usuario import Usuario
from cursor_del_pool import CursorDelPool
from logger_base import logging

class UsuarioDao:
    _SELECCIONAR = 'SELECT * FROM usuario ORDER BY id_usuario'
    _INSERTAR = 'INSERT INTO usuario(username, password) VALUES(%s, %s)'
    _ACTUALIZAR = 'UPDATE usuario SET username=%s, password=%s WHERE id_usuario=%s'
    _ELIMINAR = 'DELETE FROM usuario WHERE id_usuario=%s'

    @classmethod
    def seleccionar(cls):
        with CursorDelPool() as cursor:
            cursor.execute(cls._SELECCIONAR)
            registros = cursor.fetchall()
            usuarios = []
            for registro in registros:
                usuario = Usuario(registro[0], registro[1], registro[2])
                usuarios.append(usuario)
            return usuarios

    @classmethod
    def insertar(cls, usuario):
        with CursorDelPool() as cursor:
            try:
                valores = (usuario.username, usuario.password)
                cursor.execute(cls._INSERTAR, valores)
                logging.debug(f'Usuario insertado: {usuario}')
                return cursor.rowcount
            except Exception as e:
                logging.error(f'Error al insertar usuario: {e}')
                return 0

    @classmethod
    def actualizar(cls, usuario):
        with CursorDelPool() as cursor:
            try:
                valores = (usuario.username, usuario.password, usuario.id_usuario)
                cursor.execute(cls._ACTUALIZAR, valores)
                logging.debug(f'Usuario actualizado: {usuario}')
                return cursor.rowcount
            except Exception as e:
                logging.error(f'Error al actualizar usuario: {e}')
                return 0

    @classmethod
    def eliminar(cls, usuario):
        with CursorDelPool() as cursor:
            try:
                valores = (usuario.id_usuario,)
                cursor.execute(cls._ELIMINAR, valores)
                logging.debug(f'Usuario eliminado: {usuario}')
                return cursor.rowcount
            except Exception as e:
                logging.error(f'Error al eliminar usuario: {e}')
                return 0