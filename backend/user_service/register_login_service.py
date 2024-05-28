from flask import Flask, request, jsonify
from mysql.connector import Error
from db import create_connection
import bcrypt
import mysql.connector
import os

app = Flask(__name__)

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

    username = os.getenv("DB_USER_USER")
    password = os.getenv("DB_USER_PASSWORD")
    database = os.getenv("DB_NAME")

    connection = create_connection(database,username,password)
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        query = "INSERT INTO users (given_name, surname, email, password) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data['given_name'], data['surname'], data['email'], hashed_password))
        connection.commit()
        return jsonify({"message": "Data inserted successfully"}), 201
    except mysql.connector.IntegrityError as e:
        if e.errno == 1062:  # MySQL error number for duplicate entry
            return jsonify({"error": "User with this email already exists"}), 400
        else:
            return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


def authenticate_user(email, password):
    # Connect to the database
    username = os.getenv("DB_USER_USER")
    dbpassword = os.getenv("DB_USER_PASSWORD")
    database = os.getenv("DB_NAME")

    connection = create_connection(database,username, dbpassword)
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        # Retrieve hashed password from the database for the given username
        query = "SELECT password FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()

        if result:
            hashed_password = result[0]  # Extract the hashed password from the result
            # Check if the provided password matches the hashed password
            if bcrypt.checkpw(password.encode(), hashed_password.encode()):
                # Passwords match, return the user data
                return {"email": email}  # You can customize the user data as needed

    finally:
        cursor.close()
        connection.close()

@app.route('/logindata', methods=['POST'])
def login():
    data = request.json
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Username and password are required"}), 400

    email = data['email']
    password = data['password']

    # Authenticate the user
    user = authenticate_user(email, password)
    if user:
        # User authenticated successfully
        return jsonify({"message": "User logged in successfully", "user": user}), 200
    else:
        # Authentication failed
        return jsonify({"error": "Invalid username or password"}), 401



@app.route('/userdata', methods=['POST'])
def get_user_data():
    data = request.json
    if not data or 'pk_user' not in data:
        return jsonify({"error": "User ID is required"}), 400

    try:
        user_id = int(data['pk_user'])  # Ensure pk_user is a valid integer
    except ValueError:
        return jsonify({"error": "Invalid User ID"}), 400

    username = os.getenv("DB_USER_USER")
    password = os.getenv("DB_USER_PASSWORD")
    database = os.getenv("DB_NAME")

    connection = create_connection(database, username, password)
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        query = "SELECT * FROM users WHERE pk_user = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()

        if user:
            user_data = {
                "pk_user": user[0],
                "given_name": user[1],
                "surname": user[2],
                "email": user[3],
            }
            return jsonify(user_data), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"Failed to fetch user data: {str(e)}"}), 500
    finally:
        cursor.close()
        connection.close()


if __name__ == "__main__":
    app.run(debug=True, port=5001)
