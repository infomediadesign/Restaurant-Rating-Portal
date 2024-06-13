from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import mysql.connector
from mysql.connector import Error
from db import create_connection
import bcrypt
import os
import requests
from dotenv import load_dotenv
from user_service import login , insert_data ,get_user_data , fetch_all_users , update_user_data , delete_user
from flask_cors import CORS




app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
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


@app.route('/register', methods=['POST'])
@auth.login_required
def insert_data_route():
    response, status_code = insert_data()
    return jsonify(response), status_code

@app.route('/login', methods=['POST'])
@auth.login_required
def login_route():
    data = request.json
    response, status_code = login(data)
    return jsonify(response), status_code


@app.route('/fetch_by_id', methods=['POST'])
@auth.login_required
def get_user_data_route():
    data = request.json
    response, status_code = get_user_data(data)
    return jsonify(response), status_code


@app.route('/fetch_all', methods=['GET'])
@auth.login_required
def fetch_all_users_route():
    users, status_code = fetch_all_users()
    return jsonify(users), status_code


@app.route('/update', methods=['POST'])
@auth.login_required
def update_user_data_route():
    data = request.json
    response, status_code = update_user_data(data)
    return jsonify(response), status_code


@app.route('/delete', methods=['POST'])
@auth.login_required
def delete_user_route():
    data = request.json
    response, status_code = delete_user(data)
    return jsonify(response), status_code

if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True , port = 5001)

