from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import bcrypt
import os
import requests
from dotenv import load_dotenv

app = Flask(__name__)
app.json.sort_keys = False
auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(username, password):
    gateway_username = os.getenv("GATEWAY_USERNAME")
    gateway_password_encrypted = os.getenv("GATEWAY_PASSWORD_ENCRYPTED")

    if username != gateway_username:
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), gateway_password_encrypted.encode('utf-8')):
        return False
    return True

USER_SERVICE_URL = "http://localhost:5001"

@app.route('/users/register', methods=['POST'])
@auth.login_required
def register_route():
    response = requests.post(f"{USER_SERVICE_URL}/register", json=request.json, auth=(os.getenv("USERS_API_USERNAME"), os.getenv("USERS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/users/login', methods=['POST'])
@auth.login_required
def login_route():
    response = requests.post(f"{USER_SERVICE_URL}/login", json=request.json, auth=(os.getenv("USERS_API_USERNAME"), os.getenv("USERS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/users/fetch_by_id', methods=['POST'])
@auth.login_required
def get_user_data_route():
    response = requests.post(f"{USER_SERVICE_URL}/fetch_by_id", json=request.json, auth=(os.getenv("USERS_API_USERNAME"), os.getenv("USERS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/users/fetch_all', methods=['GET'])
@auth.login_required
def fetch_all_users_route():
    response = requests.get(f"{USER_SERVICE_URL}/fetch_all", auth=(os.getenv("USERS_API_USERNAME"), os.getenv("USERS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/users/update', methods=['POST'])
@auth.login_required
def update_user_data_route():
    response = requests.post(f"{USER_SERVICE_URL}/update", json=request.json, auth=(os.getenv("USERS_API_USERNAME"), os.getenv("USERS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/users/delete', methods=['POST'])
@auth.login_required
def delete_user_route():
    response = requests.post(f"{USER_SERVICE_URL}/delete", json=request.json, auth=(os.getenv("USERS_API_USERNAME"), os.getenv("USERS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
