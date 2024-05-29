from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import mysql.connector
from mysql.connector import Error
from db import create_connection, create_tables
import bcrypt
import os
import requests
from dotenv import load_dotenv

import fetch_restaurants


app = Flask(__name__)
app.json.sort_keys = False
auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username, password):
    api_key_encrypted = os.getenv("API_PASSWORD")

    if username != os.getenv("API_USER"):
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), api_key_encrypted.encode('utf-8')):
        return False
    return True


@app.route('/fetch_all', methods=['POST'])
@auth.login_required
def fetch_all():
    data = request.get_json()

    return fetch_restaurants.fetch_all(data)


@app.route('/fetch_verified', methods=['POST'])
@auth.login_required
def fetch_verified():
    data = request.get_json()

    return fetch_restaurants.fetch_all(data, true)


@app.route('/fetch_by_id', methods=['POST'])
@auth.login_required
def fetch_by_id():
    data = request.get_json()

    if not data or 'pk_restaurant' not in data:
        return jsonify({'message': 'No restaurant data provided'}), 400

    try:
        restaurant_id = int(data['pk_restaurant'])
    except ValueError:
        return jsonify({'message': 'Invalid restaurant ID'}), 400

    fetch_restaurants.fetch_by_id()


if __name__ == '__main__':
    load_dotenv()
    create_tables()
    app.run(debug=True, port=5002)
