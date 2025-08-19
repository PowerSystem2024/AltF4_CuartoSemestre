
from dataclasses import dataclass

@dataclass
class Usuario:
    _id_usuario: int = None
    _username: str = None
    _password: str = None

    @property
    def id_usuario(self):
        return self._id_usuario

    @property
    def username(self):
        return self._username

    @property
    def password(self):
        return self._password

    def __str__(self):
        return f'ID Usuario: {self._id_usuario}, Username: {self._username}, Password: {self._password}'