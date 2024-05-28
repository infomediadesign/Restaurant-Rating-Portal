import bcrypt

from flask import Flask, request, jsonify
from db import create_connection
import os

app = Flask(__name__)

def authenticate_user(email, password):
    # Connect to the database
    username = os.getenv("DB_USER_USER")
    dbpassword = os.getenv("DB_USER_PASSWORD")
    database = "c1SADusers"

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

if __name__ == "__main__":
    app.run(debug=True,port=5002)
