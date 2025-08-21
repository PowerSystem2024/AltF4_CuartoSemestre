# menu_app_usuario.py
from usuario_dao import UsuarioDao
from usuario import Usuario
from logger_base import logging

def mostrar_menu():
    print("""
    Menú de la Aplicación
    1) Listar usuarios
    2) Agregar usuario
    3) Actualizar usuario
    4) Eliminar usuario
    5) Salir
    """)
    opcion = input("Seleccione una opción: ")
    return opcion

if __name__ == '__main__':
    while True:
        opcion = mostrar_menu()
        if opcion == '1':
            usuarios = UsuarioDao.seleccionar()
            for usuario in usuarios:
                logging.info(usuario)
        elif opcion == '2':
            username = input('Ingrese username: ')
            password = input('Ingrese password: ')
            usuario = Usuario(_username=username, _password=password)
            UsuarioDao.insertar(usuario)
        elif opcion == '3':
            try:
                id_usuario = int(input('Ingrese ID de usuario a actualizar: '))
                username = input('Ingrese nuevo username: ')
                password = input('Ingrese nuevo password: ')
                usuario = Usuario(_id_usuario=id_usuario, _username=username, _password=password)
                UsuarioDao.actualizar(usuario)
            except ValueError as e:
                logging.error(f'Error de valor: {e}. Asegúrese de ingresar un número entero para el ID.')
        elif opcion == '4':
            try:
                id_usuario = int(input('Ingrese ID de usuario a eliminar: '))
                usuario = Usuario(_id_usuario=id_usuario)
                UsuarioDao.eliminar(usuario)
            except ValueError as e:
                logging.error(f'Error de valor: {e}. Asegúrese de ingresar un número entero para el ID.')
        elif opcion == '5':
            logging.info('Saliendo de la aplicación...')
            break
        else:
            logging.warning('Opción no válida. Intente de nuevo.')