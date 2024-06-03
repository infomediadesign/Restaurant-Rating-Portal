from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import mysql.connector
from mysql.connector import Error
from db import create_connection, create_tables
import bcrypt
import os
from dotenv import load_dotenv
from flask_cors import CORS

import fetch_restaurants
import pictures
import crud
import opening_hours


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
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


@app.route('/fetch_all_by_owner', methods=['POST'])
@auth.login_required
def fetch_all_by_owner():
    data = request.get_json()

    if not data or 'fk_owner' not in data:
        return jsonify({'message': 'No restaurant data provided'}), 400

    try:
        owner_id = int(data['pk_restaurant'])
    except ValueError:
        return jsonify({'message': 'Invalid restaurant ID'}), 400

    return fetch_restaurants.fetch_by_owner(owner_id)


@app.route('/create', methods=['POST'])
@auth.login_required
def create():
    data = request.get_json()
    return crud.create(data)


@app.route('/update', methods=['POST'])
@auth.login_required
def update():
    data = request.get_json()
    return crud.update(data)


@app.route('/verify', methods=['POST'])
@auth.login_required
def verify():
    data = request.get_json()
    if not data or 'pk_restaurant' not in data:
        return jsonify({'message': 'No restaurant data provided'}), 400
    try:
        restaurant_id = int(data['pk_restaurant'])
    except ValueError as e:
        return jsonify({'message': 'Invalid restaurant ID'}), 400
    return crud.verify(restaurant_id)


@app.route('/delete', methods=['POST'])
@auth.login_required
def delete():
    data = request.get_json()

    if not data or 'pk_restaurant' not in data:
        return jsonify({'message': 'No restaurant data provided'}), 400

    try:
        restaurant_id = int(data['pk_restaurant'])
    except ValueError:
        return jsonify({'message': 'Restaurant ID must be an integer'}), 400

    return crud.delete(restaurant_id)


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


@app.route('/opening_hours/add', methods=['POST'])
@auth.login_required
def opening_hours_add():
    data = request.get_json()
    return opening_hours.add(data)


@app.route('/opening_hours/update', methods=['POST'])
@auth.login_required
def opening_hours_update():
    data = request.get_json()
    return opening_hours.update(data)


@app.route('/opening_hours/delete', methods=['POST'])
@auth.login_required
def opening_hours_delete():
    data = request.get_json()
    if data is None:
        return jsonify({'message': 'No data provided'}), 400
    if 'pk_opening_hours' not in data:
        return jsonify({'message': 'No opening hours data provided'}), 400
    try:
        opening_hours_id = int(data['pk_opening_hours'])
    except ValueError:
        return jsonify({'message': 'Opening hours ID must be an integer'}), 400
    return opening_hours.delete(data)


@app.route('/opening_hours/fetch_by_id', methods=['POST'])
@auth.login_required
def opening_hours_fetch_by_id():
    data = request.get_json()
    if data is None:
        return jsonify({'message': 'No data provided'}), 400
    if 'pk_opening_hour' not in data:
        return jsonify({'message': 'No opening hours data provided'}), 400
    try:
        opening_hours_id = int(data['pk_opening_hour'])
    except ValueError:
        return jsonify({'message': 'Opening hours ID must be an integer'}), 400

    return opening_hours.fetch_by_id(opening_hours_id)


@app.route('/opening_hours/fetch_all_by_restaurant_id', methods=['POST'])
@auth.login_required
def opening_hours_fetch_all_by_restaurant_id():
    data = request.get_json()
    if data is None:
        return jsonify({'message': 'No data provided'}), 400
    if 'fk_restaurant' not in data:
        return jsonify({'message': 'No restaurant data provided'}), 400
    try:
        fk_restaurant = int(data['fk_restaurant'])
    except ValueError:
        return jsonify({'message': 'Restaurant ID must be an integer'}), 400

    return opening_hours.fetch_all_by_restaurant_id(fk_restaurant)


if __name__ == '__main__':
    load_dotenv()
    create_tables()
    app.run(debug=True, port=5002)
