
import logging

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s: %(levelname)s [%(filename)s:%(lineno)s] %(message)s',
                    datefmt='%I:%M:%S %p',
                    handlers=[
                        logging.FileHandler('capa_datos.log'),
                        logging.StreamHandler()
                    ])

if __name__ == '__main__':
    logging.warning('Mensaje de nivel warning')
    logging.info('Mensaje de nivel info')
    logging.debug('Mensaje de nivel debug')
    logging.error('Ocurrió un error en la aplicación')