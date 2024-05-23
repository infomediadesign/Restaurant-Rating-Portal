import mysql.connector
from mysql.connector import Error

def connect_to_database():
    try:
        # Update the connection parameters as needed
        connection = mysql.connector.connect(
            host='c-kohn.lu',
            user='c1SAD',
            password='SAD-SRH2024',
            database='c1sad'
        )

        if connection.is_connected():
            print("Connection successful")

    except Error as e:
        print(f"Error: {e}")

    finally:
        if connection.is_connected():
            connection.close()
            print("MySQL connection is closed")

if __name__ == "__main__":
    connect_to_database()
