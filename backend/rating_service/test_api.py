import pytest
import base64
import os
from app import app
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def get_auth_header(username, password):
    credentials = f"{username}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')
    return {'Authorization': f'Basic {encoded_credentials}'}

def test_rating_data(client):
    # Modify register_data with fields matching the ratings table
    register_data = {
        'fk_user': 2,  # Assuming the user ID for this rating
        'fk_restaurant': 2,  # Assuming the restaurant ID for this rating
        'stars': 5,  # Rating stars
        'review': 'This is a test rating'  # Rating description
    }

    # Retrieve username and password from environment variables
    username = os.getenv("API_RATING")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to register new user data
    response = client.post('/create', json=register_data, headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200

    # Assert the response contains the expected message
    assert response.json['message'] == 'Data inserted successfully'


def test_insert_reply_data(client):
    # Prepare reply data
    reply_data = {
        'fk_user': 1,
        'fk_rating': 1,
        'message': 'Thank you for your feedback!'
    }

    # Retrieve username and password from environment variables
    username = os.getenv("API_RATING")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to insert reply data
    response = client.post('/replies/create', json=reply_data, headers=get_auth_header(username, password))

    # Assert the response status code is 201
    assert response.status_code == 200

    # Assert the response contains the expected message
    assert response.json['message'] == 'Data inserted successfully'



def test_fetch_ratings_by_restaurant(client):
    data = {'restaurant_id': 1}  # Adjust ID as needed

    username = os.getenv("API_RATING")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    response = client.post('/fetch_by_restaurant', json=data, headers=get_auth_header(username, password))

    assert response.status_code == 200
    response_data = response.json
    assert 'ratings' in response_data
    assert isinstance(response_data['ratings'], list)

def test_fetch_replies_by_rating(client):
    data = {'rating_id': 1}  # Adjust ID as needed

    username = os.getenv("API_RATING")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    response = client.post('/replies/fetch_by_rating', json=data, headers=get_auth_header(username, password))

    assert response.status_code == 200
    response_data = response.json
    assert 'replies' in response_data
    assert isinstance(response_data['replies'], list)


def test_fetch_avg_ratings_route(client):
    # Retrieve username and password from environment variables
    username = os.getenv("API_RATING")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a GET request to fetch overall average ratings
    response = client.get('/fetch_avg', headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200

    # Assert the response contains a dictionary
    assert isinstance(response.json, dict)

    # Store the dictionary in a text file
    with open('avg_ratings.txt', 'w') as file:
        file.write(str(response.json))
