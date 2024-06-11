from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import bcrypt
import os
import requests
from dotenv import load_dotenv
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.json.sort_keys = False
auth = HTTPBasicAuth()

USER_SERVICE_URL = "http://localhost:5001"
RESTAURANT_SERVICE_URL = "http://localhost:5002"
RATING_SERVICE_URL =  "http://localhost:5003"


@auth.verify_password
def verify_password(username, password):
    gateway_username = os.getenv("GATEWAY_USERNAME")
    gateway_password_encrypted = os.getenv("GATEWAY_PASSWORD_ENCRYPTED")

    if username != gateway_username:
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), gateway_password_encrypted.encode('utf-8')):
        return False
    return True


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


@app.route('/ratings/delete_by_id', methods=['POST'])
@auth.login_required
def delete_rating_route():
    response = requests.post(f"{RATING_SERVICE_URL}/delete_by_id", json=request.json, auth=(os.getenv("RATINGS_API_USERNAME"), os.getenv("RATINGS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/ratings/create', methods=['POST'])
@auth.login_required
def create_ratings_route():
    response = requests.post(f"{RATING_SERVICE_URL}/create", json=request.json, auth=(os.getenv("RATINGS_API_USERNAME"), os.getenv("RATINGS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/ratings/replies/create', methods=['POST'])
@auth.login_required
def create_replies_route():
    response = requests.post(f"{RATING_SERVICE_URL}/replies/create", json=request.json, auth=(os.getenv("RATINGS_API_USERNAME"), os.getenv("RATINGS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/ratings/fetch_by_restaurant', methods=['POST'])
@auth.login_required
def fetch_rating_by_restaurants_route():
    response = requests.post(f"{RATING_SERVICE_URL}/fetch_by_restaurant", json=request.json, auth=(os.getenv("RATINGS_API_USERNAME"), os.getenv("RATINGS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/ratings/replies/fetch_by_rating', methods=['POST'])
@auth.login_required
def fetch_replies_by_ratings_route():
    response = requests.post(f"{RATING_SERVICE_URL}/replies/fetch_by_rating", json=request.json, auth=(os.getenv("RATINGS_API_USERNAME"), os.getenv("RATINGS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code

@app.route('/ratings/fetch_avg', methods=['GET'])
@auth.login_required
def fetch_avg_route():
    response = requests.get(f"{RATING_SERVICE_URL}/fetch_avg",  auth=(os.getenv("RATINGS_API_USERNAME"), os.getenv("RATINGS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/ratings/fetch_by_user', methods=['POST'])
@auth.login_required
def fetch_ratings_by_user_route():
    response = requests.post(f"{RATING_SERVICE_URL}/fetch_by_user", json=request.json, auth=(os.getenv("RATINGS_API_USERNAME"), os.getenv("RATINGS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code






@app.route('/restaurants/fetch_all', methods=['POST'])
@auth.login_required
def fetch_all_restaurants_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/fetch_all", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/fetch_verified', methods=['POST'])
@auth.login_required
def fetch_verified_restaurants_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/fetch_verified", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/fetch_by_id', methods=['POST'])
@auth.login_required
def fetch_restaurants_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/fetch_by_id", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/fetch_all_by_owner', methods=['POST'])
@auth.login_required
def fetch_all_restaurants_by_owner_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/fetch_all_by_owner", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/create', methods=['POST'])
@auth.login_required
def create_restaurant_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/create", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/update', methods=['POST'])
@auth.login_required
def update_restaurant_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/update", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/delete', methods=['POST'])
@auth.login_required
def delete_restaurant_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/delete", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/verify', methods=['POST'])
@auth.login_required
def verify_restaurant_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/verify", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/pictures/delete', methods=['POST'])
@auth.login_required
def delete_restaurant_picture_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/pictures/delete", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/pictures/upload', methods=['POST'])
@auth.login_required
def upload_restaurant_picture_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/pictures/upload", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/opening_hours/add', methods=['POST'])
@auth.login_required
def add_restaurant_opening_hour_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/opening_hours/add", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/opening_hours/delete', methods=['POST'])
@auth.login_required
def delete_restaurant_opening_hour_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/opening_hours/delete", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json(), response.status_code)


@app.route('/restaurants/opening_hours/update', methods=['POST'])
@auth.login_required
def update_restaurant_opening_hour_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/opening_hours/update", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


@app.route('/restaurants/opening_hours/fetch_all_by_restaurant_id', methods=['POST'])
@auth.login_required
def fetch_all_restaurant_opening_hours_route():
    response = requests.post(f"{RESTAURANT_SERVICE_URL}/opening_hours/fetch_all_by_restaurant_id", json=request.json,
                             auth=(os.getenv("RESTAURANTS_API_USERNAME"), os.getenv("RESTAURANTS_API_PASSWORD")))
    return jsonify(response.json()), response.status_code


if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
