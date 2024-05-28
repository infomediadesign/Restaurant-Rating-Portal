import mysql.connector
from mysql.connector import Error


def create_connection():
    try:
        connection = mysql.connector.connect(
            host='c-kohn.lu',
            user='c1SAD',
            password='SAD-SRH2024',
            database='c1sad'
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None
