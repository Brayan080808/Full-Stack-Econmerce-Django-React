import psycopg2
from psycopg2 import sql
import os

# Variables de conexión
DATABASE_NAME = "DBFreshshopDeploy3" # Reemplaza con el nombre de tu base de datos
HOST = "dpg-cssvqu0gph6c7399l27g-a"               # Reemplaza con el host de tu base de datos
USERNAME = "dbfreshshopdeploy3_user"        # Reemplaza con tu nombre de usuario
PASSWORD = "8UNBl02v9OYeQB7pQS65EXHy7o4QEG03"     # Reemplaza con tu contraseña

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