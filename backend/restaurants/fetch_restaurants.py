from flask import Flask, jsonify, request
import json
import mysql.connector
from mysql.connector import Error
from db import create_connection


def fetch_all_restaurants():
    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        query = "SELECT * FROM `restaurants`"
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]
        restaurants = cursor.fetchall()

        if(restaurants):
            restaurants_end_result = []

            for restaurant in restaurants:
                restaurants_end_result.append(dict(zip(row_headers, restaurant)))
            return json.dumps(restaurants_end_result, indent=4, separators=(',', ': ')), 200
        else:
            return jsonify({"error": "No restaurants found"}), 404

    except Error as e:
        return jsonify({"error": "Failed to fetch restaurants - " + str(e)}), 500

    finally:
        cursor.close()
        connection.close()


