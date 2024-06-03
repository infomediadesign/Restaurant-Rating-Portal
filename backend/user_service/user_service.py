from flask import Flask, request, jsonify
from mysql.connector import Error
from db import create_connection
import bcrypt
import mysql.connector
import os



def insert_data():
    data = request.json
    if not data:
        return {"error": "No data provided in request body"}, 400

    # Check if all required fields are present in the request data
    required_fields = ['given_name', 'surname', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return {"error": f"Field '{field}' is missing in request body"}, 400

    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())

    username = os.getenv("DB_USER_USER")
    password = os.getenv("DB_USER_PASSWORD")
    database = os.getenv("DB_NAME")

    connection = create_connection(database,username,password)
    if connection is None:
        return {"error": "Failed to connect to the database"}, 500

    cursor = connection.cursor()
    try:
        query = "INSERT INTO users (given_name, surname, email, password) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data['given_name'], data['surname'], data['email'], hashed_password))
        connection.commit()
        return {"message": "Data inserted successfully"}, 200
    except mysql.connector.IntegrityError as e:
        if e.errno == 1062:  # MySQL error number for duplicate entry
            return {"error": "User with this email already exists"}, 400
        else:
            return {"error": str(e)}, 500
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
                return {"email": email},None,200
        return None, {"error": "Invalid username or password"}, 400


    finally:
        cursor.close()
        connection.close()


def login(data):
    if not data or 'email' not in data or 'password' not in data:
        return {"error": "Username and password are required"}, 400

    email = data['email']
    password = data['password']

    # Authenticate the user
    user, error, status_code = authenticate_user(email, password)
    if user:
        # User authenticated successfully
        return {"message": "User logged in successfully", "user": user}, status_code
    else:
        # Authentication failed
        return error, status_code



def get_user_data():
    data = request.json
    if not data or 'pk_user' not in data:
        return {"error": "User ID is required"}, 400

    try:
        user_id = int(data['pk_user'])  # Ensure pk_user is a valid integer
    except ValueError:
        return {"error": "Invalid User ID"}, 400

    username = os.getenv("DB_USER_USER")
    password = os.getenv("DB_USER_PASSWORD")
    database = os.getenv("DB_NAME")

    connection = create_connection(database, username, password)
    if connection is None:
        return {"error": "Failed to connect to the database"}, 500

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
            return user_data, 200
        else:
            return {"error": "User not found"}, 400
    except Exception as e:
        return {"error": f"Failed to fetch user data: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()



def fetch_all_users():
    try:
        username = os.getenv("DB_USER_USER")
        password = os.getenv("DB_USER_PASSWORD")
        database = os.getenv("DB_NAME")

        connection = create_connection(database, username, password)
        if connection is None:
            return {"error": "Failed to connect to the database"}, 500

        cursor = connection.cursor()
        query = "SELECT * FROM users"
        cursor.execute(query)
        users = cursor.fetchall()

        user_list = []
        for user in users:
            user_data = {
                "pk_user": user[0],
                "given_name": user[1],
                "surname": user[2],
                "email": user[3],
            }
            user_list.append(user_data)

        return user_list, 200
    except Exception as e:
        return {"error": f"Failed to fetch users: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()


def update_user_data(data):
    if not data or 'pk_user' not in data:
        return {"error": "User ID is required"}, 400

    user_id = data['pk_user']

    # Check if other required fields are present in the request data
    required_fields = ['given_name', 'surname', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return {"error": f"Field '{field}' is missing in request body"}, 400

    # Extract other fields from the request data
    given_name = data['given_name']
    surname = data['surname']
    email = data['email']
    password = data['password']

    # Update user data in the database
    try:
        username = os.getenv("DB_USER_USER")
        dbpassword = os.getenv("DB_USER_PASSWORD")
        database = os.getenv("DB_NAME")

        connection = create_connection(database, username, dbpassword)
        if connection is None:
            return {"error": "Failed to connect to the database"}, 500

        cursor = connection.cursor()
        query = "UPDATE users SET given_name = %s, surname = %s, email = %s, password = %s WHERE pk_user = %s"
        cursor.execute(query, (given_name, surname, email, password, user_id))
        connection.commit()

        # Check if any rows were affected
        if cursor.rowcount == 1:
            return {"message": "User data updated successfully", "status_code": 200}  # Include status_code
        else:
            return {"error": "User not found or no changes made", "status_code": 400}  # Include status_code
    except Exception as e:
        return {"error": f"Failed to update user data: {str(e)}", "status_code": 500}  # Include status_code
    finally:
        cursor.close()
        connection.close()


def delete_user(data):
    if not data or 'user_id' not in data:
        return {"error": "User ID is required"}, 400

    user_id = data['user_id']

    try:
        username = os.getenv("DB_USER_USER")
        password = os.getenv("DB_USER_PASSWORD")
        database = os.getenv("DB_NAME")

        connection = create_connection(database, username, password)
        if connection is None:
            return {"error": "Failed to connect to the database"}, 500

        cursor = connection.cursor()

        # Check if the user exists
        cursor.execute("SELECT 1 FROM users WHERE pk_user = %s", (user_id,))
        if cursor.fetchone():
            # Delete the user
            cursor.execute("DELETE FROM users WHERE pk_user = %s", (user_id,))
            connection.commit()

            # Update remaining users' pk_user
            cursor.execute("UPDATE users SET pk_user = pk_user - 1 WHERE pk_user > %s", (user_id,))
            connection.commit()

            return {"message": "User deleted successfully"}, 200
        else:
            return {"error": "User not found"}, 404
    except Exception as e:
        return {"error": f"Failed to delete user: {str(e)}"}, 500
    finally:
        cursor.close()
        connection.close()


