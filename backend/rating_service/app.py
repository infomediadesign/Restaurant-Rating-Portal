from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import mysql.connector
from mysql.connector import Error
from db import create_connection
import bcrypt
import os
import requests
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


@app.route('/ratingdata', methods=['POST'])
@auth.login_required
def insert_data():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided in request body"}), 400

    rating_url = "http://localhost:5001/ratingdata"
    try:
        response = requests.post(rating_url, json=data)
        response.raise_for_status()  # Raise HTTPError for bad responses
        return jsonify({"message": "Data inserted successfully"})
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to insert data: {e}"}), 500


@app.route('/replydata', methods=['POST'])
@auth.login_required
def insert_reply_data():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided in request body"}), 400

    reply_url = "http://localhost:5001/replydata"
    try:
        response = requests.post(reply_url, json=data)
        response.raise_for_status()  # Raise HTTPError for bad responses
        return jsonify({"message": "Data inserted successfully"})
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to insert data: {e}"}), 500






if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
