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

def test_register_new_user(client):
    # Modify register_data with fields matching the ratings table
    register_data = {
        'fk_user': 1,  # Assuming the user ID for this rating
        'fk_restaurant': 1,  # Assuming the restaurant ID for this rating
        'stars': 4,  # Rating stars
        'rating_description': 'This is a test rating'  # Rating description
    }

    # Retrieve username and password from environment variables
    username = os.getenv("API_USER")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to register new user data
    response = client.post('/ratingdata', json=register_data, headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200

    # Assert the response contains the expected message
    assert response.json['message'] == 'Data inserted successfully'


def test_insert_reply_data(client):
    # Prepare reply data
    reply_data = {
        'fk_user': 1,
        'fk_rating': 1,
        'reply_text': 'Thank you for your feedback!'
    }

    # Retrieve username and password from environment variables
    username = os.getenv("API_USER")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to insert reply data
    response = client.post('/replydata', json=reply_data, headers=get_auth_header(username, password))

    # Assert the response status code is 201
    assert response.status_code == 200

    # Assert the response contains the expected message
    assert response.json['message'] == 'Data inserted successfully'