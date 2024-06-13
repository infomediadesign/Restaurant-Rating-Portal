from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import mysql.connector
from mysql.connector import Error
from db import create_connection
import bcrypt
import os
import requests
from dotenv import load_dotenv
from rating_reply_service import insert_rating_data , insert_reply_data , fetch_ratings_by_restaurant , fetch_replies_by_rating , fetch_avg_ratings , fetch_ratings_by_user,delete_by_id
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username, password):
    api_key_encrypted = os.getenv("API_PASSWORD")

    print(bcrypt.checkpw(password.encode('utf-8'), api_key_encrypted.encode('utf-8')))
    if username != os.getenv("API_RATING"):
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), api_key_encrypted.encode('utf-8')):
        return False
    return True


@app.route('/create', methods=['POST'])
@auth.login_required
def insert_data_route():
    data = request.json
    response, status_code = insert_rating_data(data)
    return jsonify(response), status_code


@app.route('/replies/create', methods=['POST'])
@auth.login_required
def insert_reply_data_route():
    data = request.json
    response, status_code = insert_reply_data(data)
    return jsonify(response), status_code


@app.route('/fetch_by_restaurant', methods=['POST'])
@auth.login_required
def fetch_ratings_by_restaurant_route():
    data = request.json
    response, status_code = fetch_ratings_by_restaurant(data)
    return jsonify(response), status_code

@app.route('/replies/fetch_by_rating', methods=['POST'])
@auth.login_required
def fetch_replies_by_rating_route():
    data = request.json
    response, status_code = fetch_replies_by_rating(data)
    return jsonify(response), status_code

@app.route('/fetch_avg', methods=['GET'])
@auth.login_required
def get_overall_avg_ratings_route():
    overall_avg_ratings, status_code = fetch_avg_ratings()
    return jsonify(overall_avg_ratings), status_code


@app.route('/fetch_by_user', methods=['POST'])
@auth.login_required
def fetch_ratings_by_user_route():
    data = request.json
    response, status_code = fetch_ratings_by_user(data)
    return jsonify(response), status_code


@app.route('/delete_by_id', methods=['POST'])
@auth.login_required
def delete_ratings_by_id_route():
    data = request.json
    response, status_code = delete_by_id(data)
    return jsonify(response), status_code









if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True , port = 5003)
