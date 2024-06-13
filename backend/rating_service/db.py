import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def create_connection(database,username, password):
    try:
        connection = mysql.connector.connect(
            host='c-kohn.lu',
            user=username,
            password=password,
            database=database
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None