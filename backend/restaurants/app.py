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

    print(bcrypt.checkpw(password.encode('utf-8'), api_key_encrypted.encode('utf-8')))
    if username != os.getenv("API_USER"):
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), api_key_encrypted.encode('utf-8')):
        return False
    return True


@app.route('/restaurants', methods=['GET'])
@auth.login_required
def fetch_all_restaurants():
    return fetch_restaurants.fetch_all_restaurants()

@app.route('/restaurant_by_id', methods=['POST'])
@auth.login_required
def fetch_restaurant_by_id():
    return None


@app.route('/restaurants_in_city', methods=['POST'])
@auth.login_required
def fetch_restaurant_in_city():
    return None


@app.route('/restaurants_in_city_filter', methods=['POST'])
@auth.login_required
def fetch_restaurant_in_city_filter():
    return None


if __name__ == '__main__':
    load_dotenv()
    create_tables()
    app.run(debug=True, port=5002)