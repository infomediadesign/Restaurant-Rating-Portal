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
    register_data = {
        'given_name': 'John',
        'surname': 'Doe',
        'email': 'new_user@example.com',
        'password': 'new_password'
    }

    # Retrieve username and password from environment variables
    username = os.getenv("API_USER")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to register new user data
    response = client.post('/registerdata', json=register_data, headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200

    # Assert the response contains the expected message
    assert response.json['message'] == 'Data inserted successfully'


def test_login_with_correct_credentials(client):
    # Prepare login data with correct credentials
    login_data = {
        'email': 'new_user@example.com',
        'password': 'new_password'
    }

    username = os.getenv("API_USER")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to login
    response = client.post('/logindata', json=login_data, headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200

    # Assert the response contains the expected message
    assert response.json['message'] == 'User logged in successfully'
