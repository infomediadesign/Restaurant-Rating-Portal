from flask import Flask, jsonify, request
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

def create_connection():
    try:
        connection = mysql.connector.connect(
            host='c-kohn.lu',
            user='c1SAD',
            password='SAD-SRH2024',
            database='c1sad'
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

@app.route('/data', methods=['GET'])
def get_data():
    connection = create_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users")  
        rows = cursor.fetchall()
        return jsonify(rows)
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
