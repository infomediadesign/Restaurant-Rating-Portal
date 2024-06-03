import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def create_connection():
    try:
        connection = mysql.connector.connect(
            host='c-kohn.lu',
            user=os.getenv("DB_RESTAURANT_USER"),
            password=os.getenv("DB_RESTAURANT_PASSWORD"),
            database=os.getenv("DB_RESTAURANT_DATABASE")
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None


def create_restaurant_table_if_not_exist():
    sql = ("CREATE TABLE IF NOT EXISTS `c1SADrestaurants`.`restaurants`("
           "`pk_restaurant` int NOT NULL AUTO_INCREMENT, "
           "`fk_owner` int NOT NULL, "
           "`name` varchar(50) NOT NULL, "
           "`genre` varchar(255) NOT NULL, "
           "`house_number` int(4) NOT NULL, "
           "`street_name` varchar(50) NOT NULL, "
           "`city` varchar(50) NOT NULL, "
           "`state` varchar(50) NOT NULL, "
           "`country` varchar(50) NOT NULL, "
           "`zip_code` int(10) NOT NULL, "
           "`licence` varchar(50) NOT NULL, "
           "`verified` BOOLEAN NOT NULL DEFAULT FALSE, "
           "PRIMARY KEY (`pk_restaurant`)"
           ")")

    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(sql)
    cursor.close()
    connection.close()


def create_pictures_table_if_not_exist():
    sql = ("CREATE TABLE IF NOT EXISTS `c1SADrestaurants`.`pictures` ( "
           "`pk_picture` INT(10) NOT NULL AUTO_INCREMENT, "
           "`fk_restaurant` INT(10) NOT NULL, "
           "`url` VARCHAR(255) NOT NULL UNIQUE, "
           "PRIMARY KEY (`pk_picture`), "
           "FOREIGN KEY (`fk_restaurant`) "
           "REFERENCES `restaurants`(`pk_restaurant`) "
           "ON DELETE CASCADE ON UPDATE CASCADE"
           ")")
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(sql)
    cursor.close()
    connection.close()


def create_opening_hours_table_if_not_exist():
    sql = ("CREATE TABLE IF NOT EXISTS `c1SADrestaurants`.`opening_hours` ( "
           "`pk_opening_hour` INT(10) NOT NULL AUTO_INCREMENT, "
           "`fk_restaurant` INT(10) NOT NULL, "
           "`week_day` INT(1) NOT NULL, "
           "`open_time` time NOT NULL, "
           "`close_time` time NOT NULL, "
           "PRIMARY KEY (`pk_opening_hour`), "
           "FOREIGN KEY (`fk_restaurant`) "
           "REFERENCES `restaurants`(`pk_restaurant`) "
           "ON DELETE CASCADE ON UPDATE CASCADE"
           ")")
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(sql)
    cursor.close()
    connection.close()


def create_tables():
    create_restaurant_table_if_not_exist()
    create_pictures_table_if_not_exist()
    create_opening_hours_table_if_not_exist()
