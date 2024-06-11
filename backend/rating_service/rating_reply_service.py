from flask import Flask, request, jsonify
from mysql.connector import Error
from db import create_connection
import bcrypt
import mysql.connector
import os




def insert_rating_data(data):
    data = request.json
    if not data:
        return {"error": "No data provided in request body"}

    # Check if all required fields are present in the request data
    required_fields = ['fk_user', 'fk_restaurant', 'stars', 'review']
    for field in required_fields:
        if field not in data:
            return {"error": f"Field '{field}' is missing in request body"}, 400



    # Get database connection credentials from environment variables
    username = os.getenv("DB_RATING_USER")
    password = os.getenv("DB_RATING_PASSWORD")
    database = os.getenv("DB_NAME")

    # Create database connection
    connection = create_connection(database, username, password)
    if connection is None:
        return {"error": "Failed to connect to the database"}, 500

    cursor = connection.cursor()
    try:
        # Insert rating data into the database
        query = "INSERT INTO ratings (fk_user, fk_restaurant, stars, review, timestamp) VALUES (%s, %s, %s, %s, NOW())"
        cursor.execute(query, (data['fk_user'], data['fk_restaurant'], data['stars'], data['review']))
        connection.commit()
        return {"message": "Data inserted successfully"}, 200
    except mysql.connector.Error as e:
        return {"error": f"Failed to insert data: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()





def insert_reply_data(data):
    if not data:
        return {"error": "No data provided in request body"}, 400

    # Check if all required fields are present in the request data
    required_fields = ['fk_user', 'fk_rating', 'message']
    for field in required_fields:
        if field not in data:
            return {"error": f"Field '{field}' is missing in request body"}, 400

    # Get database connection credentials from environment variables
    username = os.getenv("DB_RATING_USER")
    password = os.getenv("DB_RATING_PASSWORD")
    database = os.getenv("DB_NAME")

    # Create database connection
    connection = create_connection(database, username, password)
    if connection is None:
        return {"error": "Failed to connect to the database"}, 500

    cursor = connection.cursor()
    try:
        # Insert reply data into the database
        query = "INSERT INTO replies (fk_user, fk_rating, message, timestamp) VALUES (%s, %s, %s, NOW())"
        cursor.execute(query, (data['fk_user'], data['fk_rating'], data['message']))
        connection.commit()
        return {"message": "Data inserted successfully"}, 200
    except mysql.connector.Error as e:
        return {"error": f"Failed to insert data: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()


def fetch_ratings_by_restaurant(data):
    if not data or 'restaurant_id' not in data:
        return {"error": "Restaurant ID is required"}, 400

    restaurant_id = data['restaurant_id']

    try:
        username = os.getenv("DB_RATING_USER")
        password = os.getenv("DB_RATING_PASSWORD")
        database = os.getenv("DB_NAME")

        connection = create_connection(database, username, password)
        if connection is None:
            return {"error": "Failed to connect to the database"}, 500

        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM ratings WHERE fk_restaurant = %s"
        cursor.execute(query, (restaurant_id,))
        ratings = cursor.fetchall()

        return {"ratings": ratings}, 200
    except mysql.connector.Error as e:
        return {"error": f"Failed to fetch ratings: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()



def fetch_replies_by_rating(data):
    if not data or 'rating_id' not in data:
        return {"error": "Rating ID is required"}, 400

    rating_id = data['rating_id']

    try:
        username = os.getenv("DB_RATING_USER")
        password = os.getenv("DB_RATING_PASSWORD")
        database = os.getenv("DB_NAME")

        connection = create_connection(database, username, password)
        if connection is None:
            return {"error": "Failed to connect to the database"}, 500

        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM replies WHERE fk_rating = %s"
        cursor.execute(query, (rating_id,))
        replies = cursor.fetchall()

        return {"replies": replies}, 200
    except mysql.connector.Error as e:
        return {"error": f"Failed to fetch replies: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()


def fetch_avg_ratings():
    try:
        username = os.getenv("DB_RATING_USER")
        password = os.getenv("DB_RATING_PASSWORD")
        database = os.getenv("DB_NAME")

        connection = create_connection(database, username, password)
        if connection is None:
            return {"error": "Failed to connect to the database"}, 500

        cursor = connection.cursor(dictionary=True)
        query = "SELECT fk_restaurant, AVG(stars) AS avg_rating FROM ratings GROUP BY fk_restaurant"
        cursor.execute(query)
        avg_ratings = cursor.fetchall()

        overall_avg_ratings = {}
        for rating in avg_ratings:
            overall_avg_ratings[rating['fk_restaurant']] = rating['avg_rating']

        return overall_avg_ratings, 200
    except mysql.connector.Error as e:
        return {"error": f"Failed to calculate overall average ratings: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()



def fetch_ratings_by_user(data):
    if not data or 'user_id' not in data:
        return {"error": "User ID is required"}, 400

    user_id = data['user_id']

    try:
        username = os.getenv("DB_RATING_USER")
        password = os.getenv("DB_RATING_PASSWORD")
        database = os.getenv("DB_NAME")

        connection = create_connection(database, username, password)
        if connection is None:
            return {"error": "Failed to connect to the database"}, 500

        cursor = connection.cursor(dictionary=True)
        query = "SELECT pk_rating , fk_restaurant, stars, review, timestamp FROM ratings WHERE fk_user = %s"
        cursor.execute(query, (user_id,))
        ratings = cursor.fetchall()

        return {"ratings": ratings}, 200
    except mysql.connector.Error as e:
        return {"error": f"Failed to fetch ratings: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()


def delete_by_id(data):
    if not data or 'rating_id' not in data:
        return {"error": " ID is required"}, 400

    rating_id = data['rating_id']

    try:
        username = os.getenv("DB_RATING_USER")
        password = os.getenv("DB_RATING_PASSWORD")
        database = os.getenv("DB_NAME")

        connection = create_connection(database, username, password)
        if connection is None:
            return {"error": "Failed to connect to the database"}, 500

        cursor = connection.cursor()

        # Check if the user exists
        cursor.execute("SELECT 1 FROM ratings WHERE pk_rating = %s", (rating_id,))
        if cursor.fetchone():
            # Delete the user
            cursor.execute("DELETE FROM ratings WHERE pk_rating = %s", (rating_id,))
            connection.commit()

            # Update remaining users' pk_user
            cursor.execute("UPDATE ratings SET pk_rating = pk_rating - 1 WHERE pk_rating > %s", (rating_id,))
            connection.commit()

            return {"message": "Rating deleted successfully"}, 200
        else:
            return {"error": "Rating not found"}, 404
    except Exception as e:
        return {"error": f"Failed to delete Rating: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()






