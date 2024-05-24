from flask import Flask, jsonify, request
import mysql.connector
from mysql.connector import Error
from db import create_connection
import bcrypt


app = Flask(__name__)


# Route to handle POST requests and insert data into the 'users' table
@app.route('/registerdata', methods=['POST'])
def insert_data():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided in request body"}), 400

    # Check if all required fields are present in the request data
    required_fields = ['given_name', 'surname', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is missing in request body"}), 400

    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())

    connection = create_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        query = "INSERT INTO users (given_name, surname, email, password) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data['given_name'], data['surname'], data['email'], hashed_password))
        connection.commit()
        return jsonify({"message": "Data inserted successfully"})
    except Error as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()



@app.route('/data', methods=['GET'])
def get_data():
    connection = create_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()
        return jsonify(rows)
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
