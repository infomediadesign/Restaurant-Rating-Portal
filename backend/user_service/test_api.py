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
        'given_name': 'J',
        'surname': 'Doe',
        'email': 'new_user@example.com',
        'password': 'new_password'
    }

    # Retrieve username and password from environment variables
    username = os.getenv("API_USER")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to register new user data
    response = client.post('/register', json=register_data, headers=get_auth_header(username, password))

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
    response = client.post('/login', json=login_data, headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200

    # Assert the response contains the expected message
    assert response.json['message'] == 'User logged in successfully'



def test_get_user_data(client):
    # Prepare user data with a valid user ID
    user_data = {
        'pk_user': 1  # Assuming 1 is a valid user ID
    }

    username = os.getenv("API_USER")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to get user data
    response = client.post('/fetch_by_id', json=user_data, headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200

    # Assert the response contains the expected user data
    assert 'pk_user' in response.json  # Assuming the response contains the user ID
    assert 'given_name' in response.json  # Assuming the response contains the user's given name
    assert 'surname' in response.json  # Assuming the response contains the user's surname
    assert 'email' in response.json  # Assuming the response contains the user's email



def test_fetch_all_users(client):
    # Make a GET request to fetch all users
    response = client.get('fetch_all')

    # Assert the response status code is 200
    assert response.status_code == 200

    # Convert response data to JSON
    response_json = response.json

    # Assert that the response contains a list of users
    assert isinstance(response_json, list)

    # Assert that each user in the response has the expected fields
    for user in response_json:
        assert 'pk_user' in user
        assert 'given_name' in user
        assert 'surname' in user
        assert 'email' in user



def test_update_user_data(client):
    # Prepare update data with a valid user ID
    update_data = {
        'pk_user': 1,  # Assuming 36 is a valid user ID
        'given_name': 'Updat ',
        'surname': 'Updated Surname',
        'email': 'updated_email@example.com',
        'password': 'new_password'
    }

    username = os.getenv("API_USER")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to update user data
    response = client.post('/update', json=update_data, headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200
    response_data = response.json

    # Assert the response contains the expected message
    assert response_data['message'] == 'User data updated successfully'


def test_delete_user(client):
    # Prepare data with a valid user ID to delete
    delete_data = {
        'user_id': 1  # Assuming 36 is a valid user ID
    }

    username = os.getenv("API_USER")
    password = os.getenv("API_DECRYPTED_PASSWORD")

    # Make a POST request to delete the user
    response = client.post('/delete', json=delete_data, headers=get_auth_header(username, password))

    # Assert the response status code is 200
    assert response.status_code == 200

    # Assert the response contains the expected message
    assert response.json['message'] == 'User deleted successfully'


