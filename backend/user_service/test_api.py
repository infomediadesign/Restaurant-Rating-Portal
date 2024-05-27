import pytest
from login import app as login_app
from register import app as register_app

@pytest.fixture
def client():
    with login_app.test_client() as client:
        yield client

@pytest.fixture
def client_register():
    with register_app.test_client() as client:
        yield client

def test_register_with_duplicate_email(client_register):
    # Attempt to register with the same email again
    register_duplicate_data = {
        'given_name': 'Jane',
        'surname': 'Doe',
        'email': 'john@example.com',  # Same email as before
        'password': 'password456'
    }
    response = client_register.post('/registerdata', json=register_duplicate_data)

    # Check if the response status code is 400 (Bad Request)
    assert response.status_code == 400

    # Check if the response contains the expected error message
    assert response.json['error'] == 'User with this email already exists'

def test_login_with_valid_credentials(client):
    # Define test data for login
    login_data = {
        'email': 'john@example.com',
        'password': 'password123'
    }

    # Make a POST request to /login endpoint with valid credentials
    response = client.post('/login', json=login_data)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the expected message
    assert response.json['message'] == 'User logged in successfully'

    # Optionally, you can check the user data returned in the response
    assert 'user' in response.json
    assert response.json['user']['email'] == 'john@example.com'

def test_login_invalid_credentials(client):
    # Define test data with invalid credentials
    test_data = {
        'email': 'test@example.com',
        'password': 'wrong_password'
    }

    # Make a POST request to /login endpoint with invalid credentials
    response = client.post('/login', json=test_data)

    # Check if the response status code is 401 (Unauthorized)
    assert response.status_code == 401

    # Check if the response contains the expected error message
    assert response.json['error'] == 'Invalid username or password'

def test_login_missing_data(client):
    # Make a POST request to /login endpoint without providing credentials
    response = client.post('/login', json={})  # Send an empty JSON object

    # Check if the response status code is 400 (Bad Request)
    assert response.status_code == 400

    # Check if the response contains the expected error message
    assert response.json['error'] == 'Username and password are required'
