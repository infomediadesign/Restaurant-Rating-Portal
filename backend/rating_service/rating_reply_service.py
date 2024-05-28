from flask import Flask, request, jsonify
from mysql.connector import Error
from db import create_connection
import bcrypt
import mysql.connector
import os

app = Flask(__name__)

@app.route('/ratingdata', methods=['POST'])
def insert_data():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided in request body"}), 400

    # Check if all required fields are present in the request data
    required_fields = ['fk_user', 'fk_restaurant', 'stars', 'rating_description']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is missing in request body"}), 400



    # Get database connection credentials from environment variables
    username = os.getenv("DB_RATING_USER")
    password = os.getenv("DB_RATING_PASSWORD")
    database = os.getenv("DB_NAME")

    # Create database connection
    connection = create_connection(database, username, password)
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        # Insert rating data into the database
        query = "INSERT INTO ratings (fk_user, fk_restaurant, stars, rating_description, timestamp) VALUES (%s, %s, %s, %s, NOW())"
        cursor.execute(query, (data['fk_user'], data['fk_restaurant'], data['stars'], data['rating_description']))
        connection.commit()
        return jsonify({"message": "Data inserted successfully"}), 201
    except mysql.connector.Error as e:
        return jsonify({"error": f"Failed to insert data: {str(e)}"}), 500
    finally:
        cursor.close()
        connection.close()




@app.route('/replydata', methods=['POST'])
def insert_reply_data():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided in request body"}), 400

    # Check if all required fields are present in the request data
    required_fields = ['fk_user', 'fk_rating', 'reply_text']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is missing in request body"}), 400



    # Get database connection credentials from environment variables
    username = os.getenv("DB_RATING_USER")
    password = os.getenv("DB_RATING_PASSWORD")
    database = os.getenv("DB_NAME")

    # Create database connection
    connection = create_connection(database, username, password)
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        # Insert rating data into the database
        query = "INSERT INTO replies (fk_user, fk_rating, reply_text, timestamp) VALUES (%s, %s, %s, NOW())"

        cursor.execute(query, (data['fk_user'], data['fk_rating'], data['reply_text'], ))
        connection.commit()
        return jsonify({"message": "Data inserted successfully"}), 201
    except mysql.connector.Error as e:
        return jsonify({"error": f"Failed to insert data: {str(e)}"}), 500
    finally:
        cursor.close()
        connection.close()



if __name__ == "__main__":
    app.run(debug=True, port=5001)
