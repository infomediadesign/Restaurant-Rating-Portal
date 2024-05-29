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
import pictures


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

    return fetch_restaurants.fetch_by_id(restaurant_id)


@app.route('/pictures/delete', methods=['POST'])
@auth.login_required
def delete_picture():
    data = request.get_json()

    if not data or 'pk_picture' not in data:
        return jsonify({'message': 'No picture data provided'}), 400

    try:
        picture_id = int(data['pk_picture'])
    except ValueError:
        return jsonify({'message': 'Picture ID must be an integer'}), 400

    return pictures.delete(picture_id)


@app.route('/pictures/upload', methods=['POST'])
@auth.login_required
def upload_picture():
    data = request.get_json()
    return pictures.upload(data)


if __name__ == '__main__':
    load_dotenv()
    create_tables()
    app.run(debug=True, port=5002)
