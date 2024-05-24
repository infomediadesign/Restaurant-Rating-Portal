import mysql.connector
from mysql.connector import Error

global connection


def connect_to_database():
    try:
        # Update the connection parameters as needed
        global connection
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


def close_connection():
    if connection.is_connected():
        connection.close()
        print("MySQL connection is closed")


def check_connection():
    if not connection.is_connected:
        connect_to_database()


def create_tables_if_not_exists():
    create_users_table_sql = ("CREATE TABLE IF NOT EXISTS `c1sad`.`users` ("
                              "`pk_user` int NOT NULL AUTO_INCREMENT, "
                              "`email` varchar(255) NOT NULL UNIQUE, `"
                              "`given_name` varchar(50) NOT NULL, "
                              "`surname` varchar(50) NOT NULL,"
                              "`password` varchar(255) NOT NULL,"
                              "PRIMARY KEY (`pk_user`)"
                              ")")
    check_connection()

    cursor = connection.cursor()

    cursor.execute(create_users_table_sql)

    print ("Users table is created")


if __name__ == "__main__":
    connect_to_database()
    create_tables_if_not_exists()
    close_connection()
