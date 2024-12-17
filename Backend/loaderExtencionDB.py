import psycopg2
from psycopg2 import sql
import os
from urllib.parse import urlparse


print(os.environ.get('DATABASE_URL'))

DATABASE_URL = os.environ.get('DATABASE_URL')
url = urlparse(DATABASE_URL)

# Variables de conexión

HOST = url.hostname  # Reemplaza con el host de tu base de datos
USERNAME = url.username        # Reemplaza con tu nombre de usuario
PASSWORD = url.password     # Reemplaza con tu contraseña
DATABASE_NAME = url.path[1:]

def enable_pg_trgm():
    try:
        # Conexión a la base de datos
        conn = psycopg2.connect(
            host=HOST,
            user=USERNAME,
            password=PASSWORD,
            dbname=DATABASE_NAME
        )
        conn.autocommit = True  # Habilitar autocommit para crear extensiones

        with conn.cursor() as cursor:
            # Crear la extensión si no existe
            cursor.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
            print("La extensión pg_trgm se ha habilitado correctamente.")

    except Exception as e:
        print(f"Error al habilitar la extensión pg_trgm: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    enable_pg_trgm()