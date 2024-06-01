from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
import bcrypt
import os
from dotenv import load_dotenv

app = Flask(__name__)
app.json.sort_keys = False
auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username, password):
    api_key_encrypted = os.getenv("GATEWAY_USERNAME")

    if username != os.getenv("GATEWAY_PASSWORD"):
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), api_key_encrypted.encode('utf-8')):
        return False
    return True


if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True)
