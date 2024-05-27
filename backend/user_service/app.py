from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import mysql.connector
from mysql.connector import Error
from db import create_connection
import bcrypt
import os
from dotenv import load_dotenv


app = Flask(__name__)
auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username, password):
    api_key_encrypted = os.getenv("API_PASSWORD")

    print(bcrypt.checkpw(password.encode('utf-8'), api_key_encrypted.encode('utf-8')))
    if username != os.getenv("API_USER"):
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), api_key_encrypted.encode('utf-8')):
        return False
    return True


# Route to handle POST requests and insert data into the 'users' table
@app.route('/registerdata', methods=['POST'])
@auth.login_required
def insert_data():
    # Extract data from the request
    data = request.json
    if not data:
        return jsonify({"error": "No data provided in request body"}), 400

    # Call the register service to handle data insertion
    register_url = "http://localhost:5001/registerdata"  # Adjust the URL as needed
    response = requests.post(register_url, json=data)

    # Check the response from the register service
    if response.status_code == 200:
        return jsonify({"message": "Data inserted successfully"})
    elif response.status_code == 400:
        return jsonify({"error": "Failed to insert data: Bad request"}), 400
    else:
        return jsonify({"error": "Failed to insert data"}), 500



@app.route('/logindata', methods=['POST'])
@auth.login_required
def login_data():
    # Extract data from the request
    data = request.json
    if not data:
        return jsonify({"error": "No data provided in request body"}), 400

    # Call the login service to handle login
    login_url = "http://localhost:5002/logindata"
    response = requests.post(login_url, json=data)

    # Check the response from the login service
    if response.status_code == 200:
        return jsonify({"message": "User logged in successfully"})
    elif response.status_code == 401:
        return jsonify({"error": "Invalid username or password"}), 401
    else:
        return jsonify({"error": "Failed to log in"}), 500





if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)

